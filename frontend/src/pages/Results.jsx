import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Results() {
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState({
    name: "Laura Sans",
    age: 12,
    priority: "P0",
    waitTime: "10 mins",
    queueNumber: "8/10",
    condition: "Heart attack",
    steps: ["Apply CPR", "Call emergency support", "Monitor vitals"]
  });

  useEffect(() => {
    // Make the final API call to get the results data
    async function fetchResults() {
      const response = await fetch('/api/finalResults');
      const data = await response.json();
      setPatientData(data);
    }
    fetchResults();
  }, []);

  if (!patientData) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-300 to-slate-500 font-mono">
        <p className="text-xl text-white">Loading results...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-300 to-slate-500 font-mono">
      <Navbar/>

      {/* Patient Status Box */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-2xl">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-6-8h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V10a2 2 0 012-2z" />
            </svg>
            Patient Status
          </h2>
          <pre className="text-black whitespace-pre-wrap">
            Name: {patientData.name} <br/>
            Age: {patientData.age} <br/>
            <br/>
            Priority Category: {patientData.priority} <br/>
            Estimated Wait Time: {patientData.waitTime} <br/>
            Queue Number: {patientData.queueNumber} <br/>
            Classified Health Condition: {patientData.condition} <br/>
            <br/>
            Immediate Steps: <br/>
            {patientData.steps.map((step, index) => `• ${step}\n`).join('')}
          </pre>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate('/')} // or another route
              className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
