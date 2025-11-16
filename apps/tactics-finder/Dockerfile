FROM python:3.10-slim

WORKDIR /app

ENV PATH="/usr/games:${PATH}" \
    PYTHONUNBUFFERED=1

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    stockfish \
    pgn-extract \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Healthcheck (optional - checks if worker is running)
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD pgrep -f worker.py || exit 1

# Run the worker
CMD ["python", "-u", "worker.py"]