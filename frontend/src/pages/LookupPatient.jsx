import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    <>
    <div className="h-screen flex flex-col font-mono">
      <Navbar/>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-22 px-4 w-full">
        <div className='flex flex-col items-center gap-8 w-full'>
          <div className="font-main text-5xl flex items-center gap-2">
          <img
            src="/polygon.png"
            alt="Icon description"
            className="w-7 h-7 mr-3 translate-y-0.5"
          />
            Lookup Patients
          </div>

          <div className="relative w-full max-w-2xl">
          <form className="w-full mx-auto flex items-center bg-white rounded-md shadow-md overflow-hidden">
            <input
              type="text"
              placeholder="Search for patients..."
              className="flex-grow px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none text-lg"
            />
            <button type="submit" className="bg-transparent px-4 py-3">
              <img
                src="/search-glass.png" 
                alt="Search"
                className="w-6 h-6 object-contain"
              />
            </button>
          </form>
          </div>

          <button
            onClick={handleSearch}
            className="bg-orange-400 hover:bg-orange-500 text-white font-medium px-6 py-2 rounded cursor-pointer"
          >
            Search
          </button>
        </div>

        <div className="font-main text-4xl flex items-center gap-2">OR</div>

        <div className='flex flex-col items-center gap-8'>
          <div className="font-main text-5xl flex items-center gap-2">
          <img
            src="/polygon.png"
            alt="Icon description"
            className="w-7 h-7 mr-3 translate-y-0.5"
          />
            Add Patient
          </div>
          <button
            onClick={handleAdd}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded cursor-pointer"
          >
            Add
          </button>
        </div>
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
    <Footer/>
  </>
  );
}
