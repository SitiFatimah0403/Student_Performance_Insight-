from fastapi import FastAPI
from pydantic import BaseModel
import joblib 
import numpy as np

app= FastAPI()
model = joblib.load("student_model.joblib")

class Input(BaseModel) :
    hours_studied : float
    sleep_hours : float

@app.post("/predict") 
def predict(data: Input) : 
    x= np.array([[data.hours_studied, data.sleep_hours]])
    score = model.predict(x)[0] 
    return {"predicted_exam_score": round(float(score), 2)}

@app.get("/pbi-embed-token")
def get_fake_token(): 
    return {
        "token": "dummy-token",
        "embedUrl": "https://app.powerbi.com/view?r=your_fake_report_id",
        "reportId": "fake-report-id"
    }