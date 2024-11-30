from fastapi import FastAPI
from pydantic import BaseModel
from service.service import predict_points
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

class InputData(BaseModel):
    area: str
    age: int = 30
    is_housed: bool = True


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, or restrict to specific ones
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/api/areas")
def get_areas():
    areas = [
        "Jayanagar", "Rajajinagar", "Koramangala", "Whitefield", 
        "Indiranagar", "Malleshwaram", "Marathahalli", "HSR Layout", 
        "BTM Layout", "Basavanagudi", "Banashankari", "Electronic City", 
        "Yelahanka", "Hebbal", "JP Nagar", "KR Puram"
    ]
    return {"areas": areas}

@app.post("/predict")
def get_prediction(data: InputData):
    predicted_points = predict_points(data.area, data.age, data.is_housed)
    return {"predicted_points": predicted_points}
