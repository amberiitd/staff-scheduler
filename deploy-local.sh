export AWS_ACCOUNT_ID=730746788960
export SERVICE=staff-scheduler
export REGION=ap-south-1
export AWS_PROFILE=nazish

cd ./base-infra
npm run deploy-infra

echo "Open AI docs: http://localhost:8080/api-docs"

cd ../backend
npm run dev

cd ..

