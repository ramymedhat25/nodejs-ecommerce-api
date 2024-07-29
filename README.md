# Node.js E-Commerce API

Welcome to the Node.js E-Commerce API! This API serves as the backend for an e-commerce platform, built with Node.js, Express.js, and MongoDB. It offers endpoints for managing categories, brands, subcategories, and products.

## Features

- **CRUD Operations** for categories, brands, subcategories, and products.
- **Environment-Based Configuration** with `dotenv`.
- **Error Handling Middleware** for streamlined error management.
- **Development Logging** with `morgan`.

## Technologies

- **Node.js**: JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **dotenv**: Environment variable management.
- **Morgan**: HTTP request logger.
- **Nodemon**: Development server with auto-reload.
- **Others**: `express-async-handler`, `express-validator`, `slugify`.

## Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ramymedhat25/nodejs-ecommerce-api.git
   cd nodejs-ecommerce-api
2. **Install Dependencies:**

   ```bash
   npm install

3. **Configure Environment Variables:**
   Create a .env file based on config.env.example. 
   ```bash
   PORT=8000
   MONGO_URI=<your-mongo-uri>
   NODE_ENV=development

4. **Start the Server:**
**For development:**
   ```bash
   npm run start:dev
