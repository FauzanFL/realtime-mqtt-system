import paho.mqtt.client as mqtt
import json
import asyncio
import os
from dotenv import load_dotenv

from websocket import websocket_manager

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

MQTT_BROKER = os.getenv("MQTT_BROKER_HOST")
MQTT_PORT = int(os.getenv("MQTT_BROKER_PORT"))

MQTT_TOPICS = [
    "smart_home/living_room/sensor",
    "fleet/truck_101/location",
    "factory/line_A/machine_status"
]

class MQTTSubscriber:
    def __init__(self):
        self.client = mqtt.Client()
        self.client.on_connect = self._on_connect
        self._is_connected = asyncio.Event()
        self.loop = None
    
    def set_event_loop(self, loop):
        self.loop = loop
        self.client.on_message = self._on_message_wrapper

    def _on_connect(self, client, userdata, flags, rc):
        if rc == 0:
            print("Subscriber: Connected to MQTT Broker!")
            for topic in MQTT_TOPICS:
                self.client.subscribe(topic)
                print(f"Subscriber: Topic subscribed ({topic})")
            self._is_connected.set()
        else:
            print(f"Subscriber: Failed to connect, code: {rc}")
            self._is_connected.clear()

    def _on_message_wrapper(self, client, userdata, msg):
        if self.loop and self.loop.is_running():
            asyncio.run_coroutine_threadsafe(self._on_message(client, userdata, msg), self.loop)
        else:
            print("Subscriber: Event loop is not running when message processed")

    async def _on_message(self, client, userdata, msg):
        try:
            data = msg.payload.decode('utf-8')
            await websocket_manager.broadcast(data)
        except Exception as e:
            print(f"Subscriber: Error processing data: {e}")
    
    async def connect_mqtt(self):
        self.set_event_loop(asyncio.get_running_loop())

        while True:
            try:
                print(f"Subscriber: Connecting to MQTT broker...")
                self.client.connect(MQTT_BROKER, MQTT_PORT, 60)
                self.client.loop_start()

                await asyncio.wait_for(self._is_connected.wait(), timeout=10)
                print(f"Subscriber: MQTT broker connected")
                break
            except asyncio.TimeoutError:
                print("Subscriber: Connection timeout")
                self.client.loop_stop()
                self.client.disconnect()
                await asyncio.sleep(5)
            except Exception as e:
                print(f"Subscriber: Error when connecting to MQTT: {e}")
                self.client.loop_stop()
                self.client.disconnect()
                await asyncio.sleep(5)
            
    def disconnect(self):
        if self.client:
            self.client.loop_stop()
            self.client.disconnect()
            print("Subscriber: MQTT broker disconnected")

mqtt_subscriber = MQTTSubscriber()