from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Log
from app.schemas import LogCreate
from app.auth import oauth2_scheme
from jose import jwt, JWTError
from app.auth import SECRET_KEY, ALGORITHM

router = APIRouter()

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")
    except JWTError:
        return None

@router.get("/", response_model=list[LogCreate])
def get_logs(db: Session = Depends(get_db), user=Depends(get_current_user)):
    if not user:
        return {"error": "Unauthorized"}
    
    return db.query(Log).all()
