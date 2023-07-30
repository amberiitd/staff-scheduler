# Staff Scheduler Project

The Staff Scheduler project is a web application designed to help organizations efficiently manage staff schedules. It allows you to create, update, and delete schedules for individual staff members, providing a comprehensive overview of all scheduled activities.

## Video Demo: 


## Live Demo
- Go to https://staff-scheduler-6e8be.web.app/login 
- Please user following credentials to sign-in as `admin`:

  username: `admin`
  password: `welcome123`

- You can sign-up as `user`, before logging in.

## Open API documentation:

- Go to http://stf-sch-infra-elb-1776549517.ap-south-1.elb.amazonaws.com/api-docs


## Features

- Create and manage staff schedules easily.
- View a complete overview of staff schedules.
- Flexible time slot customization.
- User-friendly interface for effortless scheduling.
- Secure user authentication and data privacy.

## Technologies used:

- Amazon Web Services (AWS)

  1. Cognito Pool: To manage user base, assign user role.
  2. Cognito Identity Provider: To issue IAM credential to access the service.
  3. DynamoDB: As database
  4. Vitual Private Cloud: for publically inaccessible hosting.
  5. ECS Fargate: For dockerized scallable deployment.
  6. EC2 Application Load Balancer: for load distribution
  7. API Gateway: to access the resources in VPC through public internet.
  8. AWS Lambda: to auto confirm cognito user.

- ExpressJs: user for writing NodeJs server.
- Swagger: for Open API documentation.
- ReactJs and Firebase: for Live Demo
- 

## Components

1. `base-infra`: This includes deployment of basic infrastructure, ex: database (DynamoDB) and AWS Cognito Pool and Identity Provider for authentication and authorization and user management.

2. `vpc-infra`: This serverless project includes all the neccessary deployment configuration required for EC2 fargate deployment, for example, config for target group for ECS fargate cluster service and associated load balancer in a VPC. It also includes, api gateway deployment configuration to create an internet facing api gateway resource used to access load balancer present in private cloud.

3. `backend`: This is a `npm` project as well as `serverless` project. `serverless.yml` includes configuration for deployment of following resources:
  - ECS fargate cluster
  - Fargate Service
  - Fargate Task
  - Load balancer integration with the fargate service

  It also has all the API source code managed by `npm`. `Dokerfile` inside the project folder includes all the configuration need for docker image build.

4. `frontend`: A sample UI project which demonstrates the api in use.

## Deployment

To deploy the Staff Scheduler project on an Amazon ECS cluster using AWS Fargate, follow the steps below:

## Prerequisites

Before you begin, make sure you have the following prerequisites in place:

1. An AWS account with the necessary permissions to create and manage ECS resources.
2. Docker installed on your local machine for building and pushing Docker images.
3. AWS CLI installed and configured with the appropriate IAM credentials.

## Local Deployment

1. run bash file `./deploy-local.sh` to deploy locally. Make sure your have successfully created DynamoDB instance, Congnito Pool and Identity Provider.
2. Go to `http://localhost:8080/api-docs` to try out apis.
2. You can run frontend react project to see demo locally.


## Fargate Deployment

1. Create an AWS VPC, and at least one public subnet.
2. Go through `serverless.yml` file inside `./backend` and `./vpc-infra` folders and replace necessary configuaration parameters like, AWS region, deployment stage etc.
3. Replace the vpcId and subnetIds in the `serverless.yml` file in `./vpc-infra`
4. Replace AWS account information in `./deploy-infra.sh`
5. Make sure you have the docker image `staff-scheduler-repo:latest` prepared or build it using `docker buildx build --platform=linux/amd64 -t staff-scheduler-repo:latest .`
6. Execute `./deploy-infra.sh`

Executing `./deploy-infra.sh` will do the following:

1. Create a ECS Fargate cluster
2. Create a task definition
3. Create a Service inside Fargate cluster
4. Create a Load balancer and one Target Group that forwards all request to the created task instance in the Fargate service.
5. Since, minimum required task instances is set to 1, therefore it will start one task intance inside the service.
6. Create a API Gateway and integrate it to the Application Load Balancer.

## NOTE

- Get the API gateway base url from the AWS console or through aws cli. You can use it to invoke the server with appropriate aws IAM credentials. Also you can configure this url in the frontend project.
- 









    