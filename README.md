# Staff Scheduler Project

The Staff Scheduler project is a web application designed to help organizations efficiently manage staff schedules. It allows you to create, update, and delete schedules for individual staff members, providing a comprehensive overview of all scheduled activities.

## Features

- Create and manage staff schedules easily.
- View a complete overview of staff schedules.
- Flexible time slot customization.
- User-friendly interface for effortless scheduling.
- Secure user authentication and data privacy.

## Components

1. `vpc-infra`: This serverless project includes all the neccessary deployment configuration required for EC2 fargate deployment, for example, config for target group for ECS fargate cluster service and associated load balancer in a VPC. It also includes, api gateway deployment configuration to create an internet facing api gateway resource used to access load balancer present in private cloud.

2. `backend`: This is a `npm` project as well as `serverless` project. `serverless.yml` includes configuration for deployment of following resources:
  - ECS fargate cluster
  - Fargate Service
  - Fargate Task
  - Load balancer integration with the fargate service
  - DynamoDb database

  It also has all the API source code managed by `npm`. `Dokerfile` inside the project folder includes all the configuration need for docker image build.

3. `frontend`: A sample UI project which demonstrates the api in use.

## Deployment

To deploy the Staff Scheduler project on an Amazon ECS cluster using AWS Fargate, follow the steps below:

## Prerequisites

Before you begin, make sure you have the following prerequisites in place:

1. An AWS account with the necessary permissions to create and manage ECS resources.
2. Docker installed on your local machine for building and pushing Docker images.
3. AWS CLI installed and configured with the appropriate IAM credentials.

## Step 1: Set Up AWS Resources

1. Create an AWS VPC, and at least one public subnet.
2. Go through `serverless.yml` file inside `./backend` and `./vpc-infra` folders and replace necessary configuaration parameters like, AWS region, deployment stage etc.
3. 


    