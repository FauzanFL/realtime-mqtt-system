from sqlalchemy.orm import declarative_base
from sqlalchemy import Column, Integer, String, TIMESTAMP, Float, func, Boolean
from pydantic import BaseModel
from datetime import datetime

Base = declarative_base()

class FactoryMachineData(BaseModel):
    machine_id: str
    timestamp: datetime
    status: str
    production_count: int
    error_code: str
    maintenance_required: bool

class FleetTruckLocationData(BaseModel):
    truck_id: str
    timestamp: datetime
    latitude: float
    longitude: float
    speed_kph: float
    heading_degrees: int

class SmartHomeLivingRoomData(BaseModel):
    device_id: str
    timestamp: datetime
    temperature_celcius: float
    humidity_percent: float
    light_lux: int
    motion_detected: bool

class FactoryMachineData(Base):
    __tablename__ = "factory_line_a_machine_status"

    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    machine_id = Column(String(255))
    timestamp = Column(TIMESTAMP)
    status = Column(String(255))
    production_count = Column(Integer)
    error_code = Column(String(255))
    maintenance_required = Column(Boolean)

class FleetTruckLocationData(Base):
    __tablename__ = "fleet_truck_location"

    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    truck_id = Column(String(255))
    timestamp = Column(TIMESTAMP)
    latitude = Column(Float)
    longitude = Column(Float)
    speed_kph = Column(Float)
    heading_degrees = Column(Integer)

class SmartHomeLivingRoomData(Base):
    __tablename__ = "smart_home_living_room_sensor"

    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    device_id = Column(String(255))
    timestamp = Column(TIMESTAMP)
    temperature_celcius = Column(Float)
    humidity_percent = Column(Float)
    light_lux = Column(Integer)
    motion_detected = Column(Boolean)
