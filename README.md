# FileShare

A secure file sharing application that allows users to upload files and share them via unique codes. Files automatically expire after 24 hours for enhanced security.

## Features

- Secure file upload and storage
- Unique code generation for each file
- Easy file retrieval using codes
- Automatic file expiration after 24 hours
- Clean, responsive user interface

## Tech Stack

- **Frontend**: React, Vite, Axios, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Storage**: Local file system

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/fileshare
   FILE_EXPIRY_HOURS=24
   ```

4. Start the backend server:
   ```
   npm start (or) node server.js
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Access the application at `http://localhost:5173`

## Usage

1. **Upload a File**:
   - Go to the Upload page
   - Select a file
   - Click "Upload"
   - Copy the generated code

2. **Download a File**:
   - Go to the Download page
   - Enter the code
   - Click "Verify"
   - Click "Download" to retrieve the file

## Project Structure

```
fileshare/
├── backend/
│   ├── controllers/
│   │   └── fileController.js
│   ├── models/
│   │   └── File.js
│   ├── routes/
│   │   └── fileRoutes.js
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Upload.jsx
    │   │   └── Download.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    └── vite.config.js
```

A secure file sharing application that allows users to upload files and share them using unique one-time codes.

## Features

- Upload files securely
- Generate unique one-time codes for each file
- Download files using the unique code
- Files auto-expire after 24 hours

## Tech Stack

- **Frontend**: React + Vite, CSS, Axios
- **Backend**: Node.js, Express.js, Multer, UUID
- **Database**: MongoDB

## Setup Instructions

### Prerequisites
- Node.js
- MongoDB (local or MongoDB Atlas)

### Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:
   ```
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   FILE_EXPIRY_HOURS=24
   ```

4. Start the application:
   ```
   # Start backend
   cd backend
   npm start (or) node server.js

   # Start frontend (in a new terminal)
   cd frontend
   npm run dev
   ```

5. Access the application at `http://localhost:5173`
