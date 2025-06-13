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
    
    async def disconnect_all(self):
        print(f"Websocket: Closing {self.active_connections} active connection...")
        connection_to_close = list(self.active_connections)

        await asyncio.gather(*[self._close_websocket_safely(conn) for conn in connection_to_close])

        self.active_connections.clear()
        print("Websocket: All connection closed")

    async def _close_websocket_safely(self, websocket: WebSocket):
        try:
            await websocket.close(code=1000)
            await asyncio.sleep(0.1)
        except RuntimeError as e:
            print(f"Websocket: Runtime error when closing websocket: {e}")
        except Exception as e:
            print(f"Websocket: Unexpected error when closing websocket: {e}")
    
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