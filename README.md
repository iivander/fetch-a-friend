# 🐶 Fetch A Friend - Dog Matching App

Fetch A Friend is a **Next.js** application that provides a seamless authentication experience using **NextAuth.js**. Additionally, users can browse and filter different dog breeds with sorting and pagination.

## ✨ Features
- 🛡 **Authentication** using NextAuth.js
- 🔒 **Protected Routes** (Redirection for unauthorized users)
- 🎨 **Login UI** with a background image
- 📄 **Server-side session handling**
- 🚀 **Deployed on Vercel**
- 🐕 **Dog Breed Filtering** - Users can filter results by breed
- 📑 **Pagination Support** - Results are paginated for better performance
- 🔤 **Alphabetical Sorting** - Breeds are sorted **A-Z by default**

---

## 🛠️ Tech Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **NextAuth.js** (Authentication)
- **Tailwind CSS** (Styling)
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
```

If you need an AUTH_SECRET, generate one with:
```sh
openssl rand -base64 32
```

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
```

---

## 🔐 Protected Routes
```
• Users must be logged in to access certain pages.
• If a user is not authenticated, they will be redirected to the login page.
```

---

## 🔄 Follow-Up Work

### Future improvements planned for the project:
```
• Favorite any dogs to get a match.
• Expanding Test Coverage – Improve test suite coverage for better reliability.
• Filter by Location/Zip Code – Allow users to filter dog breeds by location.
• Refine Pagination UX – Keep pagination layout consistent and handle edge cases.
• Implement Token Refreshing – Add functionality to refresh authentication tokens.

```