'use client';

import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

export default function ChatWindow() {
  const { messages, isWaitingForResponse, error } = useSelector((state) => state.chat);
  const endOfMessagesRef = useRef(null);

  // Auto-scroll to the bottom when new messages arrive
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isWaitingForResponse]);

  return (
    <div className="flex-1 w-full max-w-2xl mx-auto bg-gray-50 rounded-lg shadow-inner p-4 overflow-y-auto border border-gray-200 mt-4 mb-4" style={{ minHeight: '400px', maxHeight: '600px' }}>
      
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-400">
          Upload a PDF and ask a question to begin!
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      )}

      {isWaitingForResponse && (
        <div className="flex justify-start mt-4">
          <div className="bg-white text-gray-500 border border-gray-200 p-3 rounded-lg rounded-bl-none shadow-sm animate-pulse">
            Gemini is thinking...
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      {/* Invisible div to scroll to */}
      <div ref={endOfMessagesRef} />
    </div>
  );
}