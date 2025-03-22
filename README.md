# Online Product Marketing Project 🛒

An online product marketing project that includes a shopping cart where users can add products, increase or decrease the quantity, remove products, view product details by ID, or view all products. It also includes categories for products, where each product is registered under a category, and a dashboard to manage and modify products.

![Project Logo](https://img.icons8.com/ios/50/000000/shopping-cart.png)

## Technologies Used 💻

- ![Express](https://img.shields.io/badge/Express-4E9B9E?style=flat&logo=express&logoColor=white) **Express**: For creating the server and serving the APIs.
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) **MongoDB**: For storing product and user data.
- ![Mongoose](https://img.shields.io/badge/Mongoose-880E4F?style=flat&logo=mongoose&logoColor=white) **Mongoose**: For interacting with MongoDB in a flexible way.
- ![Google Auth](https://img.shields.io/badge/Google%20Auth-4285F4?style=flat&logo=google&logoColor=white) **Google Auth Library**: For authentication using Google accounts.
- ![Axios](https://img.shields.io/badge/Axios-5A29E5?style=flat&logo=axios&logoColor=white) **Axios**: For making API requests between the client and server.

## Key Features 🌟

- 🛍️ **Shopping Cart**: You can add products to the cart, adjust quantities, remove items, or clear the cart entirely.
- 🏷️ **Product Details**: View details of any product by ID or display all products.
- 📦 **Categories**: Each product is registered under a category, and you can view all categories.
- 🖥️ **Dashboard**: Easily add and manage products through an administrative dashboard.

## Project Structure 🏗️

- **models/**: Contains Mongoose models for products, categories, and users.
- **routes/**: Contains Express route handlers for different endpoints like adding products, viewing products, managing the cart, etc.
- **controllers/**: Contains the logic for each route, such as adding/removing items from the cart or managing products.
- **middleware/**: Contains authentication middleware for securing routes that require Google authentication.
- **config/**: Holds configuration files, such as database connection settings.

## Installation ⚙️

### Prerequisites 🚀

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (local or use a cloud service like MongoDB Atlas)

### Steps to Run the Project 🏃‍♂️

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/online-product-marketing.git
   cd online-product-marketing
