from pydantic import BaseModel
from datetime import datetime

class UserCreate(BaseModel):
    username: str
    password: str

class LogCreate(BaseModel):
    action: str
    timestamp: datetime
