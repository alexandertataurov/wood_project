import sys
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import User
from app.auth import pwd_context

def create_superuser(email: str, password: str):
    """Создаёт суперпользователя в базе данных."""
    db: Session = SessionLocal()
    existing_user = db.query(User).filter(User.email == email).first()
    if existing_user:
        print("❌ Пользователь уже существует")
        db.close()
        return

    hashed_password = pwd_context.hash(password)
    superuser = User(email=email, hashed_password=hashed_password, is_superuser=True)
    db.add(superuser)
    db.commit()
    db.refresh(superuser)
    db.close()
    print("✅ Суперпользователь создан!")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Использование: python create_superuser.py email пароль")
    else:
        create_superuser(sys.argv[1], sys.argv[2])
