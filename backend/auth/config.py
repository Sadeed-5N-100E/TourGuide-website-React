from dotenv import load_dotenv
import os

load_dotenv(override=True)
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
COOKIE_NAME = os.getenv("COOKIE_NAME")
