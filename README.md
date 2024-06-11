# URL Shortener

This is a simple URL shortener application built with HTML, CSS, JavaScript, Node.js, Express, and Mongoose. The application allows users to shorten long URLs for easier sharing and tracking. Users must log in or sign up to shorten URLs.

## Features

- User authentication (login and signup).
- Shorten long URLs.
- Redirect to original URL when shortened URL is visited.
- Track the number of visits to each shortened URL.

## Technologies Used

- HTML
- CSS
- JavaScript
- Node.js
- Express
- Mongoose

## Getting Started

To run this project locally, follow the steps below.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Sarojdhakal307/urlShorter.git
   cd url-shortener
   ```

2. Install the dependencies:
    ```bash
    npm install express mongoose
    ```
### Running the Application
1. Start MongoDB:
    Make sure your MongoDB server is running. If MongoDB is not installed, follow the 
    - [installation guid.](https://www.mongodb.com/docs/manual/installation/)
2. Start the application:
    ```bash
    npx nodemon
    ```

