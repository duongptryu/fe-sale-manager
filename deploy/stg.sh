APP_NAME=fe-sale-manager

docker load -i ${APP_NAME}.tar
docker rm -f ${APP_NAME}

docker run -d --name fe-sale-manager \
  -p 3000:3000 \
  fe-sale-manager