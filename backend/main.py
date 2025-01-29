from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth

app = FastAPI()

# 🔥 Настраиваем CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешаем все источники (поменяй на домен фронтенда)
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все методы (GET, POST, OPTIONS и т. д.)
    allow_headers=["*"],  # Разрешаем все заголовки
)

# Подключаем маршруты
app.include_router(auth.router)
