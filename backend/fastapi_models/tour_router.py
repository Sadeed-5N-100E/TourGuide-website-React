from fastapi import FastAPI, Depends, HTTPException, APIRouter, Response
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr, conint, Field
from typing import List, Annotated, Union
from db.core import  get_db
from db.models.models import Review, TourGuide, Tourist, MatchRequest
from genai.tag_selector import get_tags
from fastapi_models.create_models import ReviewCreate, TouristCreate, TourGuideCreate
import json
from auth.auth_router import get_current_user
tour_router = APIRouter()

# Create TourGuide
@tour_router.post("/tourguides", response_model=TourGuideCreate)
def create_tour_guide(tour_guide: TourGuideCreate, db: Session = Depends(get_db)):
    db_tour_guide = TourGuide(**tour_guide.dict())
    db.add(db_tour_guide)
    db.commit()
    db.refresh(db_tour_guide)
    return db_tour_guide

# Create Tourist
@tour_router.post("/tourists", response_model=TouristCreate)
def create_tourist(tourist: TouristCreate, db: Session = Depends(get_db)):
    db_tourist = Tourist(**tourist.dict())
    db.add(db_tourist)
    db.commit()
    db.refresh(db_tourist)
    return db_tourist

# Create Review
@tour_router.post("/reviews", response_model=ReviewCreate)
def create_review(review: ReviewCreate, db: Session = Depends(get_db)):
    db_review = Review(**review.dict())
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review

# Get All TourGuides
@tour_router.get("/tourguides",  response_model=List[TourGuideCreate])
def get_tour_guides(user: Annotated[Union[TourGuide, Tourist], Depends(get_current_user)],  response: Response, db: Session = Depends(get_db)):
    print(user)
    return db.query(TourGuide).all()

@tour_router.get("/tourguides/me",  response_model=List[TourGuideCreate])
def get_tour_guides(user: Annotated[Union[TourGuide, Tourist], Depends(get_current_user)],  response: Response, db: Session = Depends(get_db)):
    print(user)
    return user
# Get All Tourists
@tour_router.get("/tourists", response_model=List[TouristCreate])
def get_tourists(db: Session = Depends(get_db)):
    return db.query(Tourist).all()

# Get All Reviews
@tour_router.get("/reviews", response_model=List[ReviewCreate])
def get_reviews(db: Session = Depends(get_db)):
    return db.query(Review).all()

@tour_router.post("/tour_tags")
def return_tags(user_input:str) -> dict:
    return get_tags(user_input)

@tour_router.post("/find_match")
def return_tags_city(user_input:str, db: Session = Depends(get_db)):
    input_data = get_tags(user_input)
    
    # input_data = {"city":"Kelantan", "tags": ["nightlife", "art_tour"]}
    
    guides = []
    for tag in input_data["tags"]:
        guides.extend(db.query(TourGuide).filter(TourGuide.tour_tags.any(tag)).all())
    final_guides  = []
    for guide in guides:
        ada = any([input_data["city"].lower() in city.lower() for city in guide.tour_cities])
        if ada:
            final_guides.append(guide)
    return final_guides

class TourGuideID(BaseModel):
    tourguide_id: int
@tour_router.get("/match_request")
def match_request(user: Annotated[Union[TourGuide, Tourist], Depends(get_current_user)], tourguide_id:int, response: Response, db: Session = Depends(get_db)):
    match_req = MatchRequest(tour_guide_id=tourguide_id, tourist_id=user.id)
    db.add(match_req)
    db.commit()
    return "k"

class MatchRequestResponse(BaseModel):
    match_request_id: int
    answer: bool
@tour_router.post("/respond_match_request")
def match_request(
    user: Annotated[Union[TourGuide, Tourist], Depends(get_current_user)], 
    matchrequestresponse:MatchRequestResponse, response: Response, db: Session = Depends(get_db)):
    matchrequest:MatchRequest = db.query(MatchRequest).filter(MatchRequest.id==matchrequestresponse.match_request_id).scalar()
    match_request.response = matchrequestresponse.answer
    db.commit()
    return "ok"

