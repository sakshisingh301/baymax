import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';

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
  const [qaPairs, setQaPairs] = useState({});
  const [initialInput, setInitialInput] = useState('');

  const session_id = "session_john_1";
  const patient_id = "clarkkent_318";
  const vitals = { bp: "90/60", spo2: 88 }; // shared vitals object

 const handleSend = async () => {
  if (!input.trim()) return;

  const userMessage = { sender: 'user', text: input };
  setMessages(prev => [...prev, userMessage]);
  setInput('');
  setIsTyping(true);

  // First time input (initial symptom)
  if (!initialInput) {
    setInitialInput(input);

    const response = await fetch('http://localhost:8000/patient/agent/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id,
        patient_id,
        message: input,
        vitals
      }),
    });

    const data = await response.json();
    print(data)
    const questionsArray = data.response.follow_up_questions;

    // Check if questionsArray is valid
    if (questionsArray && questionsArray.length > 0) {
      setQuestions(questionsArray);
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'bot', text: questionsArray[0].question }]);
        setIsTyping(false);
      }, 800);
    } else {
      setMessages(prev => [...prev, { sender: 'bot', text: 'No follow-up questions available.' }]);
      setIsTyping(false);
    }

  } else {
    const currentQuestion = questions[currentQuestionIndex];

    // Ensure that currentQuestion is defined
    if (currentQuestion) {
      const updatedQaPairs = { ...qaPairs, [`Question${currentQuestionIndex + 1}`]: input };
      setQaPairs(updatedQaPairs);

      if (currentQuestionIndex === 4) {
        // Prepare answers for the final API call
        const answers = {};
        Object.keys(updatedQaPairs).forEach((question, index) => {
          answers[question] = updatedQaPairs[question];
        });

        // Final API call with all answers
        const finalResponse = await fetch('http://localhost:8000/patient/agent/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            session_id,
            patient_id,
            message: { answers },  // Send answers dynamically
            vitals
          }),
        });

        const result = await finalResponse.json();

        setTimeout(() => {
          setMessages(prev => [...prev, { sender: 'bot', text: result.finalDiagnosis }]);
          setIsTyping(false);
          setCurrentQuestionIndex(5); // End of questions
        }, 1000);
      } else {
        // Move to the next question
        const nextQuestion = questions[currentQuestionIndex + 1];

        // Ensure nextQuestion exists
        if (nextQuestion) {
          setCurrentQuestionIndex(prev => prev + 1);
          setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'bot', text: nextQuestion.question }]);
            setIsTyping(false);
          }, 800);
        } else {
          setMessages(prev => [...prev, { sender: 'bot', text: 'No more questions available.' }]);
          setIsTyping(false);
        }
      }
    } else {
      setMessages(prev => [...prev, { sender: 'bot', text: 'No more questions available.' }]);
      setIsTyping(false);
    }
  }
};


  const navigate = useNavigate();

  const handleLike = () => {
        //
  };

  const handleDislike = () => {
    // TODO: Trigger dislike API or feedback logic
  };

  return (
    <>
      <div className="h-screen flex flex-col font-mono overflow-hidden">
        <Navbar />

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
              <button onClick={() => navigate('/results')} className="bg-green-300 hover:bg-green-400 text-black px-4 py-1 rounded">Like</button>
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
      <Footer />
    </>
  );
}