export AWS_ACCOUNT_ID=730746788960
export SERVICE=staff-scheduler
export REGION=ap-south-1
export AWS_PROFILE=nazish

aws ecr create-repository --repository-name $SERVICE-repo --region $REGION --profile $AWS_PROFILE
aws ecr get-login-password --region $REGION --profile $AWS_PROFILE | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com
docker tag $SERVICE-repo:latest $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$SERVICE-repo:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$SERVICE-repo:latest


cd ./base-infra
npm run deploy-infra

cd ../vpc-infra
npm run deploy-infra

cd ../backend
npm run deploy-infra

cd ..

