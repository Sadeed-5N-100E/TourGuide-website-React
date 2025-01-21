from sqlalchemy import Column, String, Boolean, Integer, Text, ForeignKey, Table, DateTime
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, Mapped
from datetime import datetime
from db.core import Base, engine


class TourGuide(Base):
    __tablename__ = 'tour_guides'

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    bio = Column(Text)
    whatsapp = Column(Boolean, default=False)
    telegram = Column(Boolean, default=False)
    phone_number = Column(String, nullable=True)
    country = Column(String, nullable=False)
    tour_cities = Column(ARRAY(String), nullable=True)
    id_passport = Column(String, nullable=False)
    has_vehicle = Column(Boolean, default=False)
    vehicle_info = Column(Text, nullable=True)
    tour_tags = Column(ARRAY(String), nullable=True)
    languages_spoken = Column(ARRAY(String), nullable=True)
    reviews = relationship("Review", back_populates="tour_guide")
    match_requests = relationship("MatchRequest", back_populates="tour_guide")

class Tourist(Base):
    __tablename__ = 'tourists'

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    bio = Column(Text)
    phone_number = Column(String, nullable=True)
    country = Column(String, nullable=False)
    tour_cities = Column(ARRAY(String), nullable=True)
    tour_tags = Column(ARRAY(String), nullable=True)
    languages_spoken = Column(ARRAY(String), nullable=True)
    reviews = relationship("Review", back_populates="tourist")
    match_requests = relationship("MatchRequest", back_populates="tourist")

class Review(Base):
    __tablename__ = 'reviews'

    id = Column(Integer, primary_key=True, index=True)
    tourist_id = Column(Integer, ForeignKey('tourists.id'), nullable=False)
    tour_guide_id = Column(Integer, ForeignKey('tour_guides.id'), nullable=False)
    review_text = Column(Text, nullable=False)
    rating = Column(Integer, nullable=False)
    tourist = relationship("Tourist", back_populates="reviews")
    tour_guide = relationship("TourGuide", back_populates="reviews")
    date_written:Mapped[datetime]

class MatchRequest(Base):
    __tablename__ = 'match_requests'

    id = Column(Integer, primary_key=True, index=True)
    date_requested = Column(DateTime, default=datetime.utcnow)
    tourist_id = Column(Integer, ForeignKey('tourists.id'), nullable=False)
    tour_guide_id = Column(Integer, ForeignKey('tour_guides.id'), nullable=False)
    date_of_response = Column(DateTime, nullable=True)
    response = Column(Boolean, nullable=True)
    tourist = relationship("Tourist", back_populates="match_requests")
    tour_guide = relationship("TourGuide", back_populates="match_requests")


Base.metadata.create_all(bind = engine)
