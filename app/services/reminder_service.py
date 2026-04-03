from datetime import datetime, timedelta
from repositories.appointment_api_repo import AppointmentAPIRepository
from services.notification_service import NotificationService

notified_ids = set()

class ReminderService:

    @staticmethod
    def check_and_notify():
        appointments = AppointmentAPIRepository.get_appointments()
        now = datetime.utcnow()

        for appt in appointments:
            appt_date = datetime.fromisoformat(appt["date"])

            # notificar si faltan <= 60 min
            if 0 < (appt_date - now).total_seconds() <= 3600:

                if appt["id"] in notified_ids:
                    continue

                NotificationService.send_push(
                    appt["firebase_token"],
                    "Cita próxima",
                    "Tienes una cita en menos de 1 hora"
                )

                NotificationService.send_email(appt["email"])

                notified_ids.add(appt["id"])