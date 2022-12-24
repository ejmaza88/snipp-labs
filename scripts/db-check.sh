#!/usr/bin/env bash

# Assure Postgres container is running.
# Primarily prevents test suite from failing due to db.
RETRIES=10
echo "Attempting postgres connection"
until PGPASSWORD=snippspass1234 psql -h "db" -d "snipps" -c "select 1" > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
  echo "Waiting for postgres server, $((RETRIES--)) remaining attempts..."
  sleep 2
done

if [ $RETRIES -eq 0 ]; then
  echo "Could not connect to postgres server... exiting."
  exit 1
fi

django-admin runserver 0.0.0.0:8000