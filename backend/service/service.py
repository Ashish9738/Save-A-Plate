import pandas as pd
from models.models import get_model_and_encoder

def predict_points(area_input, age_value=30, is_housed_value=1):  
    model, label_encoder = get_model_and_encoder()
    
    area_encoded = label_encoder.transform([area_input])[0]
    
    features = {
        "area_encoded": area_encoded,
        "age": age_value,
        "is_housed": is_housed_value
    }

    feature_names = model.feature_names_in_  
    input_data = pd.DataFrame([features], columns=feature_names)  

    predicted_points = model.predict(input_data)
    return int(predicted_points[0])
