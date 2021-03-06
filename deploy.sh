APP_NAME=fe-sale-manager
DEPLOY_CONNECT=ryu@165.232.171.53

echo "Build"
npm install
npm run build

echo "Docker build ..."
docker build --platform linux/amd64 -t ${APP_NAME} -f ./Dockerfile .

echo "Docker saving..."
docker save -o ${APP_NAME}.tar ${APP_NAME}

echo "Deploying..."
scp -o StrictHostKeyChecking=no ./${APP_NAME}.tar ${DEPLOY_CONNECT}:~
ssh -o StrictHostKeyChecking=no ${DEPLOY_CONNECT} 'bash -s' < ./deploy/stg.sh

echo "Cleaning..."
rm -f ./${APP_NAME}.tar
docker rmi $(docker images -qa -f 'dangling=true')
echo "Done"