# nurses/serializer.py
from rest_framework import serializers
import random




class PatientSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    age = serializers.IntegerField(min_value=0)
    gender = serializers.CharField(max_length=10, required=False, allow_blank=True)
    height = serializers.CharField(max_length=15)
    weight = serializers.CharField(max_length=20)
    # address = serializers.CharField(max_length=255)
    medical_history = serializers.CharField(required=False, allow_blank=True)


    def create(self, validated_data):
        from nurses.connection import patients

        # Generate a custom patient ID (e.g., "john_482")
        base_name = validated_data["name"].lower().replace(" ", "")
        unique_suffix = random.randint(100, 999)
        patient_id = f"{base_name}_{unique_suffix}"

        validated_data["patient_id"] = patient_id

        # Insert into MongoDB
        result = patients.insert_one(validated_data)

        return {**validated_data, "_id": str(result.inserted_id)}