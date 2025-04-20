# tools.py

import os
from dotenv import load_dotenv
from langchain_core.tools import tool
from langchain.memory import ConversationBufferMemory
from langchain.agents import initialize_agent, AgentType
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.tools import Tool

# Load environment variables
load_dotenv()

# Define your triage classification tool
@tool
def classify_triage(symptoms: str, vitals: str, answers: str) -> str:
    """Classifies a patient's triage level based on symptoms, vitals, and nurse responses."""
    if "chest pain" in symptoms and "88" in vitals:
        return "ESI 1: Cardiac symptoms with unstable vitals"
    return "ESI 3: Monitor, patient appears stable"

# Prepare tool list for the agent
tools = [
    Tool(
        name="classify_triage",
        func=classify_triage,
        description="Classify ESI level using symptoms, vitals, and nurse answers"
    )
]

# Create session-based memory cache
SESSION_MEMORY = {}

def get_agent(session_id: str):
    # Load Gemini model
    llm = ChatGoogleGenerativeAI(
        model="models/gemini-1.5-pro",
        google_api_key="",
        convert_system_message_to_human=True
    )

    # Attach memory to session if not already created
    if session_id not in SESSION_MEMORY:
        SESSION_MEMORY[session_id] = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True
        )

    # Create and return the initialized agent
    return initialize_agent(
        tools=tools,
        llm=llm,
        agent=AgentType.OPENAI_FUNCTIONS,
        memory=SESSION_MEMORY[session_id],
        verbose=True
    )
