FROM node:21-alpine as dependencies

WORKDIR /usr/src/app
COPY package.json .env.dev .env.prod ./
COPY static ./static/

RUN yarn set version stable
RUN touch yarn.lock
RUN yarn install

FROM node:21-alpine as builder
WORKDIR /usr/src/app
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN yarn build

FROM node:21-alpine as runner
WORKDIR /usr/src/app

RUN apk --no-cache add tzdata && \
  cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
  echo "Asia/Seoul" > /etc/timezone

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/static ./static
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/.env.prod ./.env.dev

EXPOSE 8080
CMD ["yarn", "start"]