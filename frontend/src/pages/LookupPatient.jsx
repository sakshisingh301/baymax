import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function LookupPatient() {
  const [patientName, setPatientName] = useState('');
  const [modalText, setModalText] = useState();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    // Call API to check if patient exists
    try {
      const response = await fetch('/api/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: patientName })
      });
      const data = await response.json();

      if (data.exists) {
        setModalText('Patient Found!');
        setShowModal(true);
      } else {
        setModalText('Patient Not Found!');
        setShowModal(true);
        setTimeout(() => navigate('/add-details'), 2000);
      }
    } catch (err) {
      console.error('Error checking patient:', err);
    }
  };

  const handleAdd = () => {
    navigate('/add-details');
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-300 to-slate-500 font-mono">
      <Navbar/>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-white text-2xl font-semibold flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-6-8h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V10a2 2 0 012-2z" />
          </svg>
          Lookup Patients
        </div>

        <div className="relative w-full max-w-md">
          <input
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full px-4 py-3 rounded-l-lg text-black text-lg"
            placeholder="Enter patient name"
          />
          <button className="absolute right-0 top-0 bottom-0 px-4 py-3 bg-white rounded-r-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 104.5 10.5a6.5 6.5 0 0012.999 0z" />
            </svg>
          </button>
        </div>

        <button
          onClick={handleSearch}
          className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-2 rounded"
        >
          Search!
        </button>

        <div className="text-white text-xl">OR</div>

        <div className="text-white text-2xl font-semibold flex items-center gap-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Patient
        </div>
        <button
          onClick={handleAdd}
          className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="flex flex-col gap-9 bg-slate-500 text-white text-xl px-10 py-6 rounded-lg shadow-xl">
            {modalText}
            <button
              onClick={handleAdd}
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded"
            >
              Okay!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
