# Digitalflake Admin Dashboard

This is a digital platform where users can manage categories, subcategories, and products through a backend system. The frontend interacts with the backend to perform CRUD operations on these entities, and there is an authentication system to protect certain routes.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- User Registration & Login with JWT-based authentication.
- Protected routes using a `protect` middleware.
- Category Management: Fetch, add, edit, and delete categories.
- Subcategory Management: Similar CRUD operations for subcategories.
- Product Management: CRUD operations for products.

## Technologies
- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/AshutoshDikondwar/digitalflake-Admin-dashboard.git
    cd digitalflake-Admin-dashboard
    ```

2. **Install dependencies for the backend:**
    ```bash
    cd backend
    npm install
    ```

3. **Install dependencies for the frontend:**
    ```bash
    cd ../frontend
    npm install
    ```

4. **Set up environment variables:**
    Create a `.env` file in the `backend` directory and add the following:
    ```env
    JWT_SECRET=your_jwt_secret
    MONGO_URI=your_mongodb_uri
    ```

5. **Run the backend server:**
    ```bash
    cd backend
    npm start
    ```

6. **Run the frontend development server:**
    ```bash
    cd ../frontend
    npm start
    ```

## Usage

### Register a new user
1. Navigate to the registration page.
2. Fill in the required fields and submit the form.

### Login
1. Navigate to the login page.
2. Enter your credentials and submit the form.
3. The token will be stored in local storage.

### Category Management
1. Navigate to the categories page.
2. Add, edit, or delete categories as needed.

### Subcategory & Product Management
1. Navigate to the subcategories or products page.
2. Add, edit, or delete subcategories/products as needed.

## API Endpoints

### Authentication
- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Login a user.

### Categories
- `GET /api/categories`: Get all categories.
- `POST /api/categories`: Add a new category.
- `PUT /api/categories/:id`: Update a category.
- `DELETE /api/categories/:id`: Delete a category.

### Subcategories
- `GET /api/subcategories`: Get all subcategories.
- `POST /api/subcategories`: Add a new subcategory.
- `PUT /api/subcategories/:id`: Update a subcategory.
- `DELETE /api/subcategories/:id`: Delete a subcategory.

### Products
- `GET /api/products`: Get all products.
- `POST /api/products`: Add a new product.
- `PUT /api/products/:id`: Update a product.
- `DELETE /api/products/:id`: Delete a product.


