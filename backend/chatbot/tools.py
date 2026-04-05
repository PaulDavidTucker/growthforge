# backend/chatbot/tools.py
from langchain.tools import tool
from pydantic import BaseModel, Field, validator
from django.core.mail import send_mail
import asyncio
import re
from .middleware import tool_call_limiter, session_manager, current_session_id


class EmailInput(BaseModel):
    to: str = Field(description="The recipient's email address.")
    subject: str = Field(description="The subject of the email.")
    body: str = Field(description="The body of the email.")

    @validator("to")
    def validate_email(cls, v):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", v):
            raise ValueError("Invalid email address")
        return v


class CalendarInput(BaseModel):
    bookerEmail: str = Field(description="The client's email address.")
    platform: str = Field(description="The platform (e.g., Zoom, Teams).")

    @validator("bookerEmail")
    def validate_email(cls, v):
        if not re.match(r"[^@]+@[^@]+\.[^@]+", v):
            raise ValueError("Invalid email address")
        return v


def _validate_tool_session() -> tuple[bool, str]:
    session_id = current_session_id.get()
    if not session_id:
        return False, "No active session. Please reconnect to the chat."

    session = session_manager.get_session(session_id)
    if not session:
        return False, "Session expired. Please reconnect to the chat."

    if not tool_call_limiter.is_allowed(session["ip"]):
        return False, "Tool usage rate limit exceeded. Please try again later."

    return True, ""


@tool
async def send_email(to: str, subject: str, body: str) -> str:
    """Sends an email to a user. Use when the user requests to send information via email."""
    valid, error_msg = _validate_tool_session()
    if not valid:
        return f"Authorization error: {error_msg}"

    input_data = EmailInput(to=to, subject=subject, body=body)
    try:
        print(f"Preparing to send email to {to} with subject '{subject}'")
        await asyncio.to_thread(
            send_mail,
            subject,
            body,
            "info@repsandrevenue.com",
            [to],
            fail_silently=False,
        )
        print("Email sent successfully!")
        return "Email sent successfully."
    except Exception as e:
        print(f"Email sending failed: {str(e)}")
        return f"Failed to send email: {str(e)}"


@tool
async def book_appointment(bookerEmail: str, platform: str) -> str:
    """Books a calendar appointment via Calendly. Use when the user wants to schedule a meeting."""
    valid, error_msg = _validate_tool_session()
    if not valid:
        return f"Authorization error: {error_msg}"

    input_data = CalendarInput(bookerEmail=bookerEmail, platform=platform)
    try:
        print(f"Mock booking for {bookerEmail} on {platform}")
        return f"Appointment booked for {bookerEmail} on {platform}! (Mock—real integration coming soon)"
    except Exception as e:
        return f"Failed to book appointment: {str(e)}"
