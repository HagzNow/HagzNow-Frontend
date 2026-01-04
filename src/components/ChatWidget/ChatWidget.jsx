import { useState, useEffect, useRef, useContext } from 'react';
import { Send, X, MessageCircle, Loader2, RefreshCw } from 'lucide-react';
import { authContext } from '@/Contexts/AuthContext';
import { chatWithAI, resetConversation } from '@/services/aiBookingService';
import './ChatWidget.css';

export default function ChatWidget() {
  const { token, user } = useContext(authContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Generate a new unique conversation ID on each page load/component mount
  const [conversationId] = useState(() => `conv-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: `مرحباً ${
            user?.fName || 'بك'
          }! 👋\n\nأنا مساعدك الذكي لحجز الملاعب الرياضية.\n\nيمكنني مساعدتك في:\n• إيجاد الملاعب المناسبة\n• معرفة الأسعار والمواعيد\n• إتمام الحجز بسهولة\n\nما الرياضة التي تريد ممارستها اليوم؟ 🏃‍♂️⚽🏀`,
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, user, messages.length]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await chatWithAI(inputMessage, conversationId, token);

      const aiMessage = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);

      const errorMessage = {
        role: 'assistant',
        content: 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى. 😔',
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReset = async () => {
    try {
      await resetConversation(conversationId);
      setMessages([]);
      setIsOpen(false);
      setTimeout(() => setIsOpen(true), 100);
    } catch (error) {
      console.error('Reset error:', error);
    }
  };

  // Don't show if not logged in
  if (!token || !user) {
    return null;
  }

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="chat-widget-toggle" aria-label="Open chat">
          <MessageCircle size={24} />
          <span className="chat-widget-badge">AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-widget-container">
          {/* Header */}
          <div className="chat-widget-header">
            <div className="chat-widget-header-content">
              <div className="chat-widget-avatar">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="chat-widget-title">مساعد الحجز الذكي</h3>
                <p className="chat-widget-subtitle">متصل الآن</p>
              </div>
            </div>
            <div className="chat-widget-header-actions">
              <button onClick={handleReset} className="chat-widget-header-btn" title="بدء محادثة جديدة">
                <RefreshCw size={18} />
              </button>
              <button onClick={() => setIsOpen(false)} className="chat-widget-header-btn" title="إغلاق">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-widget-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.role === 'user' ? 'chat-message-user' : 'chat-message-assistant'} ${
                  msg.isError ? 'chat-message-error' : ''
                }`}
              >
                <div className="chat-message-content">
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <div className="chat-message-time">
                  {msg.timestamp.toLocaleTimeString('ar-EG', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message chat-message-assistant">
                <div className="chat-message-content">
                  <div className="chat-loading">
                    <Loader2 className="chat-loading-spinner" size={16} />
                    <span>جاري الكتابة...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-widget-input-container">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="اكتب رسالتك هنا..."
              className="chat-widget-input"
              rows={1}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="chat-widget-send-btn"
              aria-label="إرسال"
            >
              {isLoading ? <Loader2 className="chat-loading-spinner" size={20} /> : <Send size={20} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
