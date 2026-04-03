import requests
import os

class NotificationService:

    @staticmethod
    def send_push(token, title, body):
        requests.post(
            "https://fcm.googleapis.com/fcm/send",
            headers={
                "Authorization": f"key={os.getenv('FIREBASE_SERVER_KEY')}",
                "Content-Type": "application/json"
            },
            json={
                "to": token,
                "notification": {
                    "title": title,
                    "body": body
                }
            }
        )

    @staticmethod
    def send_email(email):
        requests.post(
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {os.getenv('EMAIL_API_KEY')}"
            },
            json={
                "to": email,
                "subject": "Recordatorio de cita",
                "html": "<p>Tienes una cita próxima</p>"
            }
        )