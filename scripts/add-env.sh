#!/bin/bash
# add-env.sh
# Reads .env and generates ARG/ENV for Dockerfile and args: for docker-compose.yml

ENV_FILE=".env"

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: $ENV_FILE not found"
  exit 1
fi

echo "### Dockerfile ARG/ENV lines ###"
while IFS= read -r line; do
  # Skip empty lines and comments
  [[ -z "$line" || "$line" =~ ^# ]] && continue
  VAR_NAME=$(echo "$line" | cut -d '=' -f 1)
  echo "ARG $VAR_NAME"
  echo "ENV $VAR_NAME=\$$VAR_NAME"
done < "$ENV_FILE"

echo ""
echo "### docker-compose.yml args: block ###"
echo "args:"
while IFS= read -r line; do
  # Skip empty lines and comments
  [[ -z "$line" || "$line" =~ ^# ]] && continue
  VAR_NAME=$(echo "$line" | cut -d '=' -f 1)
  echo "  $VAR_NAME: \${$VAR_NAME}"
done < "$ENV_FILE"
