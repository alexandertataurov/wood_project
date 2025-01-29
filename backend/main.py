from fastapi import FastAPI
from app.routers.logs import router as logs_router
from app.routers.reports import router as reports_router
from app.routers.inventory import router as inventory_router
from app.routers.auth import router as auth_router

app = FastAPI()

app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(logs_router, prefix="/logs", tags=["Logs"])
app.include_router(reports_router, prefix="/reports", tags=["Reports"])
app.include_router(inventory_router, prefix="/inventory", tags=["Inventory"])


@app.get("/")
def root():
    return {"message": "Wood Tracking API is running"}