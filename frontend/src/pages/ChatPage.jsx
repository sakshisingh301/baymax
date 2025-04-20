import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';

function ChatBubble({ text, sender }) {
  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'items-start'} mt-4`}>
      {sender === 'bot' && (
        <img src='/chat-icon.png' alt="Baymax" className="w-10 h-10 rounded-full mr-2" />
      )}
      <div
        className={`rounded-lg px-4 py-2 max-w-md whitespace-pre-line ${
          sender === 'bot' ? 'bg-white text-black' : 'bg-blue-900 text-white'
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-start mt-4">
      <img src='/chat-icon.png' alt="Baymax" className="w-10 h-10 rounded-full mr-2" />
      <div className="px-4 py-2 bg-white text-black rounded-lg animate-pulse">
        Baymax is typing...
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! What is the problem?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [conversationData, setConversationData] = useState({ initial: '', answers: [] });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    if (conversationData.initial === '') {
      const updatedConversation = { ...conversationData, initial: input };
      setConversationData(updatedConversation);

      // API CALL 1: Send initial symptoms, receive 5 questions
      const response = await fetch('/api/askQuestions', {
        method: 'POST',
        body: JSON.stringify({ symptoms: input }),
      });
      const data = await response.json();
      setIsTyping(false);

      const questionsArray = data.questions; // assume array of 5 questions
      setQuestions(questionsArray);

      const questionMessages = questionsArray.map(q => ({ sender: 'bot', text: q }));
      setMessages(prev => [...prev, ...questionMessages]);
    } else {
      // storing answers to each question
      const updatedAnswers = [...conversationData.answers, input];
      setConversationData({ ...conversationData, answers: updatedAnswers });

      // if done answering all questions
      if (currentQuestionIndex === 4) {
        setIsTyping(true);

        // API CALL 2: Send full json for final diagnosis
        const finalResponse = await fetch('/api/finalDiagnosis', {
          method: 'POST',
          body: JSON.stringify({
            initial: conversationData.initial,
            answers: updatedAnswers
          }),
        });
        const result = await finalResponse.json();

        setMessages(prev => [...prev, { sender: 'bot', text: result.finalDiagnosis }]);
        setIsTyping(false);
        setCurrentQuestionIndex(5); // trigger feedback state
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }
  };

  const handleLike = () => {
    // TODO: Trigger like API or feedback logic
  };

  const handleDislike = () => {
    // TODO: Trigger dislike API or feedback logic
  };

  return (
    <div className="h-screen flex flex-col font-mono overflow-hidden">
      <Navbar/>
      {/* Chat display */}
      <div className="flex-1 px-6 pt-4 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} text={msg.text} sender={msg.sender} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Feedback buttons */}
      {currentQuestionIndex === 5 && (
        <div className="flex justify-center my-4">
          <div className="bg-white p-4 rounded shadow-md flex gap-4 items-center">
            <span className="text-black">Rate this diagnosis:</span>
            <button onClick={handleLike} className="bg-green-300 hover:bg-green-400 text-black px-4 py-1 rounded">Like</button>
            <button onClick={handleDislike} className="bg-red-300 hover:bg-red-400 text-black px-4 py-1 rounded">Dislike</button>
          </div>
        </div>
      )}

      {/* Message input */}
      <div className="flex items-center px-4 py-3 bg-slate-800">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded bg-gray-200 outline-none text-black"
          disabled={isTyping || currentQuestionIndex > 5}
        />
        <button
          onClick={handleSend}
          disabled={isTyping || currentQuestionIndex > 5}
          className="ml-4 px-4 py-2 bg-orange-400 hover:bg-orange-500 text-white rounded transition disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
