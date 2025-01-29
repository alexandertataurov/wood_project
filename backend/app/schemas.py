"""
Pydantic-схемы для валидации данных.
"""

from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    """Базовая схема пользователя."""
    email: EmailStr

class UserCreate(UserBase):
    """Схема для регистрации пользователя."""
    password: str
    is_superuser: bool = False  # По умолчанию создаётся обычный пользователь

class UserResponse(UserBase):
    """Схема для отображения информации о пользователе."""
    id: int
    is_superuser: bool

    class Config:
        orm_mode = True

class Token(BaseModel):
    """Схема ответа при успешной аутентификации."""
    access_token: str
    token_type: str

class TokenData(BaseModel):
    """Схема декодированных данных JWT-токена."""
    email: str | None = None
