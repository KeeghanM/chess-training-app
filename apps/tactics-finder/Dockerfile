FROM python:3.10-slim

WORKDIR /app

# Install system packages and Stockfish
RUN apt-get update && apt-get install -y \
    stockfish \
    pgn-extract \
 && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "worker.py"]
