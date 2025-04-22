import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AddDetails() {
  const [formData, setFormData] = useState({ name: '', age: '', height: '', weight: '' });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPatient = async () => {
    // Call backend to add patient to DB
    try {
      const response = await fetch('http://localhost:8000/patient/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000);
      } else {
        console.error('Failed to add patient.');
      }
    } catch (err) {
      console.error('Error during patient addition:', err);
    }
  };

  const handleStartConversation = () => {
    navigate('/chat');
  };

  return (
    <>
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-300 to-slate-500 font-mono">
      <Navbar/>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 w-full">
        <div className="font-main text-5xl flex items-center gap-2 mb-15">
          <img
            src="/polygon.png"
            alt="Icon description"
            className="w-7 h-7 mr-3 translate-y-0.5"
          />
            Add Patient Details
        </div>

        <div className="bg-white rounded-lg shadow-md p-20 w-full max-w-5xl space-y-4">
          {['name', 'age', 'height', 'weight'].map(field => (
            <div key={field} className="flex items-center gap-4">
              <label htmlFor={field} className="w-20 font-medium text-black capitalize">
                {field}:
              </label>
              <input
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full bg-gray-200 px-4 py-2 rounded text-black"
              />
            </div>
          ))}

          <div className="flex justify-center gap-30 pt-6">
            <button
              onClick={handleAddPatient}
              className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded cursor-pointer"
            >
              Add patient
            </button>
            <button
              onClick={handleStartConversation}
              className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded cursor-pointer"
            >
              Start Conversation
            </button> 
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-slate-500 text-white text-xl px-10 py-6 rounded-lg shadow-xl">
            Patient added successfully!
          </div>
        </div>
      )}
    </div>
  <Footer/>
  </>
  );
}
