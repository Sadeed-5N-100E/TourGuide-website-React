from fastapi import FastAPI
from fastapi_models.tour_router import tour_router
from auth.auth_router import auth_router
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI(root_path="/api")


app.include_router(auth_router)
app.include_router(tour_router)

origins=["http://localhost:3000",
         "localhost:3000",
         "http://0.0.0.0:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET","POST","PUT", "DELETE"],
    allow_headers=["*"],
    expose_headers=["Set-Cookie","*"], 
)
@app.get("/")
def service_check():
    return "service is running"
