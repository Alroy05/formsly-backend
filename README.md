# Feedback System

A full-stack application that allows users to submit feedback and provides an admin interface to view submitted feedback.

## Overview

This project provides a feedback collection system with a secure admin panel. Users can submit feedback through a form, and administrators can view all submitted feedback after authentication.

## Project Structure

```
backend/
├── config/
│   └── db.js               # Database connection
├── controllers/
│   └── feedbackController.js # Controller functions
├── middlewares/
│   └── authMiddleware.js   # Authentication middleware
├── models/
│   └── Feedback.js         # Feedback data model
├── routes/
│   └── feedbackRoutes.js   # API routes
├── node_modules/           # Node.js dependencies
├── .env                    # Environment variables
├── .gitignore              # Git ignore file
├── index.js                # Main application entry point
├── package-lock.json       # Dependency lock file
├── package.json            # Project configuration
└── README.md               # This documentation
```

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: validator.js
- **Environment Variables**: dotenv

## Features

- User feedback submission
- Admin authentication
- Secure access to feedback data
- Input validation
- Error handling
- JWT-based authentication

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/feedback-system.git
   cd feedback-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an `.env` file in the root directory and configure the environment variables (see [Environment Variables](#environment-variables) section).

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/feedback-system
JWT_SECRET=your_jwt_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=strong_password
CLIENT_URL=http://localhost:5173
```

## API Endpoints

| Method | Endpoint             | Description                        | Authentication Required |
|--------|----------------------|------------------------------------|-------------------------|
| POST   | /api/submit-feedback | Submit new feedback                | No                      |
| POST   | /api/admin/login     | Admin login                        | No                      |
| GET    | /api/feedbacks       | Retrieve all feedback submissions  | Yes (Admin)             |
| GET    | /api/check-auth      | Check authentication status        | Yes (Admin)             |

## Authentication

The system uses JWT for authentication:

1. Admin logs in with credentials
2. Server generates JWT token and sets an HTTP-only cookie
3. Protected routes verify the token via middleware
4. Token expires after 1 hour

## Development

To run the project in development mode:

```bash
npm run dev
```

This will start the server with hot-reloading enabled.

## Deployment

### Prerequisites

- Node.js (v14+)
- MongoDB

### Deployment Steps

1. Set up your production environment variables (similar to development but with production values)
2. Build the project (if applicable)
   ```bash
   npm run build
   ```
3. Start the production server
   ```bash
   npm start
   ```

### Deploying to a Cloud Provider

#### Heroku
```bash
heroku create
git push heroku main
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set ADMIN_USERNAME=admin
heroku config:set ADMIN_PASSWORD=secure_password
heroku config:set CLIENT_URL=https://your-frontend-url.com
```

## Security

- JWT tokens for authentication
- HTTP-only cookies for token storage
- Environment variables for sensitive information
- Passwords never stored in plain text
- Input validation to prevent injection attacks
- CORS configuration to control access

