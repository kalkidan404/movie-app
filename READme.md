# 🎬 RoyalView

RoyalView is a full-stack movie platform where users can browse movies, search for titles, create accounts, download movies to their personal library, and receive personalized recommendations based on their download history.

The project is built to explore full-stack development, authentication, database design, API development, and personalized content recommendations.

## ✨ Features

- 🎥 **Browse Movies** — Explore the available movie collection.
- 🔎 **Search** — Search movies by title.
- 👤 **User Authentication** — Register, log in, and manage authenticated sessions with JWT.
- ⬇️ **Movie Downloads** — Save movies to a personal download library.
- 📚 **Download Library** — View and remove previously downloaded movies.
- 🎯 **Recommendations** — Get movie recommendations based on your downloaded movies' genres and languages.
- 🛡️ **Admin Controls** — Administrators can add, update, and delete movies.
- 📱 **Responsive UI** — Designed to provide a clean experience across different screen sizes.

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- Vite
- CSS

### Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt

### Database

- PostgreSQL
- Prisma ORM

### Deployment / Services

- Neon PostgreSQL
- Vercel

## 🏗️ Project Structure

```text
RoyalView/
├── backend/
│   ├── controller/
│   ├── middleware/
│   ├── router/
│   ├── src/
│   │   └── prisma/
│   └── server.js
│
└── frontend/
    ├── components/
    ├── pages/
    ├── context/
    ├── App.jsx
    └── main.jsx
```

## 🔐 Authentication

RoyalView uses JWT-based authentication.

When a user logs in successfully, the server returns a JWT containing the user's ID and role. Protected routes use the token to authenticate requests.

Authenticated users can:

- Access their account
- Download movies
- View their downloads
- Remove downloads
- Receive recommendations

Administrative actions are protected with role-based authorization.

## 🎯 Recommendation System

RoyalView currently uses a simple preference-based recommendation system.

The system looks at a user's downloaded movies and identifies:

- Their most frequently downloaded genres
- Their most frequently downloaded language

Movies matching those preferences receive a recommendation score.

Movies the user has already downloaded are excluded from the recommendation results.

This provides a simple foundation that can later be expanded into a more advanced recommendation system.

## 📥 Download System

When a user downloads a movie, RoyalView creates a download record connecting:

```text
User → Download → Movie
```

The system prevents the same user from downloading the same movie multiple times.

Users can view their saved movies in their personal Downloads library and remove them when they no longer want them.

## 👑 Admin Features

Users with the `ADMIN` role can manage the movie collection.

Admins can:

- Add movies
- Update movie information
- Delete movies

Regular users can browse and download movies but cannot modify the movie collection.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd RoyalView
```

### 2. Install dependencies

For the backend:

```bash
cd backend
npm install
```

For the frontend:

```bash
cd frontend
npm install
```

### 3. Configure environment variables

Create the required environment files and add your database connection, JWT secret, and API configuration.

Example:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
PORT=5000
```

Frontend:

```env
VITE_API_URL=http://localhost:5000
```

### 4. Start the backend

```bash
npm run dev
```

### 5. Start the frontend

```bash
npm run dev
```

The frontend will then connect to the local Express API.

## 🧠 What I Learned

Building RoyalView has been an opportunity to work with several full-stack concepts, including:

- Designing REST APIs with Express
- JWT authentication and protected routes
- Role-based authorization
- Password hashing with bcrypt
- PostgreSQL database relationships
- Working with Prisma ORM
- Connecting a React frontend to a backend API
- Managing authenticated state
- Creating user-specific data flows
- Building a basic recommendation system
- Deploying full-stack applications

## 🔮 Future Improvements

Some features that could be added in future versions include:

- ⭐ Movie ratings and reviews
- 🎬 More advanced recommendations
- 🎭 Genre-based browsing
- 📊 Personalized user profiles
- ❤️ Favorites / watchlist
- 🎞️ Movie trailers
- 📈 Better recommendation algorithms
- ☁️ Cloud-based movie storage

## 📌 Project Status

RoyalView is an active full-stack project. Core authentication, movie management, downloads, search, and recommendation functionality have been implemented, with additional features planned for future development.

---

**Built with React, Express, PostgreSQL, and Prisma.**
