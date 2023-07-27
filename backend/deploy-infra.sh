export AWS_ACCOUNT_ID=343547439778
export SERVICE=staff-scheduler
export REGION=ap-south-1

# aws ecr create-repository --repository-name $SERVICE-repo --region $REGION --profile $AWS_PROFILE
# aws ecr get-login-password --region $REGION --profile $AWS_PROFILE | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com
# docker tag ${self:service}-repo:latest ${AWS::AccountId}.dkr.ecr.${self:provider.region}.amazonaws.com/${self:service}-repo:latest
# docker push $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$SERVICE-repo:latest

npm run deploy-infra