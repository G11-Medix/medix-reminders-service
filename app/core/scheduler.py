from apscheduler.schedulers.background import BackgroundScheduler
from services.reminder_service import ReminderService

scheduler = BackgroundScheduler()

def start_scheduler():
    scheduler.add_job(
        ReminderService.check_and_notify,
        "interval",
        minutes=5
    )
    scheduler.start()