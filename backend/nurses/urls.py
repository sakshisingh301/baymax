from django.urls import path
from .views import RegisterPatient, GetPatientById

urlpatterns = [
    path('register/', RegisterPatient.as_view(), name='register-patient'),
    path('<str:patient_id>/', GetPatientById.as_view(), name='get-patient'),
]