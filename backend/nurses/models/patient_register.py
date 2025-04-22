from django.db import models


class Patient(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=10, blank=True, null=True)
    height = models.CharField(max_length=15)
    weight = models.TextField()
    medical_history=models.TextField(blank= True)


    def __str__(self):
        return self.name
