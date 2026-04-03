import requests
import os

class AppointmentAPIRepository:

    @staticmethod
    def get_appointments():
        url = f"{os.getenv('APPOINTMENT_API_URL')}/appointments"
        response = requests.get(url)
        return response.json()