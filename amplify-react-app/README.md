# Amplify React App

This project is initialized with AWS Amplify Gen 2 and React.

## Project Structure

- `/src` - Source directory containing React components and application code
- `/build` - Distribution directory for built assets
- `amplify/` - AWS Amplify configuration and backend resources

## Dependencies

- React
- AWS Amplify Gen 2
- AWS AppSync
- Amazon DynamoDB

## Setup Instructions

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## AWS Configuration

This project uses AWS Amplify with the following services:
- AppSync for GraphQL API
- DynamoDB for database
- Amplify CLI for infrastructure management

## Environment Setup

The project is configured with:
- Environment: dev
- Framework: React
- Build Command: npm run-script build
- Start Command: npm run-script start
