"""
Database models for application.
"""

from datetime import datetime  # Стандартные импорты должны быть первыми
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    """User model representing application users."""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    def __repr__(self):
        return f"<User {self.email}>"

    def to_dict(self):
        """Convert User object to dictionary."""
        return {"id": self.id, "email": self.email}

class Log(Base):
    """Log model representing system logs."""
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    action = Column(String, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="logs")

    def __repr__(self):
        return f"<Log {self.action} at {self.timestamp}>"

    def to_dict(self):
        """Convert Log object to dictionary."""
        return {
            "id": self.id,
            "user_id": self.user_id,
            "action": self.action,
            "timestamp": self.timestamp
        }

User.logs = relationship("Log", back_populates="user")
