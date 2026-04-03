from fastapi import FastAPI
from core.scheduler import start_scheduler

app = FastAPI()
'''

@app.on_event("startup")
def startup():
    start_scheduler()
'''