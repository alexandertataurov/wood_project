from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Log
from app.schemas import LogCreate
from app.auth import get_current_user

router = APIRouter()

@router.get("/")
def get_inventory(db: Session = Depends(get_db), user=Depends(get_current_user)):
    if not user:
        return {"error": "Unauthorized"}

    inventory = db.query(Log).all()
    return {"inventory": inventory}
