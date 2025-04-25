from djoser import email
from django.conf import settings

class CustomActivationEmail(email.ActivationEmail):
    template_name = "djoser/email/activation.html"

    def get_context_data(self):
        context = super().get_context_data()
        # Fix the path for activation
        context["url"] = f"{settings.FRONTEND_URL}/users/activate/{context['uid']}/{context['token']}"
        print(f"Activation URL: {context['url']}")  # Debugging line
        return context


class CustomPasswordResetEmail(email.PasswordResetEmail):
    template_name = "djoser/email/password_reset.html"

    def get_context_data(self):
        context = super().get_context_data()
        # Update path to match what's in the Djoser settings
        context["url"] = f"{settings.FRONTEND_URL}/password/reset/confirm/{context['uid']}/{context['token']}"
        print(f"Password Reset URL: {context['url']}")  # Debugging line
        return context
