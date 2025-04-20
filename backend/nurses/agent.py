import os
from dotenv import load_dotenv
from langchain.memory import ConversationBufferMemory
from .tools import classify_triage

load_dotenv()

os.environ["LANGCHAIN_TRACING_V2"] = "false"
os.environ["LANGCHAIN_API_KEY"] = ""
os.environ["LANGCHAIN_ENDPOINT"] = ""

SESSION_MEMORY = {}

def get_agent(session_id):
    from langchain_google_genai import ChatGoogleGenerativeAI
    from langchain_core.tools import Tool
    from langchain.agents import initialize_agent, AgentType

    llm = ChatGoogleGenerativeAI(
        model="models/gemini-1.5-pro",
        google_api_key="",
        convert_system_message_to_human=True

    )

    tools = [Tool(name="classify_triage", func=classify_triage, description="Classify ESI level")]

    if session_id not in SESSION_MEMORY:
        SESSION_MEMORY[session_id] = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

    return initialize_agent(
        tools=tools,
        llm=llm,
        agent=AgentType.OPENAI_FUNCTIONS,
        memory=SESSION_MEMORY[session_id],
        verbose=True
    )
