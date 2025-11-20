import { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { sendMessage } from '../services/chat';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  origem?: string | null;
  id?: string;
}

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Olá! Sou o Touch, seu assistente virtual. Como posso te ajudar?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversaId, setConversaId] = useState<number | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { user, loginWithGoogle } = useAuth();

  const handleSendMessage = async () => {
    setError(null);
    if (!inputMessage.trim()) return;

    // require authenticated user
    if (!user) {
      // trigger social login flow
      await loginWithGoogle();
      return;
    }

    const text = inputMessage.trim();
    const userMessage: Message = { text, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);

    try {
      const res = await sendMessage(text, conversaId);
      // if backend returned conversa_id, persist it to reuse for next messages
      if (res.conversa_id && !conversaId) {
        setConversaId(res.conversa_id);
      }

      const botMessage: Message = {
        text: res.response ?? 'Sem resposta do servidor.',
        sender: 'bot',
        timestamp: new Date(),
        origem: res.origem_contexto ?? null,
        id: `srv-${Date.now()}`
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Erro ao enviar mensagem:', err);
      setError(err?.response?.data?.detail ?? err?.message ?? 'Erro ao contatar servidor');
      const failMsg: Message = { text: 'Erro ao obter resposta. Tente novamente.', sender: 'bot', timestamp: new Date() };
      setMessages(prev => [...prev, failMsg]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-20 h-20 bg-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50"
        aria-label="Chat com Touch Assistente"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            🤖
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="fixed bottom-32 right-8 bg-white rounded-2xl shadow-2xl w-96 z-50 flex flex-col" style={{ maxHeight: '70vh' }}>
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-full">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Touch Assistente</h3>
                  <p className="text-white/90 text-sm flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-white/80 transition-colors text-2xl font-bold"
                aria-label="Fechar chat"
              >
                ×
              </button>
            </div>
          </div>

          
          <div className="flex-1 p-5 overflow-y-auto bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={message.id ?? index}
                className={`mb-3 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
              >
                <div 
                  className={`inline-block rounded-xl p-3 max-w-xs ${message.sender === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 shadow-sm'}`}
                >
                  <p className="text-sm">{message.text}</p>
                  {message.origem && (
                    <p className="text-xs opacity-60 mt-1">Origem: {message.origem}</p>
                  )}
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter' && inputMessage.trim()) {
                    handleSendMessage();
                  }
                }}
                placeholder="Digite sua mensagem..."
                className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Digite sua mensagem"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Enviar mensagem"
              >
                {loading ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
