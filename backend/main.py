from fastapi import FastAPI
from app.database import init_db
from app.routers import router, auth


app = FastAPI()

# Создаём таблицы при старте приложения
init_db()
app = FastAPI(swagger_ui_oauth2_redirect_url="/docs/oauth2-redirect")

app.include_router(router)
