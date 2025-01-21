from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr, Field
from typing import List, Annotated
from db.core import get_db
from db.models.models import Review

app = FastAPI(root_path="/api")



class ReviewCreate(BaseModel):
    tourist_id: int
    tour_guide_id: int
    review_text: str
    rating: Annotated[int, Field(ge=1, le=5)]



# Create Review
@app.post("/reviews/", response_model=ReviewCreate)
def create_review(review: ReviewCreate, db: Session = Depends(get_db)):
    db_review = Review(**review.dict())
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review



# Get All Reviews
@app.get("/reviews/", response_model=List[ReviewCreate])
def get_reviews(db: Session = Depends(get_db)):
    return db.query(Review).all()
