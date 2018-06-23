FROM node as build-env
WORKDIR /usr/src/me.site

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build-env /usr/src/me.site/dist /usr/share/nginx/html

