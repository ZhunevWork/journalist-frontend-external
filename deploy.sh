#!/usr/bin/env bash

docker compose --progress=plain build --push
docker --context=loco stack deploy frontend-external -c docker-compose.yml --prune --with-registry-auth