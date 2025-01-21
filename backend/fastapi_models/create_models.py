from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Annotated, Optional
from datetime import datetime


# Pydantic Schemas
class TourGuideCreate(BaseModel):
    id:Optional[int] = None
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    bio: str
    whatsapp: bool = False
    telegram: bool = False
    phone_number: str
    country: str
    tour_cities: List[str]
    id_passport: str
    has_vehicle: bool = False
    vehicle_info: str
    tour_tags: List[str]
    languages_spoken: List[str]

class TouristCreate(BaseModel):
    id: Optional[int] =None
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    bio: str
    phone_number: str
    country: str
    tour_cities: List[str]
    tour_tags: List[str]
    languages_spoken: List[str]

class ReviewCreate(BaseModel):
    tourist_id: Optional[int] =None
    tour_guide_id: int
    review_text: str
    rating: Annotated[int, Field(ge=1, le=5)]

class MatchRequestResponse(BaseModel):
    id: Optional[int] = None
    date_requested: datetime
    tourist_id: int
    tour_guide_id: int
    date_of_response: Optional[datetime]
    response: Optional[bool]
    model_config = ConfigDict(populate_by_name=True)