import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
    <>
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-300 to-slate-500 font-mono">
      <Navbar/>

      {/* Patient Status Box */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-10">
        <div className="font-main text-5xl flex items-center gap-2">
        <img
          src="/polygon.png"
          alt="Icon description"
          className="w-7 h-7 mr-3 translate-y-0.5"
        />
          Patient Status
        </div>
        <div className="bg-white rounded-lg shadow-md p-15 w-full max-w-3xl">
          <pre className="text-black whitespace-pre-wrap text-xl">
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
              className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </>
  );
}
