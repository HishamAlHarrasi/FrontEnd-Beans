# from https://tiangolo.medium.com/react-in-docker-with-nginx-built-with-multi-stage-docker-builds-including-testing-8cc49d6ec305

# build stage

FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /app

COPY beans-frontend/package*.json /app/

RUN npm install

COPY beans-frontend /app
COPY frontend.env /app/.env

RUN npm run build


# deploy stage

FROM nginx:1.15

COPY --from=build-stage /app/build/ /usr/share/nginx/html

COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
