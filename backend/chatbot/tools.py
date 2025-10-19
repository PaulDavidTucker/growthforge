# # backend/chatbot/tools.py
# from langchain.tools import BaseTool
# from django.core.mail import send_mail
# from pydantic import BaseModel, Field


# class EmailInput(BaseModel):
#     to: str = Field(description="The recipient's email address.")
#     subject: str = Field(description="The subject of the email.")
#     body: str = Field(description="The body of the email.")


# class SendEmailTool(BaseTool):
#     name = "send_email"
#     description = "Useful for when you need to send an email to a user."
#     args_schema = EmailInput

#     def _run(self, to: str, subject: str, body: str):
#         try:
#             send_mail(subject, body, "info@repsandrevenue.com", [to])
#             return "Email sent successfully."
#         except Exception as e:
#             return f"Failed to send email: {e}"

#     async def _arun(self, to: str, subject: str, body: str):
#         # Django's send_mail is synchronous, so we run it in a thread
#         from asgiref.sync import sync_to_async

#         return await sync_to_async(self._run)(to, subject, body)
