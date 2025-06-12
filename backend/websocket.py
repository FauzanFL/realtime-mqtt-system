from fastapi import WebSocket, WebSocketDisconnect
import asyncio

class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f"Websocket: Client connected: {websocket.client}")

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            print(f"Websocket: Client disconnected: {websocket.client}")
    
    async def broadcast(self, message: str):
        disconnected_clients = []
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except WebSocketDisconnect:
                print(f"Websocket: Client {connection.client} disconnected when broadcast")
                disconnected_clients.append(connection)
            except Exception as e:
                print(f"Websocket: Client {connection.client} error: {e}")
                disconnected_clients.append(connection)

        for client in disconnected_clients:
            self.active_connections.remove(client)

websocket_manager = ConnectionManager()