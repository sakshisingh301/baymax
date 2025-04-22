import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Results() {
  const navigate = useNavigate();

  // Set default values for patient data initially
  const [patientData, setPatientData] = useState({
    name: "Laura Sans",
    age: 38,
    steps: [
      "Administer oxygen via nasal cannula or mask as per hospital protocol.",
      "Obtain IV access.",
      "Place the patient on a cardiac monitor to continuously assess heart rate and rhythm.",
      "Obtain a 12-lead ECG immediately.",
      "Administer nitroglycerin sublingually as per physician order or hospital protocol for suspected cardiac ischemia. Be prepared to administer morphine for pain relief as order",
      "Recommended Tests/Procedures (STAT)-Cardiac enzyme panel (troponin), Chest X-Ray",
      "D-dimer"
    ],
    priority: "ES1 level 1", // Default priority
    waitTime: "N/A",         // Default wait time
    queueNumber: "N/A",     // Default queue number
    condition: "—",         // Default health condition
  });

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await fetch('http://localhost:8000/patient/agent/');
        const json = await res.json();
        const r = json.response;

        setPatientData({
          // update with actual data from API if available
          name: r.name || patientData.name,
          age: r.age || patientData.age,
          steps: r.steps || patientData.steps,
          priority: `ES1 level ${r.ES1_Level}` || patientData.priority,
          waitTime: r.wait_time || patientData.waitTime,
          queueNumber: r.session_id || patientData.queueNumber,
          condition: r.recommendation || patientData.condition,
        });
      } catch (err) {
        console.error("Failed to load triage results", err);
      }
    }

    fetchResults();
  }, []);

  return (
    <div className="flex flex-col bg-gradient-to-br from-slate-300 to-slate-500 font-mono">
      <Navbar/>

      {/* Patient Status Box */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-10">
        <div className="font-main text-5xl flex items-center gap-2 pt-8">
          <img
            src="/polygon.png"
            alt="Icon"
            className="w-7 h-7 mr-3 translate-y-0.5"
          />
          Patient Status
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
          <pre className="text-black whitespace-pre-wrap text-xl">
            Name: {patientData.name} <br/>
            Age: {patientData.age} <br/><br/>

            Priority Category: {patientData.priority} <br/>
            Estimated Wait Time: {patientData.waitTime} <br/>
            Queue Number: {patientData.queueNumber} <br/>
            Classified Health Condition: {patientData.condition} <br/><br/>

            Immediate Steps: <br/>
            {patientData.steps.map((step, i) => `• ${step}\n`).join('')}
          </pre>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate('/')}
              className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded"
            >
              Done
            </button>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}
