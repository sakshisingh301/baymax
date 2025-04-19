# nurses/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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