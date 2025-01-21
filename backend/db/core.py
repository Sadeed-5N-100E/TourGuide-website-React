from sqlalchemy import create_engine, ForeignKey, TIMESTAMP
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Mapped, mapped_column
from dotenv import load_dotenv,find_dotenv
from datetime import datetime
import os
load_dotenv(override=True)
#DATABASE_URL = "postgresql://root:a@localhost/cavalry"
DATABASE_URL = os.getenv("DATABASE_URL")

class Base(DeclarativeBase):
    type_annotation_map = {
        datetime:TIMESTAMP(timezone=True)
    }
    

engine = create_engine(DATABASE_URL, echo=True)
session_local = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

# dependency to get database session
def get_db():
    database = session_local()
    try:
        yield database
    finally:
        database.close()
