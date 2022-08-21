#!/bin/sh

docker build -t oiltransporterparty_db .
docker run --rm --name oiltransporterparty -e POSTGRES_DB=main_dev -e POSTGRES_PASSWORD=password -d -p 5932:5432 oiltransporterparty_db
#! exposingP Port: Internal Port (The exposing must match the dockerfile)