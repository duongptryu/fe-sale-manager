FROM node:16-alpine AS node_builder

COPY . /app/
WORKDIR /app/
RUN npm install
RUN npm run build
LABEL name="web-sale-manager" version="1.0"
EXPOSE 3000
CMD ["npm", "start"]