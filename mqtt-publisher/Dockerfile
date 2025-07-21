FROM python:3.12.0-slim-bookworm

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY mqtt_publisher.py .

CMD [ "python", "-u", "mqtt_publisher.py" ]
