# 🤖 Baymax – Your Intelligent Triage Assistant

Baymax is an AI-powered triage assistant designed to support healthcare professionals during the initial assessment of patients in emergency settings. It converts free-text symptom descriptions into structured clinical assessments, determines triage acuity levels, and ensures strict protocol adherence through real-time guidance.

---

## 🚑 Inspiration

Baymax was born from an eye-opening article titled **“Triage: A Critical First Step in Emergency Care”** by Bell Law Firm. The article shed light on the critical role of triage in emergency medicine and the catastrophic impact of protocol failures. We set out to build a solution that actively supports nurses and frontline workers in delivering safe, consistent, and timely emergency care—minimizing human error while enhancing clinical efficiency.

---

## 💡 What It Does

- Accepts **free-text symptom input** from nurses or patients.
- Dynamically generates **contextual follow-up questions**.
- Processes responses with **vitals and patient data** to determine the **Emergency Severity Index (ESI)** level.
- Provides **clinical rationale**, **preventive care measures**, and **next steps** to guide nurses.
- Flags **critical protocol steps** and prompts for any missing information.

---

## 🛠️ How We Built It

- **Backend**: Django + Django REST Framework
- **LLM Integration**: LangChain with Google Gemini model (session-based memory and agent execution)
- **Database**: MongoDB (stores patient profiles and session history)
- **Prompt Engineering**: Designed for safety, compliance, and clinical clarity
- **Frontend**: React (Next.js App Router), Tailwind CSS, TypeScript






