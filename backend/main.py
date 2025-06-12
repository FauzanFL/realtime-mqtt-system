from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from websocket import websocket_manager
from mqtt_subscriber import mqtt_subscriber

app = FastAPI()

@asynccontextmanager
async def lifespan(app: FastAPI):
    asyncio.create_task(mqtt_subscriber.connect_mqtt())

    yield

    print("FastAPI: Shutting down application")
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
    uvicorn.run(app, host="0.0.0.0", port=3000, reload=True)