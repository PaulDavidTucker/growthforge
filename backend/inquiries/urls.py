from django.urls import path
from .views import InquiryCreateView, OnboardingSubmissionCreateView

urlpatterns = [
    path('inquiries/', InquiryCreateView.as_view(), name='inquiry-create'),
    path('onboarding/', OnboardingSubmissionCreateView.as_view(), name='onboarding-create'),
]
