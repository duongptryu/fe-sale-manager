FROM node:16-alpine AS node_builder

COPY . /app/
WORKDIR /app/
EXPOSE 3000
CMD ["npm", "start"]