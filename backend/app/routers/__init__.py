"""
Module initialization for routers.
"""

from fastapi import APIRouter
from app.routers.logs import router as logs_router
from app.routers.reports import router as reports_router

router = APIRouter()

router.include_router(logs_router, prefix="/logs", tags=["logs"])
router.include_router(reports_router, prefix="/reports", tags=["reports"])
