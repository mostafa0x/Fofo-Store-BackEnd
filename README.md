# Online Product Marketing Project

An online product marketing project that includes a shopping cart where users can add products, increase or decrease the quantity, remove products, view product details by ID, or view all products. It also includes categories for products, where each product is registered under a category, and a dashboard to manage and modify products.

## Technologies Used:

- **Express**: For creating the server and serving the APIs.
- **MongoDB**: For storing product and user data.
- **Mongoose**: For interacting with MongoDB in a flexible way.
- **Google Auth Library**: For authentication using Google accounts.
- **Axios**: For making API requests between the client and server.

## Key Features:

- **Shopping Cart**: You can add products to the cart, adjust quantities, remove items, or clear the cart entirely.
- **Product Details**: View details of any product by ID or display all products.
- **Categories**: Each product is registered under a category, and you can view all categories.
- **Dashboard**: Easily add and manage products through an administrative dashboard.

## Project Structure

- **models/**: Contains Mongoose models for products, categories, and users.
- **routes/**: Contains Express route handlers for different endpoints like adding products, viewing products, managing the cart, etc.
- **controllers/**: Contains the logic for each route, such as adding/removing items from the cart or managing products.
- **middleware/**: Contains authentication middleware for securing routes that require Google authentication.
- **config/**: Holds configuration files, such as database connection settings.
  
## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or use a cloud service like MongoDB Atlas)

### Steps to Run the Project

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/online-product-marketing.git
   cd online-product-marketing
