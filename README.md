# Microservice Example With Nest.js

## Tech stacks:

- Backend: Order-API, Payment-API written by Nest.js
- Frontend: React
- Deployment: Docker-Compose

## For Development

Run API: `docker-compose up --build`

Run Web: `cd web && yarn && yarn start`

## For Testing API

Testing Payment Api: `cd payment && yarn && yarn test`

Testing Order Api: `cd order && yarn && yarn test`

## For Production

`docker-compose -f docker-compose.prod.yml up --build`
