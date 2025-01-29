"""
Routes for log management.
"""

from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from app.database import get_db
from app.auth import get_current_user
from app.models import Log  # Убедимся, что Log определён

router = APIRouter()

@router.get("/logs")
def get_logs(db: Session = Depends(get_db), user=Depends(get_current_user)):
    """Retrieve logs for the authenticated user."""
    return db.query(Log).filter(Log.user_id == user.id).all()
