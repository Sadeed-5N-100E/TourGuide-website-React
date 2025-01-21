from fastapi import Response, APIRouter, Depends, HTTPException, status, Form
from fastapi.security import  APIKeyCookie, OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone, tzinfo
from typing import Annotated, Union
import os
from jose import JWTError, jwt
from pydantic import EmailStr, BaseModel
from db.core import get_db
from auth.sec_utils import verify_password, get_password_hash, TokenData, get_user_class
from auth.config import *
from sqlalchemy.orm import Session
from sqlalchemy import select

from db.models.models import TourGuide, Tourist, Review
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/token")
cookie_scheme = APIKeyCookie(name=os.getenv("COOKIE_NAME"))
auth_router = APIRouter(prefix="/auth", tags=["auth"])

credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )  
session_expired_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Session is expired, please login again",
    )  

def create_access_token(data: dict):
    to_encode = data.copy()
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Annotated[Session, Depends(get_db)], response:Response):
    
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        exp_time = datetime.fromtimestamp(payload.get("exp"))
        if datetime.now() > exp_time: # session expired
            response.delete_cookie(COOKIE_NAME)
            raise session_expired_exception
        
        username: str = payload.get("email")
        user_type = payload.get("user_type")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user_class= get_user_class(user_type)
    if not user_class:
        return False
    user = db.execute(select(user_class).where(user_class.email == username)).scalar()
    if not user:
        return credentials_exception
    return user


def authenticate_user(db:Session, username, password, user_type):
    user_class= get_user_class(user_type)
    if not user_class:
        return False
    user = db.execute(select(user_class).where(user_class.email == username)).scalar()
    if not user:
        return False
    print(password, user.password, password == user.password, sep='\n')
    if password != user.password:
        return False
    return user

class Login(BaseModel):
    username: EmailStr
    password : str
    user_type: str

@auth_router.post("/token")
async def login_for_access_token(
    response:Response,
    login:Login,
    db:Annotated[Session, Depends(get_db)]
):
    username = login.username
    password = login.password
    user_type = login.user_type
    user = authenticate_user(db, login.username, password, user_type)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data= {
           "email": user.email,
           "user_type":user_type,
           "exp": datetime.timestamp(datetime.now()+access_token_expires)
           }
    access_token = create_access_token(data=data)

    # response.delete_cookie(COOKIE_NAME)
    
    # response.set_cookie(COOKIE_NAME, access_token, expires=datetime.now(timezone.utc) + access_token_expires,
    #                     httponly=True, samesite='none',secure=False)
    return {"access_token": access_token}



