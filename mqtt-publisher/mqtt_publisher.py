import paho.mqtt.client as mqtt
import time
from datetime import datetime
import json
import random
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

MQTT_BROKER = os.getenv("MQTT_BROKER_HOST")
MQTT_PORT = int(os.getenv("MQTT_BROKER_PORT"))

TOPICS_AND_DATA = [
    {
        "topic": "smart_home/living_room/sensor",
        "generate_data": lambda: {
            "device_id": "LIVING_ROOM_SENSOR_001",
            "timestamp": datetime.fromtimestamp(int(time.time())).strftime("%Y-%m-%d %H:%M:%S"),
            "temperature_celsius": round(random.uniform(22.0, 32.0), 2),
            "humidity_percent": round(random.uniform(50.0, 80.0), 2),
            "light_lux": random.randint(100, 1000),
            "motion_detected": random.choice([True, False])
        }
    },
    {
        "topic": "fleet/truck_101/location",
        "generate_data": lambda: {
            "truck_id": "TRUCK_101",
            "timestamp": datetime.fromtimestamp(int(time.time())).strftime("%Y-%m-%d %H:%M:%S"),
            "latitude": round(random.uniform(-7.81, -7.74), 6),  # Wilayah Yogyakarta
            "longitude": round(random.uniform(110.3, 110.45), 6), # Wilayah Yogyakarta
            "speed_kph": round(random.uniform(0.0, 90.0), 1),
            "heading_degrees": random.randint(0, 359)
        }
    },
    {
        "topic": "factory/line_A/machine_status",
        "generate_data": lambda: {
            "machine_id": "MACHINE_XA_789",
            "timestamp": datetime.fromtimestamp(int(time.time())).strftime("%Y-%m-%d %H:%M:%S"),
            "status": random.choice(["RUNNING", "IDLE", "ERROR", "OFFLINE"]),
            "production_count": random.randint(1000, 20000),
            "error_code": random.choice([None, "E-001", "W-002", "CRIT-003"]),
            "maintenance_required": random.choice([True, False])
        }
    }
]

connected_flag = False

def on_connect(client, userdata, flags, rc):
    global connected_flag
    if rc == 0:
        print("Publisher: Connected to MQTT Broker!")
        connected_flag = True
    else:
        print(f"Publisher: Failed to connect, code: {rc}")
        connected_flag = False

def publish_data_to_multiple_topics():
    client = mqtt.Client()
    client.on_connect = on_connect

    try:
        client.connect(MQTT_BROKER, MQTT_PORT, 60)
        client.loop_start()

        print("Trying to connect...")
        time.sleep(1)
        timeout = 10
        start_time = time.time()
        while not connected_flag and (time.time() - start_time < timeout):
            print("Publisher: Waiting connection...")
            time.sleep(1)

        if not connected_flag:
            print("Publisher Failed to connect")
            return

        while True:

            for current_topic in TOPICS_AND_DATA:
                topic = current_topic["topic"]
                generate_data_func = current_topic["generate_data"]

                data = generate_data_func()
                payload = json.dumps(data)

                client.publish(topic, payload)
                print(f"Publisher: Data published to topic: '{topic}'")

            time.sleep(3)
    except KeyboardInterrupt:
        print("Publisher: Stopped by keyboard interrupt.")
    except Exception as e:
        print(f"Publisher: Error: {e}")
    finally:
        client.loop_stop()
        client.disconnect()
        print("Publisher: Connection disconnected.")

if __name__ == "__main__":
    publish_data_to_multiple_topics()