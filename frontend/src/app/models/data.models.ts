export interface SmartHomeLivingRoomSensorData {
  device_id: string;
  timestamp: string;
  temperature_celcius: number;
  humidity_percent: number;
  light_lux: number;
  motion_detected: boolean;
}

export interface FleetTruckLocationData {
  truck_id: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  speed_kmh: number;
  fuel_percent: number;
}

export interface FactoryLineAMachineStatusData {
  machine_id: string;
  timestamp: string;
  status: string;
  pressure_psi: number;
  temperature_c: number;
  error_code: string | null;
  production_count: number;
  maintenance_required: boolean;
}

export type RealtimeDataPayload = SmartHomeLivingRoomSensorData | FleetTruckLocationData | FactoryLineAMachineStatusData

export interface RealtimeMessage {
    [tppic: string]: RealtimeDataPayload
}
