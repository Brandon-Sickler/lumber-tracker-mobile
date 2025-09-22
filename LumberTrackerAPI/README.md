# EnVtory API - Node.js Backend

The backend API component of the EnVtory lumber processing management system. Built with Node.js and Express, this API provides data management, business logic, and integration capabilities for the mobile and web applications.

> **Note**: This is part of the larger EnVtory system. See the main [README.md](../README.md) for the complete project overview.

## 🔧 Overview

The EnVtory API serves as the central data management system, providing:

- **RESTful API endpoints** for all lumber processing operations
- **Database management** with MongoDB and Mongoose
- **Authentication and authorization** for secure access
- **Data validation and business logic** enforcement
- **Integration capabilities** for external systems

## ✨ Features

### 📊 **Data Management**
- Lumber package CRUD operations
- Inventory tracking and management
- Status updates and transitions
- Historical data and audit trails

### 🔐 **Security**
- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- CORS configuration for cross-origin requests

### 🚀 **Performance**
- Optimized database queries
- Response caching strategies
- Error handling and logging
- Health check endpoints

### 🔗 **Integration**
- RESTful API design
- WebSocket support for real-time updates
- External system integration capabilities
- API documentation with Swagger

## 🛠️ Technology Stack

### **Core Technologies**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### **Security & Validation**
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers

### **Development Tools**
- **nodemon** - Development server with auto-restart
- **dotenv** - Environment variable management
- **cors** - Cross-origin resource sharing
- **morgan** - HTTP request logging

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. **Navigate to the API directory**
   ```bash
   cd LumberTrackerAPI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string and other settings
   ```

4. **Start the development server**
   ```bash
   npm start
   # or for development with auto-restart:
   npm run dev
   ```

5. **Verify the server is running**
   - Navigate to `http://localhost:5000`
   - You should see "Lumber Tracker API is running"

## 📁 Project Structure

```
LumberTrackerAPI/
├── controllers/           # Route controllers
│   └── lumberPackages.js # Lumber package operations
├── models/               # Database models
│   └── lumberPackage.js  # Lumber package schema
├── routes/               # API routes
│   └── lumberPackages.js # Lumber package routes
├── middleware/           # Custom middleware
├── utils/               # Utility functions
├── server.js            # Main server file
├── package.json         # Dependencies and scripts
└── README.md           # This file
```

## 🔧 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run the test suite
- `npm run lint` - Run ESLint for code quality

## 📊 API Endpoints

### **Lumber Packages**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/lumberPackages` | Get all lumber packages |
| GET | `/api/lumberPackages/:id` | Get a specific lumber package |
| POST | `/api/lumberPackages` | Create a new lumber package |
| PUT | `/api/lumberPackages/:id` | Update a lumber package |
| DELETE | `/api/lumberPackages/:id` | Delete a lumber package |

### **Health Check**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API health check |

## 🗄️ Database Schema

### **Lumber Package Model**
```javascript
{
  species: String,        // Wood species (Pine, Oak, Maple, etc.)
  grade: String,          // Quality grade (A, B, C, D)
  vendor: String,         // Supplier information
  footage: String,        // Board footage
  comments: String,       // Additional notes
  date: Date,            // Processing date
  courses: String,       // Number of courses
  status: String,        // Current status
  kilnName: String,      // Specific kiln identifier
  loadNumber: String,    // Unique load identifier
  createdAt: Date,       // Creation timestamp
  updatedAt: Date        // Last update timestamp
}
```

## 🔐 Authentication

The API uses JWT-based authentication:

1. **Login** - POST `/api/auth/login` with credentials
2. **Token** - Receive JWT token in response
3. **Authorization** - Include token in `Authorization: Bearer <token>` header
4. **Validation** - Middleware validates token on protected routes

## 🌐 Environment Variables

Create a `.env` file with the following variables:

```env
PORT=5000
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-secret-key
NODE_ENV=development
```

## 🧪 Testing

The API includes comprehensive testing:

- **Unit Tests** - Individual function testing
- **Integration Tests** - API endpoint testing
- **Database Tests** - MongoDB operations testing
- **Authentication Tests** - Security feature testing

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Docker Deployment
```bash
docker build -t envtory-api .
docker run -p 5000:5000 envtory-api
```

## 📊 Monitoring & Logging

The API includes:

- **Request Logging** - Morgan middleware for HTTP requests
- **Error Logging** - Comprehensive error tracking
- **Health Checks** - Endpoint monitoring
- **Performance Metrics** - Response time tracking

## 🔗 Integration

The API is designed to integrate with:

- **Mobile Application** - React Native app for field operations
- **Web Dashboard** - React web app for administration
- **External Systems** - Third-party lumber management systems
- **Reporting Tools** - Analytics and business intelligence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the main [README.md](../README.md) for project overview
- Review the Express.js documentation: [expressjs.com](https://expressjs.com/)

---

**EnVtory API** - *Backend services for lumber processing management*
