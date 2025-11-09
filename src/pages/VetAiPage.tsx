import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Trash2, Bot, User, Clock, Wrench, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { chatService, formatTime, renderToolCall } from '@/lib/chat';
import type { ChatState } from '../../worker/types';
export function VetAiPage() {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    sessionId: chatService.getSessionId(),
    isProcessing: false,
    model: 'google-ai-studio/gemini-2.5-flash',
    streamingMessage: ''
  });
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const loadCurrentSession = useCallback(async () => {
    const response = await chatService.getMessages();
    if (response.success && response.data) {
      setChatState(prev => ({ ...prev, ...response.data }));
    }
  }, []);
  useEffect(() => {
    chatService.newSession(); // Start a new session for the vet AI
    loadCurrentSession();
  }, [loadCurrentSession]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.messages, chatState.streamingMessage]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatState.isProcessing) return;
    const message = input.trim();
    setInput('');
    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user' as const,
      content: message,
      timestamp: Date.now()
    };
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isProcessing: true,
      streamingMessage: ''
    }));
    await chatService.sendMessage(message, chatState.model, (chunk) => {
      setChatState(prev => ({
        ...prev,
        streamingMessage: (prev.streamingMessage || '') + chunk
      }));
    });
    await loadCurrentSession();
    setChatState(prev => ({ ...prev, isProcessing: false }));
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  const handleClear = async () => {
    await chatService.clearMessages();
    await loadCurrentSession();
  };
  return (
    <div className="container-padding section-padding">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="font-display text-5xl md:text-7xl text-beagle-brown">AI Vet Assistant</h1>
        <p className="mt-4 text-lg text-beagle-brown/70 max-w-2xl mx-auto">
          Get instant, helpful advice for your beagle-related questions from our specialized AI.
        </p>
      </motion.div>
      <Card className="max-w-4xl mx-auto mt-12 h-[70vh] flex flex-col shadow-2xl">
        <CardHeader className="flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-beagle-coral/20 rounded-full">
              <Sparkles className="h-6 w-6 text-beagle-coral" />
            </div>
            <CardTitle className="text-2xl text-beagle-brown">Beagle Bot</CardTitle>
          </div>
          <Button variant="outline" size="icon" onClick={handleClear} title="Clear conversation">
            <Trash2 className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-6">
          {chatState.messages.length === 0 && (
            <div className="text-center text-beagle-brown/60 py-8">
              <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="font-bold">Ask me anything about your Beagle!</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Badge variant="secondary">"Why do beagles howl?"</Badge>
                <Badge variant="secondary">"Best food for a beagle puppy?"</Badge>
                <Badge variant="secondary">"How much exercise do they need?"</Badge>
              </div>
            </div>
          )}
          {chatState.messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && <Bot className="w-8 h-8 text-beagle-coral flex-shrink-0 mt-1" />}
              <div className={`max-w-[85%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-beagle-coral text-white rounded-br-none'
                  : 'bg-white text-beagle-brown rounded-bl-none'
              }`}>
                <p className="whitespace-pre-wrap">{msg.content}</p>
                {msg.toolCalls && msg.toolCalls.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-current/20">
                    {msg.toolCalls.map((tool, idx) => (
                      <Badge key={idx} variant="secondary" className="mr-1 mb-1 text-xs">
                        <Wrench className="w-3 h-3 mr-1" /> {renderToolCall(tool)}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              {msg.role === 'user' && <User className="w-8 h-8 text-beagle-brown/70 flex-shrink-0 mt-1" />}
            </motion.div>
          ))}
          {chatState.streamingMessage && (
            <div className="flex gap-3 justify-start">
              <Bot className="w-8 h-8 text-beagle-coral flex-shrink-0 mt-1" />
              <div className="bg-white text-beagle-brown p-4 rounded-2xl rounded-bl-none max-w-[85%]">
                <p className="whitespace-pre-wrap">{chatState.streamingMessage}<span className="animate-pulse">|</span></p>
              </div>
            </div>
          )}
          {chatState.isProcessing && !chatState.streamingMessage && (
            <div className="flex gap-3 justify-start">
              <Bot className="w-8 h-8 text-beagle-coral flex-shrink-0 mt-1" />
              <div className="bg-white p-4 rounded-2xl rounded-bl-none">
                <div className="flex space-x-1.5">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="w-2 h-2 bg-beagle-coral rounded-full animate-pulse" style={{animationDelay: `${i * 150}ms`}} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </CardContent>
        <div className="p-4 border-t bg-white/50">
          <div className="text-xs text-center text-beagle-brown/60 mb-2 flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            AI can make mistakes. This is not a substitute for professional veterinary advice.
          </div>
          <form onSubmit={handleSubmit} className="flex gap-4 items-center">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your beagle's health, behavior, or care..."
              className="flex-1 min-h-[48px] max-h-48 resize-none"
              rows={1}
              disabled={chatState.isProcessing}
            />
            <Button type="submit" size="lg" className="bg-beagle-coral hover:bg-beagle-coral/90 text-white" disabled={!input.trim() || chatState.isProcessing}>
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}