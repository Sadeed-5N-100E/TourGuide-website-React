from passlib.context import CryptContext
from pydantic import BaseModel
from typing import Union
from db.models.models import TourGuide, Tourist
pwd_context = CryptContext(schemes=["bcrypt"])

class TokenData(BaseModel):
    username: Union[str, None] = None
    user_type: str


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)

def get_user_class(user_type):
    return Tourist if user_type == "tourist" else TourGuide