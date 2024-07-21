# Therapeutic Backend App

This repository contains the backend server for the Therapeutic AI interactive application. The application allows users to communicate with an AI model using text, image, or audio inputs. The backend handles authentication, user management, and proxy requests to the AI model.

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Testing the Endpoints](#testing-the-endpoints)
- [Contributing](#contributing)
- [License](#license)


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/therapeutic-backend.git
   cd therapeutic-backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `serviceAccountKey.json` file in the root directory and add your Firebase Admin SDK credentials.

2. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=3000
   JWT_SECRET=your_jwt_secret
   DATABASE_URL=https://therapeutic-backend.firebaseio.com
   ```

## Running the Server

To start the server in development mode with `node`:

```bash
npm start
```

The server will run on `http://localhost:3000`.

## API Endpoints

### Auth Endpoints

- **Signup**
  - URL: `/auth/signup`
  - Method: `POST`
  - Body:
    ```json
    {
      "email": "testuser@example.com",
      "password": "password123",
      "name": "Test User"
    }
    ```
  - Description: Creates a new user account.

- **Login**
  - URL: `/auth/login`
  - Method: `POST`
  - Body:
    ```json
    {
      "email": "testuser@example.com",
      "password": "password123"
    }
    ```
  - Description: Logs in an existing user and returns a JWT token.

- **Google Sign-In**
  - URL: `/auth/google-signin`
  - Method: `POST`
  - Body:
    ```json
    {
      "idToken": "your_google_id_token"
    }
    ```
  - Description: Authenticates a user using Google Sign-In.

### Conversation Endpoints

- **Get Conversations**
  - URL: `/conversation`
  - Method: `GET`
  - Description: Retrieves a list of conversations.

- **Create Conversation**
  - URL: `/conversation`
  - Method: `POST`
  - Body:
    ```json
    {
      "message": "Hello, I need help with..."
    }
    ```
  - Description: Creates a new conversation.

## Testing the Endpoints

You can test the API endpoints using Postman:

1. **Signup**:
   - Method: `POST`
   - URL: `http://localhost:3000/auth/signup`
   - Body: 
     ```json
     {
       "email": "testuser@example.com",
       "password": "password123",
       "name": "Test User"
     }
     ```

2. **Login**:
   - Method: `POST`
   - URL: `http://localhost:3000/auth/login`
   - Body:
     ```json
     {
       "email": "testuser@example.com",
       "password": "password123"
     }
     ```

3. **Google Sign-In**:
   - Method: `POST`
   - URL: `http://localhost:3000/auth/google-signin`
   - Body:
     ```json
     {
       "idToken": "your_google_id_token"
     }
     ```

4. **Get Conversations**:
   - Method: `GET`
   - URL: `http://localhost:3000/conversation`

5. **Create Conversation**:
   - Method: `POST`
   - URL: `http://localhost:3000/conversation`
   - Body:
     ```json
     {
       "message": "Hello, I need help with..."
     }
     ```

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) for details on the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.