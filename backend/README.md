# 5ive Backend

This is the backend server for the 5ive learning platform.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- Redis (running on localhost:6379)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

   ```bash
   npm run setup
   ```

   This will create a `.env` file with default values. Please review and modify as needed.

3. Make sure MongoDB and Redis are running:

   - MongoDB: `mongod` (or start MongoDB service)
   - Redis: `redis-server` (or start Redis service)

4. (Optional) Check if dependencies are running:

   ```bash
   npm run check-deps
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

The following environment variables are required:

- `JWT_SECRET`: Secret key for JWT token signing
- `JWT_EXPIRES_IN`: JWT token expiration time (default: 7d)
- `MONGODB_URI`: MongoDB connection string (default: mongodb://localhost:27017/5ive)
- `REDIS_HOST`: Redis host (default: localhost)
- `REDIS_PORT`: Redis port (default: 6379)
- `PORT`: Server port (default: 5000)

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh-token` - Refresh JWT token

## Troubleshooting

### 400 Bad Request on Registration

- Check that MongoDB is running and accessible
- Check that Redis is running and accessible
- Verify that all required environment variables are set
- Check the server console for detailed error messages

### JWT Errors

- Ensure `JWT_SECRET` is set in your `.env` file
- The secret should be a strong, random string

### Database Connection Issues

- Verify MongoDB is running on the expected port
- Check the connection string in your `.env` file
- Ensure the database name is correct
