"""
Routes for report management.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth import get_current_user
from app.models import Log  # Убедимся, что Log определён

router = APIRouter()

@router.get("/reports")
def get_reports(db: Session = Depends(get_db), user=Depends(get_current_user)):
    """Retrieve reports based on logs for the authenticated user."""
    return db.query(Log).filter(Log.user_id == user.id).all()
