from django.db import models


class Patient(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10)
    contact_number = models.CharField(max_length=15)
    address = models.TextField()
    medical_history=models.TextField(blank= True)

    def __str__(self):
        return self.name
