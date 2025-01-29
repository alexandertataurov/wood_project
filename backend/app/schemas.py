"""
Schemas for request and response validation.
"""

from pydantic import BaseModel

class UserBase(BaseModel):
    """Base user schema."""
    email: str

class UserCreate(UserBase):
    """User schema for creation."""
    password: str

class TokenData(BaseModel):
    """Schema for token data validation."""
    sub: str
