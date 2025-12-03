# UCU Innovators Hub - Backend

Backend server for the UCU Innovators Hub platform built with Node.js, Express, and MongoDB.

## Features

- RESTful API with Express.js
- MongoDB database with Mongoose ODM
- CRUD operations for projects and users
- Authentication ready (JWT setup included)
- CORS enabled for frontend integration
- Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update with your MongoDB credentials:

```bash
cp .env.example .env
```

Edit `.env` and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string_here
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secure_jwt_secret_here
```

### 3. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /` - API information
- `GET /api/health` - Health status

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `PUT /api/projects/:id/like` - Like a project

## Project Structure

```
server/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   └── projectController.js   # Project business logic
├── models/
│   ├── Project.js         # Project schema
│   └── User.js            # User schema
├── routes/
│   └── projects.js        # Project routes
├── .env                   # Environment variables (not in git)
├── .env.example           # Environment template
├── package.json           # Dependencies
└── server.js              # Main server file
```

## Testing the API

### Using curl:

Get all projects:
```bash
curl http://localhost:5000/api/projects
```

Create a project:
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AI Chatbot",
    "description": "An AI-powered chatbot for student support",
    "category": "Technology",
    "author": {
      "name": "John Doe",
      "email": "john@ucu.ac.ug"
    }
  }'
```

### Using Postman or Thunder Client:

Import the endpoints and test each route.

## MongoDB Schema

### Project Schema
- title (String, required)
- description (String, required)
- category (Enum: Technology, Healthcare, Education, Agriculture, Business, Other)
- status (Enum: draft, submitted, approved, rejected, in-progress, completed)
- author (Object: name, email, role)
- supervisor (Object: name, email)
- tags (Array of Strings)
- likes (Number)
- views (Number)
- createdAt (Date)
- updatedAt (Date)

### User Schema
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- role (Enum: student, supervisor, faculty, admin)
- department (String)
- year (Number)
- projects (Array of Project IDs)
- createdAt (Date)

## Next Steps

1. **Add Authentication Routes**: Implement login/register endpoints
2. **Add Authorization Middleware**: Protect routes based on user roles
3. **Add User Routes**: CRUD operations for users
4. **Add File Upload**: Support for project documents
5. **Add Search & Filtering**: Advanced query capabilities
6. **Add Validation**: Request body validation with express-validator
7. **Add Rate Limiting**: Protect API from abuse

## Troubleshooting

### Connection Issues
- Verify MongoDB connection string in `.env`
- Check if IP address is whitelisted in MongoDB Atlas
- Ensure network connectivity

### Port Already in Use
Change the PORT in `.env` file to a different port (e.g., 5001)

### Module Not Found Errors
Run `npm install` to install all dependencies

## License

ISC
