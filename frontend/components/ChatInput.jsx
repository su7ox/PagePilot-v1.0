'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setWaiting, setError } from '../store/chatSlice';
import { sendChatMessage } from '../services/api';

export default function ChatInput() {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const { isWaitingForResponse, isUploading } = useSelector((state) => state.chat);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isWaitingForResponse || isUploading) return;

    const userQuestion = input.trim();
    setInput(''); // Clear input field

    // 1. Add user message to screen instantly
    dispatch(addMessage({ role: 'user', content: userQuestion }));
    
    // 2. Show "thinking" animation
    dispatch(setWaiting(true));
    dispatch(setError(null));

    try {
      // 3. Ask the Python Backend
      const response = await sendChatMessage(userQuestion);
      
      // 4. Add AI response to screen
      dispatch(addMessage({ role: 'ai', content: response.answer }));
    } catch (err) {
      dispatch(setError('Failed to get a response from the AI.'));
    } finally {
      // 5. Hide "thinking" animation
      dispatch(setWaiting(false));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask anything about your document..."
        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isWaitingForResponse || isUploading}
      />
      <button 
        type="submit"
        disabled={isWaitingForResponse || isUploading || !input.trim()}
        className="bg-gray-800 hover:bg-gray-900 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Send
      </button>
    </form>
  );
}