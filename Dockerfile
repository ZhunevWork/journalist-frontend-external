ARG APP_BUILD_VERSION
ARG IMAGE_CONFIGURATION
ARG NODE_VERSION
ARG NGINX_VERSION


FROM node:${NODE_VERSION} AS node-builder
WORKDIR /src/

RUN npm install --location=global npm@8.19.4

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG NPM_CONFIGURATION
RUN npm run build


FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS nginx
ARG IMAGE_CONFIGURATION

USER nginx
COPY --chown=101:101 proxy.conf /etc/nginx/
COPY --chown=101:101 nginx.conf /etc/nginx/
COPY --chown=101:101 --from=node-builder /src/build/client/ /tmp/wwwroot/dist