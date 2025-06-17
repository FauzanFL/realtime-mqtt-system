from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio
import uvicorn
import json
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from websocket import websocket_manager
from mqtt_subscriber import mqtt_subscriber
from database import db_manager

app = FastAPI()

async def send_data(interval: int = 2):
    while True:
        try:
            combined_data = await mqtt_subscriber.get_combined_data()
            if combined_data:
                json_to_send = json.dumps(combined_data)
                await websocket_manager.broadcast(json_to_send)
            await asyncio.sleep(interval)
        except asyncio.CancelledError:
            print("Send data task cancelled")
            break
        except Exception as e:
            print(f"Error in send_data: {e}")
            await asyncio.sleep(5)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await db_manager.init_db()
    db_manager.set_mqtt_subscriber(mqtt_subscriber)
    # Set condition if want to save data to db or no (default true)
    # db_manager.set_storage_enabled(False)
    # Set interval for storing data to db (default 10 in second)
    # db_manager.set_storage_interval(5)

    asyncio.create_task(mqtt_subscriber.connect_mqtt())

    periodic_sender_task = asyncio.create_task(send_data(interval=3))

    periodic_store_data_to_db = asyncio.create_task(db_manager.save_data())

    try:
        yield
    finally:
        print("FastAPI: Shutting down application")

        periodic_sender_task.cancel()
        periodic_store_data_to_db.cancel()

        await periodic_sender_task
        await periodic_store_data_to_db

        await websocket_manager.disconnect_all()
        mqtt_subscriber.disconnect()

app = FastAPI(
    lifespan=lifespan,
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.websocket("/ws/data")
async def ws_endpoint(websocket: WebSocket):
    await websocket_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        websocket_manager.disconnect()
    except Exception as e:
        print(f"FastAPI: Error in websocket: {e}")
        websocket_manager.disconnect()

@app.get("/")
async def root():
    return {"message": "System is running"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)