from django.urls import path
from .views import RegisterPatient, GetPatientById, TriageAgentView

urlpatterns = [
    path('register/', RegisterPatient.as_view(), name='register-patient'),

    path('agent/', TriageAgentView.as_view(), name='triage-agent'),
    path('<str:patient_id>/', GetPatientById.as_view(), name='get-patient'),


]