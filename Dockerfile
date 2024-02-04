# STAGE: Development
FROM node:18-alpine AS dev

RUN apk --no-cache add curl

# Port to listen on
EXPOSE 3011

# Copy app and install packages
WORKDIR /app
COPY . /app/

RUN npm install

HEALTHCHECK --interval=10s --timeout=5s --retries=3 \
  CMD curl --fail http://localhost:3011/api/health-check || kill 1

# Default app commands
ENTRYPOINT ["sh", "-c", "npm run start:dev"]
