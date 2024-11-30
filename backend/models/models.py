import joblib
from config.config import MODEL_FILENAME, ENCODER_FILENAME

loaded_model = joblib.load(MODEL_FILENAME)
label_encoder = joblib.load(ENCODER_FILENAME)

def get_model_and_encoder():
    return loaded_model, label_encoder
