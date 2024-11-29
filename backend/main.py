from fastapi import FastAPI
from pydantic import BaseModel
from service.service import predict_points

app = FastAPI()

class InputData(BaseModel):
    area: str
    age: int = 30
    is_housed: bool = True

@app.post("/predict")
def get_prediction(data: InputData):
    predicted_points = predict_points(data.area, data.age, data.is_housed)
    return {"predicted_points": predicted_points}
