from dotenv import load_dotenv
import os
import asyncio
from datetime import datetime

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from models import SmartHomeLivingRoomData, FleetTruckLocationData, FactoryMachineData, Base

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

DB_URL = f"postgresql+asyncpg://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_async_engine(DB_URL, echo=False)

AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

class DatabaseManager:
    def __init__(self):
        self._is_ready = asyncio.Event()
        self.storage_enabled = False
        self.storage_interval = 10
        self.mqtt_subscriber = None

        self.topic_models = {
            "smart_home/living_room/sensor": SmartHomeLivingRoomData,
            "fleet/truck_101/location": FleetTruckLocationData,
            "factory/line_A/machine_status": FactoryMachineData
        }

    async def init_db(self):
        try:
            print("Database: Trying to create/verif database table...")
            async with engine.begin() as conn:
                await conn.run_sync(Base.metadata.create_all)
            print("Database: All table verified")
        except Exception as e: 
            print(f"Database: Failed to create tables: {e}")
        finally:
            self._is_ready.set()
    
    def _parse_datetime(self, datetime_str):
        try:
            return datetime.strptime(datetime_str, "%Y-%m-%d %H:%M:%S")
        except Exception as e:
            print(f"Database: Error parse datetime: {datetime_str} -> {e}")
            return None

    async def get_db(self):
        await self._is_ready.wait()
        async with AsyncSessionLocal() as session:
            yield session

    def set_storage_enabled(self, enable: bool):
        self.storage_enabled = enable
    
    def set_mqtt_subscriber(self, subscriber):
        self.mqtt_subscriber = subscriber

    def set_storage_interval(self, interval: int):
        if interval > 0:
            self.storage_interval = interval
        else:
            print("Database: Interval must greater than 0")
    
    async def save_data(self):
        await self._is_ready.wait()
        while True:
            try:
                if self.storage_enabled and self.mqtt_subscriber:
                    combined_data = await self.mqtt_subscriber.get_combined_data()
                    if combined_data:
                        async for session in self.get_db():
                            for topic, payload in combined_data.items():
                                TopicModel = self.topic_models.get(topic)
                                
                                if not TopicModel:
                                    print(f"Database: No model defined for topic: {topic}")
                                    continue

                                try:
                                    if TopicModel == SmartHomeLivingRoomData:
                                        new_entry = SmartHomeLivingRoomData(
                                            device_id = payload["device_id"],
                                            timestamp = self._parse_datetime(payload["timestamp"]),
                                            temperature_celsius = payload["temperature_celsius"],
                                            humidity_percent = payload["humidity_percent"],
                                            light_lux = payload["light_lux"],
                                            motion_detected = payload["motion_detected"]
                                        )
                                    elif TopicModel == FleetTruckLocationData:
                                        new_entry = FleetTruckLocationData(
                                            truck_id = payload["truck_id"],
                                            timestamp = self._parse_datetime(payload["timestamp"]),
                                            latitude = payload["latitude"],
                                            longitude = payload["longitude"],
                                            speed_kph = payload["speed_kph"],
                                            heading_degrees = payload["heading_degrees"]
                                        )
                                    elif TopicModel == FactoryMachineData:
                                        new_entry = FactoryMachineData(
                                            machine_id = payload["machine_id"],
                                            timestamp = self._parse_datetime(payload["timestamp"]),
                                            status = payload["status"],
                                            production_count = payload["production_count"],
                                            error_code = payload["error_code"],
                                            maintenance_required = payload["maintenance_required"]
                                        )
                                    else:
                                        continue

                                    session.add(new_entry)
                                except KeyError as ke:
                                    print(f"Database: Error key missing in payload for topic '{topic}': {ke}")
                                except ValueError as ve:
                                    print(f"Database: Error converting value in paylaod for topic '{topic}': {ve}")
                                except Exception as e:
                                    print(f"Database: Error when processing data for topic '{topic}': {e}")
                                    
                            await session.commit()
                            print("Database: Data sent to db server")

                await asyncio.sleep(self.storage_interval)
            except asyncio.CancelledError:
                print("Database: Storing task cancelled")
                break
            except Exception as e:
                print(f"Database: Error in storing data: {e}")
                await asyncio.sleep(5)

db_manager = DatabaseManager()