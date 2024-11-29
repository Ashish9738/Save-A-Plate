import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from config.config import MODEL_FILENAME, TRAIN_DATA_FILE

loaded_model = joblib.load(MODEL_FILENAME)

train_data = pd.read_csv(TRAIN_DATA_FILE)
label_encoder = LabelEncoder()
label_encoder.fit(train_data['area'])  

def get_model_and_encoder():
    return loaded_model, label_encoder
