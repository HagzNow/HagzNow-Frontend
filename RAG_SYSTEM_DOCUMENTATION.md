# RAG System Documentation - Nova RAG Studio

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [RAG System Architecture](#rag-system-architecture)
3. [Core Components](#core-components)
4. [Backend Implementation](#backend-implementation)
5. [Frontend Implementation](#frontend-implementation)
6. [RAG Pipeline Workflow](#rag-pipeline-workflow)
7. [Reusable Components](#reusable-components)
8. [Implementation in Other Projects](#implementation-in-other-projects)

---

## 🎯 Project Overview

**Nova RAG Studio** (also called "Lantern Research Studio") is a full-stack Retrieval-Augmented Generation (RAG) application that allows users to:
- Upload documents (PDF, TXT, Markdown, JSON)
- Store document content as semantic embeddings in a vector database
- Ask questions about the uploaded documents
- Receive AI-generated answers with source citations

### Technology Stack
- **Backend**: Node.js + Express
- **Vector Database**: ChromaDB
- **AI Models**: OpenAI (GPT-4o-mini for completion, text-embedding-3-small for embeddings)
- **Frontend**: Vanilla JavaScript (ES6 modules)
- **File Processing**: pdf-parse, multer
- **UI**: Custom CSS with modern design

---

## 🏗️ RAG System Architecture

### What is RAG?

**RAG (Retrieval-Augmented Generation)** is a technique that enhances large language models by:
1. **Retrieval**: Finding relevant information from a knowledge base
2. **Augmentation**: Adding that information to the model's context
3. **Generation**: Producing answers grounded in the retrieved information

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│  (portal.html + orchestrator.js + panels.js + network.js)      │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         │
┌────────────────────────▼────────────────────────────────────────┐
│                      EXPRESS SERVER                             │
│                      (server.js)                                │
│                                                                 │
│  ┌─────────────────┐           ┌──────────────────┐           │
│  │  /api/upload    │           │   /api/chat      │           │
│  │  Document       │           │   Question       │           │
│  │  Ingestion      │           │   Answering      │           │
│  └────────┬────────┘           └────────┬─────────┘           │
└───────────┼─────────────────────────────┼─────────────────────┘
            │                             │
            ▼                             ▼
   ┌────────────────┐           ┌─────────────────────┐
   │  ChromaDB      │           │  OpenAI API         │
   │  Vector Store  │◄──────────┤  - Embeddings       │
   │                │           │  - Completions      │
   └────────────────┘           └─────────────────────┘
        (Stores)                    (Generates)
     Text Chunks +                 Embeddings +
     Embeddings +                  Answers
     Metadata
```

### Data Flow

```
UPLOAD FLOW:
User Upload → Multer → Extract Text → Chunk Text → Generate Embeddings → Store in ChromaDB

QUERY FLOW:
User Question → Generate Query Embedding → Search ChromaDB → Retrieve Top K Chunks → 
Build Prompt with Context → OpenAI Completion → Return Answer + Sources
```

---

## 🧩 Core Components

### 1. Document Processing Pipeline

```javascript
// Text Extraction
Document (PDF/TXT/MD/JSON) → Raw Text

// Chunking Strategy
Raw Text → Overlapping Chunks (800 words, 80 word overlap)

// Why Overlapping?
- Preserves context at chunk boundaries
- Prevents information loss
- Improves retrieval accuracy
```

### 2. Vector Storage

```javascript
// Each chunk is stored with:
{
  id: "threadId-timestamp-index",
  document: "chunk text content",
  metadata: {
    conversationId: "uuid",
    filename: "document.pdf",
    chunk: 1
  },
  embedding: [0.123, -0.456, ...] // 1536-dimensional vector
}
```

### 3. Semantic Search

```javascript
// When user asks a question:
1. Convert question to embedding vector
2. Find K nearest neighbor chunks (K=4 by default)
3. Return most semantically similar content
4. Use cosine similarity for comparison
```

### 4. Prompt Engineering

```javascript
// RAG Prompt Structure:
System: "You are a retrieval-augmented assistant..."
User: """
  Context blocks:
  [1] (filename - chunk 1)
  {retrieved chunk 1 text}
  
  [2] (filename - chunk 2)
  {retrieved chunk 2 text}
  
  Conversation history:
  {previous exchanges}
  
  User question:
  {current question}
  
  Return concise answers, cite sources like [1].
"""
```

---

## 🖥️ Backend Implementation

### Server Setup (`server.js`)

```javascript
// Key Dependencies
import express from 'express';
import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb';
import { OpenAI } from 'openai';
import pdf from 'pdf-parse';
import multer from 'multer';
```

#### Configuration

```javascript
// Environment Variables
OPENAI_API_KEY=sk-your-key
OPENAI_MODEL=gpt-4o-mini              // Completion model
OPENAI_EMBED_MODEL=text-embedding-3-small  // Embedding model
CHROMA_URL=http://localhost:8000      // ChromaDB server
PORT=3000
RETRIEVAL_K=4                         // Number of chunks to retrieve
```

#### Clients Initialization

```javascript
const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const chromaClient = new ChromaClient({ path: VECTOR_HOST });

// Embedding Function - converts text to vectors
const embeddingAdapter = new OpenAIEmbeddingFunction({
  openai_api_key: process.env.OPENAI_API_KEY,
  model: EMBED_MODEL,
});
```

### Core Functions

#### 1. Document Upload Endpoint (`/api/upload`)

**Purpose**: Process and store documents as vector embeddings

```javascript
POST /api/upload
Body: FormData { conversationId, file }

Flow:
1. Receive file via multer
2. Extract text (pullTextFromAsset)
3. Chunk text (segmentTextBlocks)
4. Create/get vector collection
5. Delete old chunks for this conversation
6. Generate embeddings and store
7. Initialize conversation history
```

**Key Function: Text Extraction**

```javascript
async function pullTextFromAsset(file) {
  // PDF files
  if (file.mimetype === 'application/pdf') {
    const parsed = await pdf(file.buffer);
    return parsed.text;
  }
  
  // Text-based files
  if (file.mimetype === 'text/plain' || 
      file.mimetype === 'text/markdown' || 
      file.mimetype === 'application/json') {
    return file.buffer.toString('utf8');
  }
  
  throw new Error('Unsupported file type');
}
```

**Key Function: Text Chunking**

```javascript
function segmentTextBlocks(text, chunkSize = 800, overlap = 80) {
  // 1. Clean text (normalize whitespace)
  const cleaned = text.replace(/\s+/g, ' ').trim();
  
  // 2. Split into words
  const words = cleaned.split(' ');
  
  // 3. Create overlapping chunks
  const chunks = [];
  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ').trim();
    if (chunk) chunks.push(chunk);
    if (i + chunkSize >= words.length) break;
  }
  
  return chunks;
}
```

**Why These Parameters?**
- **800 words**: Good balance between context and specificity
- **80 word overlap**: Preserves context across boundaries (10% overlap)
- **Adjustable**: Can be modified based on document type

#### 2. Chat Endpoint (`/api/chat`)

**Purpose**: Answer questions using retrieved context

```javascript
POST /api/chat
Body: { conversationId, message }

Flow:
1. Get vector collection for conversation
2. Query ChromaDB with user message (semantic search)
3. Retrieve top K relevant chunks
4. Format context with citations
5. Build prompt with context + history + question
6. Call OpenAI for completion
7. Store exchange in conversation history
8. Return answer with source citations
```

**Key Function: Vector Search**

```javascript
// Semantic search in ChromaDB
const query = await collection.query({
  queryTexts: [message],           // User's question
  nResults: Number(process.env.RETRIEVAL_K || 4)  // Top 4 chunks
});

// Returns:
{
  documents: [[chunk1, chunk2, chunk3, chunk4]],
  metadatas: [[meta1, meta2, meta3, meta4]],
  ids: [[id1, id2, id3, id4]],
  distances: [[dist1, dist2, dist3, dist4]]
}
```

**Key Function: Context Formatting**

```javascript
const formattedContext = documents.map((doc, index) =>
  `[${index + 1}] (${metadatas[index]?.filename} - chunk ${metadatas[index]?.chunk})
${doc}`
).join('\n\n');

// Example Output:
// [1] (research.pdf - chunk 5)
// The theory of relativity states...
//
// [2] (research.pdf - chunk 7)
// Einstein's equations demonstrate...
```

**Key Function: Conversation History**

```javascript
// Store in-memory conversation ledger
const dialogLedger = new Map();

// Each conversation ID maps to array of exchanges:
{
  "uuid-123": [
    { user: "What is RAG?", assistant: "RAG stands for..." },
    { user: "How does it work?", assistant: "It works by..." }
  ]
}

// Recent history (last 5 exchanges) included in prompt
const history = dialogLedger.get(threadId) ?? [];
const recentHistory = history.slice(-5);
```

**Key Function: Prompt Composition**

```javascript
function composeResponsePrompt({ context, history, question }) {
  return `You are answering questions about an uploaded document.

Context blocks:
${context}

Conversation so far:
${history || 'No prior turns.'}

User question:
${question}

Return concise answers, cite sources like [1] referencing the context block number.`;
}
```

**Key Function: OpenAI API Call**

```javascript
const completion = await openaiClient.responses.create({
  model: COMPLETION_MODEL,
  input: [
    {
      role: 'system',
      content: [{
        type: 'input_text',
        text: "You are a retrieval-augmented assistant. Only answer using the provided context. If the answer is not present, say you don't have enough information."
      }]
    },
    {
      role: 'user',
      content: [{ type: 'input_text', text: prompt }]
    }
  ]
});
```

#### 3. Collection Management

```javascript
async function resolveVectorCollection(conversationId) {
  // Create unique collection name (max 63 chars for ChromaDB)
  const collectionName = `chat_${conversationId}`.slice(0, 63);
  
  // Get or create collection with embedding function
  return chromaClient.getOrCreateCollection({
    name: collectionName,
    metadata: { conversationId },
    embeddingFunction: embeddingAdapter  // Auto-generates embeddings
  });
}
```

---

## 🎨 Frontend Implementation

### Architecture

```
orchestrator.js (Main Controller)
    ├── panels.js (UI Updates)
    ├── network.js (API Communication)
    └── identifiers.js (ID Generation)
```

### File Structure

#### 1. `orchestrator.js` - Main Application Logic

**Purpose**: Coordinate all user interactions and application state

```javascript
// Application State
const workspaceState = {
  threadId: mintThreadId(),    // Unique conversation ID
  ready: false,                // Document uploaded?
  ingesting: false            // Upload in progress?
};
```

**Key Functions:**

```javascript
// Document Upload Handler
async function ingestDocument(file) {
  if (workspaceState.ingesting) return;
  
  workspaceState.ingesting = true;
  panels.updateIngestStatus(`Uploading ${file.name}...`);
  panels.toggleSpinner(true);
  
  try {
    // Call API
    const receipt = await relay.ingestFileBundle(workspaceState.threadId, file);
    
    // Update state
    workspaceState.ready = true;
    panels.updateIngestStatus(
      `Indexed ${receipt.chunks} slices from ${receipt.filename}`
    );
    panels.setComposerAvailability(true);
  } catch (error) {
    panels.paintAlert(error.message);
  } finally {
    workspaceState.ingesting = false;
    panels.toggleSpinner(false);
  }
}

// Question Handler
async function handleExchangeSubmit(event) {
  event.preventDefault();
  const prompt = questionInput.value.trim();
  
  if (!workspaceState.ready) {
    panels.paintAlert("Upload a document first");
    return;
  }
  
  panels.paintVisitorEntry(prompt);  // Show user message
  questionInput.value = "";
  panels.toggleSpinner(true);
  
  try {
    const reply = await relay.deliverPrompt(workspaceState.threadId, prompt);
    panels.paintGuideEntry(reply.answer, reply.sources);  // Show AI response
  } catch (error) {
    panels.paintAlert(error.message);
  } finally {
    panels.toggleSpinner(false);
  }
}
```

**Drag & Drop Support:**

```javascript
dropzone.addEventListener("drop", (event) => {
  event.preventDefault();
  const file = event.dataTransfer?.files?.[0];
  if (file) ingestDocument(file);
});
```

#### 2. `network.js` - API Communication

**Purpose**: Handle all HTTP requests to backend

```javascript
const SERVICE_ROOT = "/api";

// Upload Document
export async function ingestFileBundle(threadId, file) {
  const formData = new FormData();
  formData.append("conversationId", threadId);
  formData.append("file", file);
  
  const response = await fetch(`${SERVICE_ROOT}/upload`, {
    method: "POST",
    body: formData
  });
  
  return assertResponse(response);
}

// Send Question
export async function deliverPrompt(threadId, message) {
  const response = await fetch(`${SERVICE_ROOT}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ conversationId: threadId, message })
  });
  
  return assertResponse(response);
}

// Error Handler
async function assertResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Something went wrong.");
  }
  return data;
}
```

#### 3. `panels.js` - UI Updates

**Purpose**: Manage all DOM manipulations and visual updates

```javascript
// Display User Message
export function paintVisitorEntry(text) {
  const li = document.createElement("li");
  li.className = "entry visitor";
  li.innerHTML = scrub(text).replace(/\n/g, "<br>");
  threadFeed.appendChild(li);
  scrollFeed();
}

// Display AI Response with Sources
export function paintGuideEntry(text, sources = []) {
  const li = document.createElement("li");
  li.className = "entry guide";
  li.innerHTML = scrub(text).replace(/\n/g, "<br>");
  
  // Add source citations
  if (sources.length) {
    const tray = document.createElement("div");
    tray.className = "sources";
    
    sources.forEach((source, index) => {
      const pill = document.createElement("span");
      pill.className = "source-pill";
      const file = source?.metadata?.filename ?? "Document";
      const chunk = source?.metadata?.chunk ?? index + 1;
      pill.innerText = `[${index + 1}] ${file} · chunk ${chunk}`;
      tray.appendChild(pill);
    });
    
    li.appendChild(tray);
  }
  
  threadFeed.appendChild(li);
  scrollFeed();
}

// Enable/Disable Chat Input
export function setComposerAvailability(isEnabled) {
  exchangeForm.classList.toggle("disabled", !isEnabled);
  questionInput.disabled = !isEnabled;
  sendButton.disabled = !isEnabled;
  
  if (isEnabled) {
    questionInput.placeholder = "Ask something about your document...";
  }
}

// Show Loading Spinner
export function toggleSpinner(isVisible) {
  spinner.classList.toggle("hidden", !isVisible);
}
```

#### 4. `identifiers.js` - ID Generation

**Purpose**: Generate unique conversation IDs

```javascript
export function mintThreadId() {
  // Modern browsers
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  
  // Fallback for older browsers
  return `thread-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
```

---

## 🔄 RAG Pipeline Workflow

### Complete End-to-End Flow

#### Phase 1: Document Ingestion

```
1. USER ACTION
   └─ User uploads document (PDF/TXT/MD/JSON)

2. FRONTEND (orchestrator.js)
   └─ ingestDocument(file)
      └─ relay.ingestFileBundle(threadId, file)

3. NETWORK (network.js)
   └─ POST /api/upload with FormData

4. BACKEND (server.js)
   └─ Multer receives file
   └─ pullTextFromAsset(file)
      ├─ PDF: pdf-parse extracts text
      └─ TXT/MD/JSON: buffer.toString()
   └─ segmentTextBlocks(text)
      └─ Create 800-word chunks with 80-word overlap
   └─ resolveVectorCollection(threadId)
      └─ Get/create ChromaDB collection
   └─ collection.add({
        ids: ["thread-uuid-timestamp-0", "thread-uuid-timestamp-1", ...],
        documents: [chunk1, chunk2, ...],
        metadatas: [{conversationId, filename, chunk}, ...]
      })
      └─ ChromaDB auto-generates embeddings using OpenAI

5. RESPONSE
   └─ Return { message, chunks, filename }

6. FRONTEND UPDATE
   └─ panels.updateIngestStatus("Indexed X chunks")
   └─ panels.setComposerAvailability(true)
```

#### Phase 2: Question Answering

```
1. USER ACTION
   └─ User types question and submits

2. FRONTEND (orchestrator.js)
   └─ handleExchangeSubmit()
      └─ panels.paintVisitorEntry(prompt)
      └─ relay.deliverPrompt(threadId, message)

3. NETWORK (network.js)
   └─ POST /api/chat with { conversationId, message }

4. BACKEND (server.js)
   └─ resolveVectorCollection(threadId)
   └─ collection.query({
        queryTexts: [message],
        nResults: 4
      })
      └─ ChromaDB:
         ├─ Convert question to embedding
         ├─ Find 4 nearest neighbor chunks
         └─ Return documents + metadata + ids
   
   └─ Format context with chunk citations
   └─ Get conversation history (last 5 exchanges)
   └─ composeResponsePrompt({ context, history, question })
   
   └─ openaiClient.responses.create({
        model: "gpt-4o-mini",
        input: [
          { role: "system", content: RAG_INSTRUCTIONS },
          { role: "user", content: FORMATTED_PROMPT }
        ]
      })
      └─ OpenAI generates answer based on context
   
   └─ Store exchange in dialogLedger
   └─ Return { answer, sources }

5. RESPONSE
   └─ Return {
        answer: "AI response with [1] citations",
        sources: [
          { id, metadata: { filename, chunk }, snippet },
          ...
        ]
      }

6. FRONTEND UPDATE
   └─ panels.paintGuideEntry(answer, sources)
      ├─ Display answer text
      └─ Display source pills: "[1] filename.pdf · chunk 3"
```

---

## 🔧 Reusable Components

### 1. Text Chunking Algorithm

**Reusable for any RAG project:**

```javascript
/**
 * Split text into overlapping chunks
 * @param {string} text - Input text
 * @param {number} chunkSize - Words per chunk (default: 800)
 * @param {number} overlap - Overlapping words (default: 80)
 * @returns {string[]} Array of text chunks
 */
function segmentTextBlocks(text, chunkSize = 800, overlap = 80) {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (!cleaned) return [];
  
  const words = cleaned.split(' ');
  const chunks = [];
  
  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ').trim();
    if (chunk) chunks.push(chunk);
    if (i + chunkSize >= words.length) break;
  }
  
  return chunks;
}

// USAGE EXAMPLES:
// Small documents (blog posts, articles)
const smallChunks = segmentTextBlocks(text, 500, 50);

// Large documents (books, research papers)
const largeChunks = segmentTextBlocks(text, 1000, 100);

// Code documentation
const codeChunks = segmentTextBlocks(text, 600, 100);
```

### 2. ChromaDB Integration Pattern

**Reusable vector store setup:**

```javascript
import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb';

class VectorStore {
  constructor(chromaUrl, openaiKey, embeddingModel) {
    this.client = new ChromaClient({ path: chromaUrl });
    this.embedder = new OpenAIEmbeddingFunction({
      openai_api_key: openaiKey,
      model: embeddingModel
    });
  }
  
  async getCollection(name) {
    return this.client.getOrCreateCollection({
      name: name.slice(0, 63),  // ChromaDB limit
      embeddingFunction: this.embedder
    });
  }
  
  async addDocuments(collectionName, chunks, metadata) {
    const collection = await this.getCollection(collectionName);
    
    const ids = chunks.map((_, i) => `${collectionName}-${Date.now()}-${i}`);
    const metadatas = chunks.map((_, i) => ({ ...metadata, chunk: i + 1 }));
    
    await collection.add({
      ids,
      documents: chunks,
      metadatas
    });
    
    return { chunks: chunks.length };
  }
  
  async search(collectionName, query, k = 4) {
    const collection = await this.getCollection(collectionName);
    
    const results = await collection.query({
      queryTexts: [query],
      nResults: k
    });
    
    return {
      documents: results.documents[0] ?? [],
      metadatas: results.metadatas[0] ?? [],
      ids: results.ids[0] ?? []
    };
  }
  
  async deleteCollection(collectionName) {
    const collection = await this.getCollection(collectionName);
    await collection.delete({ where: {} });
  }
}

// USAGE:
const vectorStore = new VectorStore(
  'http://localhost:8000',
  process.env.OPENAI_API_KEY,
  'text-embedding-3-small'
);

// Store documents
await vectorStore.addDocuments('project-docs', chunks, {
  source: 'user-upload',
  filename: 'manual.pdf'
});

// Search
const results = await vectorStore.search('project-docs', 'How do I install?', 5);
```

### 3. RAG Prompt Template

**Reusable prompt structure:**

```javascript
class RAGPromptBuilder {
  constructor(systemInstructions) {
    this.systemInstructions = systemInstructions || 
      "You are a helpful assistant that answers questions based on provided context.";
  }
  
  formatContext(documents, metadatas) {
    return documents.map((doc, i) => {
      const source = metadatas[i]?.filename || 'Document';
      const chunk = metadatas[i]?.chunk || i + 1;
      return `[${i + 1}] (${source} - chunk ${chunk})\n${doc}`;
    }).join('\n\n');
  }
  
  formatHistory(exchanges) {
    return exchanges
      .map(ex => `User: ${ex.user}\nAssistant: ${ex.assistant}`)
      .join('\n\n');
  }
  
  build({ documents, metadatas, history, question, instructions }) {
    const contextBlock = this.formatContext(documents, metadatas);
    const historyBlock = history?.length 
      ? this.formatHistory(history)
      : 'No prior conversation.';
    
    const customInstructions = instructions || 
      'Answer concisely and cite sources using [1], [2], etc.';
    
    return `${this.systemInstructions}

Context from knowledge base:
${contextBlock}

Conversation history:
${historyBlock}

Current question:
${question}

Instructions: ${customInstructions}`;
  }
}

// USAGE:
const promptBuilder = new RAGPromptBuilder();

const prompt = promptBuilder.build({
  documents: searchResults.documents,
  metadatas: searchResults.metadatas,
  history: conversationHistory.slice(-5),
  question: userQuestion,
  instructions: 'Provide a detailed technical explanation with examples.'
});
```

### 4. File Processing Pipeline

**Reusable document parser:**

```javascript
import pdf from 'pdf-parse';

class DocumentProcessor {
  static async extractText(file) {
    const mimeType = file.mimetype || file.type;
    
    // PDF
    if (mimeType === 'application/pdf') {
      const parsed = await pdf(file.buffer || await file.arrayBuffer());
      return parsed.text;
    }
    
    // Text files
    if (mimeType === 'text/plain' || 
        mimeType === 'text/markdown' ||
        mimeType === 'application/json') {
      if (file.buffer) {
        return file.buffer.toString('utf8');
      }
      return await file.text();
    }
    
    // DOCX (requires additional library)
    if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      // Import mammoth or docx-parser
      throw new Error('DOCX support not implemented');
    }
    
    throw new Error(`Unsupported file type: ${mimeType}`);
  }
  
  static async process(file, chunkSize = 800, overlap = 80) {
    // 1. Extract text
    const text = await this.extractText(file);
    
    // 2. Validate
    if (!text.trim()) {
      throw new Error('Document is empty');
    }
    
    // 3. Chunk
    const chunks = segmentTextBlocks(text, chunkSize, overlap);
    
    if (!chunks.length) {
      throw new Error('Failed to create chunks');
    }
    
    return {
      text,
      chunks,
      filename: file.originalname || file.name,
      size: file.size,
      type: file.mimetype || file.type
    };
  }
}

// USAGE:
const result = await DocumentProcessor.process(uploadedFile);
console.log(`Extracted ${result.chunks.length} chunks from ${result.filename}`);
```

### 5. Conversation Memory Manager

**Reusable chat history:**

```javascript
class ConversationMemory {
  constructor(maxHistory = 10) {
    this.conversations = new Map();
    this.maxHistory = maxHistory;
  }
  
  add(conversationId, userMessage, assistantReply) {
    if (!this.conversations.has(conversationId)) {
      this.conversations.set(conversationId, []);
    }
    
    const history = this.conversations.get(conversationId);
    history.push({ user: userMessage, assistant: assistantReply, timestamp: Date.now() });
    
    // Keep only recent exchanges
    if (history.length > this.maxHistory) {
      history.splice(0, history.length - this.maxHistory);
    }
  }
  
  get(conversationId, limit = 5) {
    const history = this.conversations.get(conversationId) || [];
    return history.slice(-limit);
  }
  
  clear(conversationId) {
    this.conversations.delete(conversationId);
  }
  
  clearAll() {
    this.conversations.clear();
  }
  
  export(conversationId) {
    return {
      id: conversationId,
      exchanges: this.conversations.get(conversationId) || [],
      count: this.conversations.get(conversationId)?.length || 0
    };
  }
}

// USAGE:
const memory = new ConversationMemory(20);

// Store exchange
memory.add('user-123', 'What is RAG?', 'RAG stands for...');

// Retrieve recent
const recent = memory.get('user-123', 5);

// Export conversation
const exported = memory.export('user-123');
```

---

## 🚀 Implementation in Other Projects

### Scenario 1: Customer Support Chatbot

**Goal**: Answer customer questions from product documentation

```javascript
// 1. Setup
const vectorStore = new VectorStore(CHROMA_URL, OPENAI_KEY, EMBED_MODEL);
const promptBuilder = new RAGPromptBuilder(
  "You are a customer support assistant for AcmeProduct. " +
  "Answer questions using the product documentation."
);

// 2. Index Documentation
const docs = await loadProductDocs(); // Your docs
const chunks = segmentTextBlocks(docs, 600, 60);
await vectorStore.addDocuments('acme-docs', chunks, {
  source: 'documentation',
  version: '2.0'
});

// 3. Handle Customer Query
app.post('/support/ask', async (req, res) => {
  const { question, customerId } = req.body;
  
  // Search knowledge base
  const results = await vectorStore.search('acme-docs', question, 3);
  
  // Build prompt
  const history = memory.get(customerId, 3);
  const prompt = promptBuilder.build({
    documents: results.documents,
    metadatas: results.metadatas,
    history,
    question,
    instructions: 'Be friendly and provide step-by-step instructions.'
  });
  
  // Generate answer
  const answer = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }]
  });
  
  // Store and return
  memory.add(customerId, question, answer.choices[0].message.content);
  res.json({ answer: answer.choices[0].message.content, sources: results });
});
```

### Scenario 2: Code Documentation Q&A

**Goal**: Help developers understand codebase

```javascript
// 1. Index Codebase
const codeFiles = await glob('src/**/*.{js,ts,py}');

for (const file of codeFiles) {
  const content = await fs.readFile(file, 'utf8');
  
  // Chunk code with larger overlap to preserve context
  const chunks = segmentTextBlocks(content, 500, 100);
  
  await vectorStore.addDocuments(`code-${projectName}`, chunks, {
    filepath: file,
    language: path.extname(file).slice(1),
    lastModified: stats.mtime
  });
}

// 2. Answer Code Questions
async function askCodeQuestion(question) {
  const results = await vectorStore.search(`code-${projectName}`, question, 5);
  
  const prompt = `You are a code documentation assistant.
  
Context (code snippets):
${results.documents.map((doc, i) => 
  `[${i+1}] ${results.metadatas[i].filepath}\n\`\`\`${results.metadatas[i].language}\n${doc}\n\`\`\``
).join('\n\n')}

Question: ${question}

Provide a clear explanation with code examples.`;
  
  const answer = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }]
  });
  
  return answer.choices[0].message.content;
}
```

### Scenario 3: Research Paper Analysis

**Goal**: Query academic papers

```javascript
// 1. Process Papers
async function indexPapers(pdfFiles) {
  for (const pdf of pdfFiles) {
    const result = await DocumentProcessor.process(pdf, 1000, 150);
    
    // Extract metadata from filename/content
    const metadata = {
      title: extractTitle(result.text),
      authors: extractAuthors(result.text),
      year: extractYear(pdf.name),
      topic: classifyTopic(result.text)
    };
    
    await vectorStore.addDocuments('research-papers', result.chunks, metadata);
  }
}

// 2. Academic Search
async function searchPapers(query, filters = {}) {
  const results = await vectorStore.search('research-papers', query, 10);
  
  // Filter by metadata
  const filtered = results.documents.filter((_, i) => {
    const meta = results.metadatas[i];
    if (filters.year && meta.year !== filters.year) return false;
    if (filters.topic && meta.topic !== filters.topic) return false;
    return true;
  });
  
  // Synthesize findings
  const prompt = `Synthesize findings from these research papers:
  
${filtered.map((doc, i) => {
  const meta = results.metadatas[i];
  return `[${i+1}] ${meta.title} (${meta.authors}, ${meta.year})\n${doc}`;
}).join('\n\n')}

Query: ${query}

Provide a comprehensive summary citing paper numbers.`;
  
  const synthesis = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }]
  });
  
  return synthesis.choices[0].message.content;
}
```

### Scenario 4: Multi-Tenant RAG System

**Goal**: Separate knowledge bases per user/organization

```javascript
class MultiTenantRAG {
  constructor(vectorStore, promptBuilder, memory) {
    this.vectorStore = vectorStore;
    this.promptBuilder = promptBuilder;
    this.memory = memory;
  }
  
  // Tenant-specific collection
  getCollectionName(tenantId, namespace = 'docs') {
    return `tenant-${tenantId}-${namespace}`.slice(0, 63);
  }
  
  async uploadDocument(tenantId, file) {
    const result = await DocumentProcessor.process(file);
    const collectionName = this.getCollectionName(tenantId);
    
    await this.vectorStore.addDocuments(collectionName, result.chunks, {
      tenantId,
      filename: result.filename,
      uploadedAt: Date.now()
    });
    
    return { success: true, chunks: result.chunks.length };
  }
  
  async query(tenantId, userId, question) {
    const collectionName = this.getCollectionName(tenantId);
    
    // Search only tenant's documents
    const results = await this.vectorStore.search(collectionName, question, 4);
    
    // Get user's conversation history
    const history = this.memory.get(`${tenantId}-${userId}`, 5);
    
    // Build prompt
    const prompt = this.promptBuilder.build({
      documents: results.documents,
      metadatas: results.metadatas,
      history,
      question
    });
    
    // Generate answer
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    });
    
    const answer = completion.choices[0].message.content;
    
    // Store in history
    this.memory.add(`${tenantId}-${userId}`, question, answer);
    
    return { answer, sources: results };
  }
  
  async deleteTenantData(tenantId) {
    const collectionName = this.getCollectionName(tenantId);
    await this.vectorStore.deleteCollection(collectionName);
  }
}

// USAGE:
const rag = new MultiTenantRAG(vectorStore, promptBuilder, memory);

// Tenant A uploads docs
await rag.uploadDocument('tenant-a', fileA);

// Tenant B uploads docs (separate collection)
await rag.uploadDocument('tenant-b', fileB);

// Query - each tenant only sees their data
const answerA = await rag.query('tenant-a', 'user-123', 'What is X?');
const answerB = await rag.query('tenant-b', 'user-456', 'What is X?');
```

---

## 📊 Key Design Decisions

### 1. Why ChromaDB?

**Advantages:**
- ✅ Easy setup (no complex configuration)
- ✅ Auto-generates embeddings
- ✅ Fast similarity search
- ✅ Lightweight (can run locally)
- ✅ Python & JavaScript support

**Alternatives:**
- **Pinecone**: Managed service, better for production scale
- **Weaviate**: More features, higher complexity
- **FAISS**: Facebook's library, no built-in embedding
- **Qdrant**: Rust-based, very fast

### 2. Why Text Chunking with Overlap?

**Benefits:**
- ✅ Preserves context across boundaries
- ✅ Prevents losing information at split points
- ✅ Improves retrieval accuracy
- ✅ Handles sentences that span chunks

**Trade-offs:**
- ❌ Slightly more storage (10% more)
- ❌ Potential duplicate information in results

### 3. Why Store Conversation History?

**Benefits:**
- ✅ Context-aware responses
- ✅ Follow-up questions work naturally
- ✅ Better user experience

**Implementation:**
- In-memory Map (resets on server restart)
- For production: Use Redis, PostgreSQL, or MongoDB

### 4. Why Citation System?

**Benefits:**
- ✅ Verifiable answers
- ✅ User can trace sources
- ✅ Builds trust in AI responses
- ✅ Helps debug incorrect answers

**Implementation:**
- Format context with `[1], [2], ...` markers
- Instruct model to cite using these numbers
- Return source metadata to frontend
- Display as clickable pills

---

## 🔒 Security Considerations

### 1. File Upload Security

```javascript
// Current implementation
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }  // 10MB
});

// Production additions:
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { 
    fileSize: 10 * 1024 * 1024,
    files: 1
  },
  fileFilter: (req, file, cb) => {
    // Whitelist MIME types
    const allowed = [
      'application/pdf',
      'text/plain',
      'text/markdown',
      'application/json'
    ];
    
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});
```

### 2. Rate Limiting

```javascript
import rateLimit from 'express-rate-limit';

// Limit upload requests
const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,                     // 5 uploads per window
  message: 'Too many uploads, try again later'
});

app.post('/api/upload', uploadLimiter, upload.single('file'), ...);

// Limit chat requests
const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,   // 1 minute
  max: 20,                    // 20 messages per minute
  message: 'Too many questions, slow down'
});

app.post('/api/chat', chatLimiter, ...);
```

### 3. Input Sanitization

```javascript
// Sanitize user questions
function sanitizeInput(text) {
  // Remove control characters
  text = text.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
  
  // Limit length
  if (text.length > 1000) {
    throw new Error('Question too long (max 1000 chars)');
  }
  
  // Trim whitespace
  return text.trim();
}

app.post('/api/chat', async (req, res) => {
  try {
    const message = sanitizeInput(req.body.message);
    // ...
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
```

### 4. API Key Protection

```javascript
// Never expose in frontend
// ❌ BAD:
const openai = new OpenAI({ apiKey: 'sk-...' });  // In client-side JS

// ✅ GOOD:
// Keep in server-side .env
OPENAI_API_KEY=sk-...

// Add to .gitignore
.env
.env.local
```

---

## 🎯 Performance Optimization

### 1. Caching

```javascript
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 });  // 1 hour

app.post('/api/chat', async (req, res) => {
  const { conversationId, message } = req.body;
  
  // Cache key
  const cacheKey = `${conversationId}-${message}`;
  
  // Check cache
  const cached = cache.get(cacheKey);
  if (cached) {
    return res.json(cached);
  }
  
  // Generate response
  const response = await generateAnswer(conversationId, message);
  
  // Store in cache
  cache.set(cacheKey, response);
  
  return res.json(response);
});
```

### 2. Batch Processing

```javascript
// Process multiple documents at once
async function batchUpload(files, conversationId) {
  const results = await Promise.all(
    files.map(file => DocumentProcessor.process(file))
  );
  
  // Combine all chunks
  const allChunks = results.flatMap(r => r.chunks);
  const allMetadata = results.flatMap((r, i) => 
    r.chunks.map((_, j) => ({
      filename: r.filename,
      chunk: j + 1,
      fileIndex: i
    }))
  );
  
  // Single ChromaDB insert
  await vectorStore.addDocuments(conversationId, allChunks, allMetadata);
}
```

### 3. Streaming Responses

```javascript
// Stream OpenAI responses for faster UX
app.post('/api/chat-stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  const stream = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    stream: true
  });
  
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    res.write(`data: ${JSON.stringify({ content })}\n\n`);
  }
  
  res.write('data: [DONE]\n\n');
  res.end();
});
```

---

## 📈 Monitoring & Debugging

### 1. Logging

```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Log important events
app.post('/api/upload', async (req, res) => {
  logger.info('Upload started', {
    conversationId: req.body.conversationId,
    filename: req.file?.originalname,
    size: req.file?.size
  });
  
  try {
    // ... processing
    logger.info('Upload completed', { 
      conversationId: req.body.conversationId,
      chunks: result.chunks
    });
  } catch (error) {
    logger.error('Upload failed', {
      conversationId: req.body.conversationId,
      error: error.message,
      stack: error.stack
    });
  }
});
```

### 2. Metrics

```javascript
// Track key metrics
const metrics = {
  uploads: 0,
  queries: 0,
  errors: 0,
  avgResponseTime: []
};

app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    metrics.avgResponseTime.push(duration);
    
    if (req.path === '/api/upload') metrics.uploads++;
    if (req.path === '/api/chat') metrics.queries++;
    if (res.statusCode >= 400) metrics.errors++;
  });
  
  next();
});

// Metrics endpoint
app.get('/api/metrics', (req, res) => {
  const avg = metrics.avgResponseTime.reduce((a, b) => a + b, 0) / 
              metrics.avgResponseTime.length;
  
  res.json({
    totalUploads: metrics.uploads,
    totalQueries: metrics.queries,
    totalErrors: metrics.errors,
    avgResponseTime: avg.toFixed(2) + 'ms'
  });
});
```

---

## 🔄 Testing Strategy

### 1. Unit Tests

```javascript
import { describe, it, expect } from 'vitest';

describe('segmentTextBlocks', () => {
  it('should create chunks with overlap', () => {
    const text = 'word '.repeat(1000);
    const chunks = segmentTextBlocks(text, 100, 10);
    
    expect(chunks.length).toBeGreaterThan(9);
    expect(chunks[0].split(' ').length).toBeLessThanOrEqual(100);
  });
  
  it('should handle empty text', () => {
    expect(segmentTextBlocks('')).toEqual([]);
    expect(segmentTextBlocks('   ')).toEqual([]);
  });
});

describe('VectorStore', () => {
  it('should add and search documents', async () => {
    const store = new VectorStore(CHROMA_URL, API_KEY, EMBED_MODEL);
    
    await store.addDocuments('test', ['chunk 1', 'chunk 2'], {});
    const results = await store.search('test', 'chunk', 2);
    
    expect(results.documents.length).toBe(2);
  });
});
```

### 2. Integration Tests

```javascript
import request from 'supertest';
import app from './server.js';

describe('API Integration', () => {
  it('should upload document and answer question', async () => {
    // Upload
    const uploadRes = await request(app)
      .post('/api/upload')
      .field('conversationId', 'test-123')
      .attach('file', Buffer.from('Test document content'), 'test.txt');
    
    expect(uploadRes.status).toBe(200);
    expect(uploadRes.body.chunks).toBeGreaterThan(0);
    
    // Query
    const chatRes = await request(app)
      .post('/api/chat')
      .send({
        conversationId: 'test-123',
        message: 'What is in the document?'
      });
    
    expect(chatRes.status).toBe(200);
    expect(chatRes.body.answer).toBeTruthy();
    expect(chatRes.body.sources.length).toBeGreaterThan(0);
  });
});
```

---

## 🚀 Deployment Checklist

### 1. Environment Setup

```bash
# Production .env
NODE_ENV=production
OPENAI_API_KEY=sk-prod-...
OPENAI_MODEL=gpt-4o-mini
OPENAI_EMBED_MODEL=text-embedding-3-small
CHROMA_URL=http://chroma-server:8000
PORT=3000
RETRIEVAL_K=4

# Optional
REDIS_URL=redis://redis:6379
LOG_LEVEL=info
MAX_FILE_SIZE=10485760
```

### 2. Docker Setup

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - CHROMA_URL=http://chroma:8000
    env_file:
      - .env
    depends_on:
      - chroma
  
  chroma:
    image: chromadb/chroma:latest
    ports:
      - "8000:8000"
    volumes:
      - chroma-data:/chroma/chroma

volumes:
  chroma-data:
```

### 3. Monitoring

- Set up error tracking (Sentry, Rollbar)
- Configure uptime monitoring
- Set up log aggregation (ELK, Datadog)
- Monitor OpenAI API usage

---

## 📚 Additional Resources

### ChromaDB
- [Official Docs](https://docs.trychroma.com/)
- [JavaScript Client](https://docs.trychroma.com/js_reference/Client)

### OpenAI
- [Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)
- [Chat Completions](https://platform.openai.com/docs/guides/chat)

### RAG Techniques
- [LangChain RAG Tutorial](https://python.langchain.com/docs/use_cases/question_answering/)
- [RAG Best Practices](https://www.pinecone.io/learn/retrieval-augmented-generation/)

---

## ✅ Summary

This project implements a complete RAG system with:

### Core Features
✅ Document upload and processing (PDF, TXT, MD, JSON)
✅ Text chunking with overlap
✅ Vector embeddings (OpenAI)
✅ Semantic search (ChromaDB)
✅ Context-aware responses (GPT-4o-mini)
✅ Source citations
✅ Conversation history
✅ Modern UI with drag-and-drop

### Reusable Components
✅ Text chunking algorithm
✅ Vector store abstraction
✅ Prompt builder
✅ Document processor
✅ Conversation memory

### Production Ready
✅ Error handling
✅ Input validation
✅ File size limits
✅ Security considerations
✅ Performance optimizations

Use this as a foundation for building RAG systems in:
- Customer support chatbots
- Documentation Q&A
- Research paper analysis
- Code documentation
- Knowledge management systems
- Any domain requiring grounded AI responses

**Key Takeaway**: This RAG architecture is modular and can be adapted to any use case by changing:
1. Document sources (APIs, databases, web scraping)
2. Chunking strategy (size, overlap, method)
3. Retrieval parameters (K, similarity threshold)
4. Prompt templates (instructions, tone, format)
5. Storage backend (ChromaDB, Pinecone, etc.)

