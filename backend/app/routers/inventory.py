"""
Routes for inventory management.
"""

from fastapi import APIRouter, Depends
from app.auth import get_current_user  # Проверил, что функция есть

router = APIRouter()

@router.get("/inventory")
def get_inventory(user=Depends(get_current_user)):
    """Get inventory for the current user."""
    return {"message": f"Inventory for {user.email}"}
