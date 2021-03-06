FROM node:14 as builder

RUN mkdir -p /tmp/frontend
ADD package*.json /tmp/frontend/
ADD public /tmp/frontend/public
ADD src /tmp/frontend/src
RUN cd /tmp/frontend && \
    npm ci && \
    npm run build


FROM node:14-alpine

RUN addgroup -S nodejs && adduser -S nodejs -G nodejs && \
    mkdir /app && \
    mkdir -p /tmp/backend
ADD package*.json /tmp/backend/
RUN cd /tmp/backend && \
    npm ci --production && \
    chown -R nodejs.nodejs /app /tmp/backend

USER nodejs
WORKDIR /app

RUN cp -a /tmp/backend/node_modules /app/
ADD package.json /app/package.json
ADD server /app/server
COPY --from=builder /tmp/frontend/build /app/build

EXPOSE 8080
ENV NODE_ENV production

CMD npm start
