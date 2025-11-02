#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

REDIS_PORT=6379

check_dependencies() {
  for cmd in docker redis-server redis-cli; do
    if ! command -v "$cmd" >/dev/null; then
      echo "❌ Command not found: $cmd"
      exit 1
    fi
  done
}

start_redis() {
  if ! redis-cli -p "$REDIS_PORT" PING >/dev/null 2>&1; then
    echo "🚀 Starting Redis server."
    redis-server --port "$REDIS_PORT" --daemonize yes
    echo "⏰ Waiting for Redis server to initialize..."
    until redis-cli -p "$REDIS_PORT" PING | grep -q PONG; do
      sleep 1
    done
    echo "✅ Redis started."
  else
    echo "✅ Redis is already running."
  fi
}

cleanup() {
  echo "🛑 Stopping Redis server..."
  redis-cli -p "$REDIS_PORT" SHUTDOWN || true
}

trap cleanup EXIT

main() {
  check_dependencies
  start_redis

  docker build -t chess-tactic-finder .

  docker run --rm -it \
    --env-file .env \
    -e REDIS_HOST="host.docker.internal" \
    -v "$(pwd):/app" \
    chess-tactic-finder \
    sh -c "pip install -r requirements.txt && watchmedo auto-restart --directory=. --pattern='*.py' --recursive -- python worker.py"
}

main "$@"
