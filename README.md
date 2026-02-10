# Quiz Mania

A full-stack quiz application that allows users to test their knowledge across various categories with customizable difficulty levels and question types. Built with React, Express, and MySQL.

## Features

- **User Authentication** - Secure registration and login system with JWT tokens and bcrypt password hashing
- **Multiple Categories** - Choose from various quiz categories powered by Open Trivia Database
- **Customizable Difficulty** - Select from Easy, Medium, Hard, or Any difficulty level
- **Question Types** - Multiple choice, True/False, or mixed question types
- **Score Tracking** - Track your quiz performance and view your score history
- **Secure Sessions** - HTTP-only cookies for secure authentication

## Tech Stack

### Frontend
- React
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast

### Backend
- Express.js
- MySQL2
- JSON Web Tokens (JWT)
- Bcrypt
- Cookie Parser
- dotenv

### External API
- [Open Trivia Database](https://opentdb.com/api_config.php)

## Project Structure

```
quiz-mania/
├── client/                 # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/                 # Express backend
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   └── package.json
└── README.md
```

## Database Schema

### Tables

#### users
- `id` (INT, Primary Key, Auto Increment)
- `email` (VARCHAR(255), Unique, Not Null)
- `password` (VARCHAR(255), Not Null) - Hashed with bcrypt
- `name` (VARCHAR(50))
- `created_at` (TIMESTAMP, Default: CURRENT_TIMESTAMP)

#### categories
- `id` (INT, Primary Key, Auto Increment)
- `name` (VARCHAR(255), Not Null)
- `number` (INT) - Category ID from Open Trivia DB
- `created_at` (TIMESTAMP, Default: CURRENT_TIMESTAMP)

#### quiz_sessions
- `id` (INT, Primary Key, Auto Increment)
- `user_id` (INT, Foreign Key -> users.id, Not Null)
- `score` (INT)
- `category_id` (INT, Foreign Key -> categories.id, Not Null, Default: 1)
- `difficulty` (ENUM: 'any', 'easy', 'medium', 'hard', Default: 'any')
- `type` (ENUM: 'multiple', 'true_false', 'any', Default: 'any')
- `created_at` (TIMESTAMP, Default: CURRENT_TIMESTAMP)

#### questions
- `id` (INT, Primary Key, Auto Increment)
- `session_id` (INT)
- `question` (TEXT)
- `answer` (INT, Foreign Key -> answers.id)
- `user_id` (INT)

#### answers
- `id` (INT, Primary Key, Auto Increment)
- `answer` (TEXT)
- `question_id` (INT, Foreign Key -> questions.id)

### Important Database Notes

**Required Modification:**
Add ENUM constraints for `difficulty` and `question_type` columns in the `quiz_sessions` table:

```sql
ALTER TABLE quiz_sessions 
MODIFY COLUMN difficulty ENUM('any', 'easy', 'medium', 'hard') NOT NULL DEFAULT 'any',
MODIFY COLUMN type ENUM('multiple', 'true_false', 'any') NOT NULL DEFAULT 'any';
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd quiz-mania
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

### 4. Database Setup

Create a MySQL database and import the schema:

```sql
CREATE DATABASE quiz_mania;
USE quiz_mania;

-- Create tables as per the schema provided in the documentation
-- Or import your SQL dump file
```

### 5. Environment Variables

#### Backend (.env in `/server`)

Create a `.env` file in the `server` directory:

```env
HOST=localhost
DB_USER=your_mysql_username
DATABASE=quiz_mania
HASH_SALT_ROUNDS=10
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

#### Frontend (.env in `/client`)

Create a `.env` file in the `client` directory:

```env
VITE_SERVER_URL=http://localhost:5000
```

## Running the Application

### Development Mode

#### Start Backend Server

```bash
cd server
npm run dev
```

The backend server will run on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd client
npm run dev
```

The frontend will run on `http://localhost:5173`

### Production Mode

#### Build Frontend

```bash
cd client
npm run build
```

#### Start Backend

```bash
cd server
npm start
```

## NPM Packages Used

### Backend Dependencies
- `axios` - HTTP client for fetching questions from Open Trivia DB
- `express` - Web framework
- `mysql2` - MySQL database driver
- `dotenv` - Environment variable management
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT authentication
- `cookie-parser` - Parse HTTP cookies

### Backend Dev Dependencies
- `nodemon` - Auto-restart server during development

### Frontend Dependencies
- `react` - UI library
- `react-router-dom` - Client-side routing
- `axios` - HTTP client
- `react-hot-toast` - Toast notifications
- `tailwindcss` - Utility-first CSS framework

## How It Works

1. **User Registration/Login**
   - Users create an account with email and password
   - Passwords are hashed using bcrypt before storage
   - Upon login, a JWT token is generated and stored in an HTTP-only cookie

2. **Quiz Setup**
   - User selects:
     - Category (from available categories)
     - Difficulty level (any, easy, medium, hard)
     - Question type (multiple choice, true/false, any)
     - Number of questions

3. **Quiz Session**
   - Questions are fetched from Open Trivia Database API
   - A quiz session is created in the database
   - User answers questions one by one
   - Answers are validated and scored

4. **Score Tracking**
   - Final score is calculated and saved to the quiz_sessions table
   - Users can view their quiz history and performance

5. **Authentication Flow**
   - JWT tokens stored in HTTP-only cookies for security
   - Protected routes require valid authentication
   - Logout functionality clears the authentication cookie

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Verify JWT token

### Quiz
- `GET /api/categories` - Get all quiz categories
- `POST /api/quiz/start` - Start a new quiz session
- `POST /api/quiz/submit` - Submit quiz answers
- `GET /api/quiz/history` - Get user's quiz history
- `GET /api/quiz/score/:sessionId` - Get specific quiz score

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only cookies to prevent XSS attacks
- Environment variables for sensitive data
- SQL injection prevention with parameterized queries

## Future Enhancements

- Leaderboard functionality
- Quiz timer
- Question difficulty progression
- Social sharing of scores
- Admin panel for custom questions
- Mobile responsive design improvements

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists and tables are created

### CORS Errors
- Verify `SERVER_URL` in frontend `.env` matches backend URL
- Check CORS configuration in Express app

### Authentication Issues
- Clear browser cookies
- Verify JWT_SECRET is set in backend `.env`
- Check cookie settings in backend configuration

## License

This project is open source and available under the MIT License.

---

Built with React, Express, and MySQL
