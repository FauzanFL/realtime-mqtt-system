from dotenv import load_dotenv
import os

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

MQTT_BROKER = os.getenv("MQTT_BROKER_HOST")
MQTT_PORT = int(os.getenv("MQTT_BROKER_PORT"))
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
SAVE_TO_DB = os.getenv("SAVE_TO_DB").lower() == "true"
