# nurses/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .agent import get_agent
from .connection import patients
from .serializer import PatientSerializer


class RegisterPatient(APIView):
    def post(self, request):
        print(request)
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            patient = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetPatientById(APIView):
    def get(self, request, patient_id):
        from nurses.connection import patients

        patient = patients.find_one({"patient_id": patient_id}, {"_id": 0})

        if patient:
            return Response(patient, status=status.HTTP_200_OK)
        return Response({"error": "Patient not found"}, status=status.HTTP_404_NOT_FOUND)

class TriageAgentView(APIView):
    def post(self, request):
        print("POST method received on /patient/agent/")
        session_id = request.data.get("session_id")
        patient_id = request.data.get("patient_id")
        message = request.data.get("message")
        vitals = request.data.get("vitals", {})
        print(session_id)
        print(patient_id)

        if not session_id or not patient_id or not message:
            return Response({"error": "Missing required fields: session_id, patient_id, or message."}, status=400)

        try:
            # Fetch patient info from MongoDB
            patient_info = get_patient_details(patient_id)
            print(patient_info)


            # Initialize agent with session-based memory
            agent = get_agent(session_id)

            # If this is the initial message with text (not answers)
            if isinstance(message, str):
                prompt = f"""
You are a triage AI assistant.

Patient Info:
- Name: {patient_info['name']}
- Age: {patient_info['age']}
- Gender: {patient_info['gender']}
- History: {', '.join(patient_info.get('history', []))}


Vitals:
- BP: {vitals.get('bp')}
- SpO2: {vitals.get('spo2')}

Nurse Observation: {message}

Step 1: Extract symptoms from the {message}.
Step 2: Ask 5 relevant follow-up questions to clarify condition.
Please format the follow-up questions in the following way:
1. [First question]
2. [Second question]
3. [Third question]
4. [Fourth question]
5. [Fifth question]
"""

                agent_response = agent.invoke({"input": prompt})
                print("agent",agent_response)
                output = agent_response.get("output", "")
                print("sakshi : ",output)
                symptoms = self.extract_symptoms(output)
                follow_up_questions = self.extract_follow_up_questions(output)
                response = {
                    "session_id": session_id,
                    "patient_id": patient_id,
                    "symptoms": symptoms,
                    "follow_up_questions": follow_up_questions
                }

                return Response({"response_type": "followup_questions", "response": response})

            # If message contains answers to follow-up questions
            elif isinstance(message, dict) and "answers" in message:
                answer_text = "\n".join([f"{k}: {v}" for k, v in message["answers"].items()])

                prompt = f"""
You are a triage AI assistant. Continue the session.
Here are the nurse's answers to your previous questions:
{answer_text}

Use the full context (patient, vitals, symptoms, answers) to:
- Classify the Emergency Severity Index (ESI level)
- Recommend the expected wait time
- Provide a brief clinical justification.
"""
                agent_response = agent.run(prompt)
                esi_level, wait_time, clinical_justification = self.extract_triage_info(agent_response)
                response = {
                    "session_id": session_id,
                    "patient_id": patient_id,
                    "ES1_Level": esi_level,
                    "wait_time": wait_time,
                    "recommendation": clinical_justification
                }


                return Response({"response_type": "triage_result", "response": response})

            else:
                return Response({"error": "Invalid message format."}, status=400)

        except Exception as e:
            return Response({"error": str(e)}, status=500)


    def extract_symptoms(self, output):
        # Extract symptoms from the "output" string
        symptoms = []
        symptom_section = output.split("Step 1: Symptoms:")[1].split("Step 2:")[0]
        symptom_lines = symptom_section.strip().split("\n")

        for line in symptom_lines:
            if line.strip():  # Skip empty lines
                symptoms.append(line.strip().lstrip("*").strip())

        return symptoms

    def extract_follow_up_questions(self, output):
        follow_up_questions = []
        try:
            # Check if 'Step 2: Follow-up Questions:' exists in the output
            if "Step 2: Follow-up questions:" in output:
                print("Step 2 found, parsing follow-up questions.")

                # Extract everything after "Step 2: Follow-up Questions:"
                follow_up_section = output.split("Step 2: Follow-up questions:")[1].strip()

                # Split the section by each question (each question starts with a number, e.g., "1.")
                follow_up_lines = follow_up_section.split("1.")[1:]  # Skip the first part before "1."

                # Loop through each follow-up question and clean it up before adding it to the list
                for idx, question in enumerate(follow_up_lines):
                    cleaned_question = question.strip()

                    if cleaned_question:  # Ensure the question is not empty
                        # Add the number (e.g., "1.") to the question
                        question_number = idx + 1
                        follow_up_questions.append({
                            "question_number": question_number,
                            "question": f"{question_number}. {cleaned_question.strip()}"
                        })

                # Debugging: Print the extracted follow-up questions
                print("Extracted Follow-up Questions:", follow_up_questions)
            else:
                print("Follow-up questions section not found in the output.")
        except IndexError as e:
            print(f"Error parsing follow-up questions: {str(e)}")
            follow_up_questions = []  # Return an empty list in case of error

        return follow_up_questions

    def extract_triage_info(self, response):
        try:
            # Extract ESI Level
            esi_level = self.extract_field(response, "ESI Level:")

            # Extract Expected Wait Time
            wait_time = self.extract_field(response, "Expected Wait Time:")

            # Extract Clinical Justification
            clinical_justification = self.extract_clinical_justification(response)

            return esi_level, wait_time, clinical_justification
        except Exception as e:
            print(f"Error extracting triage info: {str(e)}")
            return "Unknown", "Unknown", "Unknown"

    def extract_field(self, response, field):
        """Extract a specific field from the triage result response."""
        start = response.find(field)
        if start == -1:
            return "Not found"
        start += len(field)
        end = response.find("\n", start)
        return response[start:end].strip()

    def extract_clinical_justification(self, response):
        """Extract the clinical justification from the triage response."""
        try:
            start = response.find("Clinical Justification:")
            if start == -1:
                return "Not found"
            start += len("Clinical Justification:")
            end = response.find("\n", start)
            return response[start:end].strip()
        except Exception as e:
            return "Not found"


def get_patient_details(patient_id):
    patient = patients.find_one({"patient_id": patient_id}, {"_id": 0})

    if not patient:
        raise Exception("Patient not found")

    return {
        "name": patient["name"],
        "age": patient["age"],
        "gender": patient["gender"],
        "history": patient.get("medical_history", "").split(",")  # convert comma-separated string to list
    }

