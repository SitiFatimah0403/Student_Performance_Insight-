from fastapi import FastAPI
from pydantic import BaseModel
import joblib 
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
model = joblib.load("student_model.joblib")

class Input(BaseModel):
    hours_studied: float
    sleep_hours: float

@app.post("/predict") 
def predict(data: Input):
    x = np.array([[data.hours_studied, data.sleep_hours]])
    pred = model.predict(x)[0]          # use 'pred' directly
    pred = np.clip(pred, 0, 100)        # cap between 0 and 100
    return {"predicted_exam_score": round(pred, 2)}

@app.get("/pbi-embed-token")
def get_pbi_embed_info(): 
    return {
        "embedUrl": "https://app.powerbi.com/reportEmbed?reportId=57d37989-5615-4ee4-b224-d12770e334b3&autoAuth=true&ctid=1f551aeb-7ea1-472c-9ac0-09de9bf33051&actionBarEnabled=true",
        "reportId": "57d37989-5615-4ee4-b224-d12770e334b3",
        "token": None  # None for public demo
    }


origins = [
    "http://localhost:5173",  # frontend dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
