import axios from 'axios';

const AI_API_URL = import.meta.env.VITE_AI_API_URL || 'http://localhost:3001';

/**
 * Send a message to the AI booking assistant
 * @param {string} message - User's message
 * @param {string} conversationId - Unique conversation ID
 * @param {string} token - JWT authentication token
 * @returns {Promise<{message: string, conversationId: string}>}
 */
export async function chatWithAI(message, conversationId, token) {
  try {
    const response = await axios.post(`${AI_API_URL}/api/chat`, {
      message,
      conversationId,
      token,
    });

    return response.data;
  } catch (error) {
    console.error('AI Chat Error:', error);
    throw new Error(
      error.response?.data?.error || 'فشل الاتصال بمساعد الحجز الذكي'
    );
  }
}

/**
 * Reset a conversation
 * @param {string} conversationId - Conversation ID to reset
 * @returns {Promise<void>}
 */
export async function resetConversation(conversationId) {
  try {
    await axios.post(`${AI_API_URL}/api/chat/reset`, {
      conversationId,
    });
  } catch (error) {
    console.error('Reset Conversation Error:', error);
    throw new Error('فشل إعادة تعيين المحادثة');
  }
}

/**
 * Check AI service health
 * @returns {Promise<boolean>}
 */
export async function checkAIServiceHealth() {
  try {
    const response = await axios.get(`${AI_API_URL}/health`);
    return response.data.status === 'ok';
  } catch (error) {
    console.error('AI Service Health Check Failed:', error);
    return false;
  }
}

