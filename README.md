# 🐶 Fetch A Friend - Dog Matching App

Fetch A Friend is a **Next.js** application that provides a seamless authentication experience using **NextAuth.js**. Additionally, users can browse and filter different dog breeds with sorting and pagination.

## ✨ Features

- **Authentication** using NextAuth.js
- **Protected Routes** (Redirection for unauthorized users)
- **Login UI**
- **Server-side session handling**
- **Deployed on Vercel**
- **Dog Breed Filtering** - Users can filter results by breed
- **Pagination Support** - Results are paginated for better performance
- **Alphabetical Sorting** - Breeds are sorted **A-Z by default**
- **Save Favorite Dogs** - Users can favorite dogs for matching
- **Mobile Responsive**

## 🔄 Follow-Up Work

### Future improvements planned for the project:

```
• Expanding Test Coverage – Improve test suite coverage for better reliability.
• Filter by Location/Zip Code – Allow users to filter dog breeds by location.
• Refine Pagination UX – Keep pagination layout consistent and handle edge cases.
• Implement Token Refreshing – Add functionality to refresh authentication tokens.
• Better error handling from server (global snackbar notifying user of any errors)
• Adding Sort & Pagination to Favorite Page.
• Enhancing text and background styling for better Dark Mode readability.
```

---

## 🛠️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **NextAuth.js** (Authentication)
- **Tailwind CSS** (Styling)
- **PostgreSQL (NeonDB)** - Database
- **Vercel** (Deployment)

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-username/fetch-a-friend.git
cd fetch-a-friend
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a .env.local file and add the required environment variables:

```sh
AUTH_SECRET=your-generated-secret-key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

If you need an AUTH_SECRET, generate one with:

```sh
openssl rand -base64 32
```

### 4️⃣ Pull Environment Variables from Vercel

```sh
vercel env pull .env.local
```

After successfully pull the `.env.local` file, update NEXT_PUBLIC_BASE_URL value to be http://localhost:3000

---

## 🔑 Logging In

### The app supports email-based login with credentials.

```
1. Enter your name and email on the login form.
2. Click Sign In.
3. If valid, you will be redirected to /main.
4. If authentication fails, an error message will appear.
```

---

## 🐶 Browsing Dog Breeds

### Once authenticated, users can:

```
• Filter breeds based on search criteria.
• Paginate results to navigate easily.
• Sort breeds alphabetically (A-Z by default).
• Favorite multiple dogs and generate a match.
```

---

## 🛢️ Using PostgreSQL as the Database

This project uses PostgreSQL (hosted on Neon) as the database backend. It stores user favorites and dog breed information.

### Database Schema

The database consists of the following tables:

- Favorite Table

```sh
CREATE TABLE IF NOT EXISTS favorite (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    dog_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Protected Routes (via middleware)

```
• Users must be logged in to access certain pages.
• If a user is not authenticated, they will be redirected to the login page.
```
