"""
Модуль работы с базой данных.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# URL подключения к базе данных (SQLite для локальной разработки)
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

# Создаём движок базы данных
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# Создаём фабрику сессий
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Базовый класс для моделей
Base = declarative_base()

def get_db():
    """
    Dependency для получения сессии базы данных.
    Используется в зависимостях FastAPI.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """
    Инициализация базы данных. Создаёт все таблицы при запуске приложения.
    """
    from app.models import Base  # Импортируем здесь, чтобы избежать циклического импорта
    Base.metadata.create_all(bind=engine)
