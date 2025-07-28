# Realtime Monitoring System
#### Description
The web base application to monitor status or other information from external device. The information from the device is store into broker using another system (using dummy system for this project). The data flow looks like this: <br>
```
external device -> data processing system -> broker -> backend -> (optional: store to database) -> frontend
```
#### Tech Stack
- MQTT Broker
- Python
- AngularJS
- FastAPI
- PostgreSQL
- Docker & Docker Compose

#### Usage
To run this project you can use traditional or containerized (docker) way:
- [Using Tradtional Way](#using-traditional-way)
- [Using Docker](#using-docker)

##### **Note**: 
1. This project is using dummy data and send it to broker
2. Not for production

## Using Traditional Way

### Prerequisites
- Python
- NodeJS (npm)
- Broker Service
- Database Service

### Step 1: Create and Activate Virtual Environment for python
1. Create venv
    ```cmd
    python -m venv myvenv
    ```
2. Activate venv
    - on Windows
    ```cmd
    myvenv\Scripts\activate
    ```
    - on macOS and linux
    ```cmd
    source myvenv/bin/activate
    ```
3. Deactivate venv (optional)
    ```cmd
    deactivate
    ```

### Step 2: Run MQTT Publisher
1. Make sure broker service is on
2. Make sure venv is active 
3. Create `.env` file, copy paste from `.env.example`, adjust the value with your  broker service
4. Change directory to mqtt-publisher
    ```cmd
    cd mqtt-publisher
    ```
5. Install library from requirements.txt 
    ```cmd
    pip install -r requirements.txt
    ```
6. Run mqtt publisher service
    ```cmd
    python mqtt_publisher.py
    ```
### Step 3: Run Backend
1. Make sure broker service and database service is on
2. Make sure venv is active 
3. Create `.env` file, copy paste from `.env.example`, adjust the value with your  broker service and database service
4. Change directory to backend
    - if you in project root
    ```cmd
    cd backend
    ```
    - if still in mqtt-publisher
    ```cmd
    cd ../backend
    ```
5. Install library from requirements.txt 
    ```cmd
    pip install -r requirements.txt
    ```
6. Run backend service
    ```cmd
    uvicorn main:app
    ```
### Step 4: Run Frontend
1. Change directory to frontend
    - if you in project root
    ```cmd
    cd frontend
    ```
    - if still in backend
    ```cmd
    cd ../frontend
    ```
2. Check environment to matches backend service. It located in `src\environments\environment.development.ts`
2. Install npm package
    ```cmd
    npm install
    ```
3. Run frontend service
    ```cmd
    npm run start
    ```
4. Go to browser
    ```
    http://localhost:4100/
    ```
## Using Docker
### Prerequisites
- Docker & Docker Compose

### Step 1: Configure environment
1. Create `.env` file in root directory
2. Copy paste from `.env.example`
3. Adjust `.env` value with your services configuration
### Step 2: Build image and run container
1. Make sure you are in root
2. Build and run using docker compose
    ```cmd
    docker compose up --build -d
    ```
    this command should run container in background
3. After a few minutes, image was successfully created and container was successfully run.
4. Go to browser
    ```
    http://localhost:4100/
    ```