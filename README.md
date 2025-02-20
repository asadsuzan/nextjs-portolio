# Next.js Portfolio & Blog Website

🚀 **Live Website:** [https://next-portfolio-livid-pi.vercel.app/](https://next-portfolio-livid-pi.vercel.app/)
📂 **GitHub Repository:** [https://github.com/asadsuzan/nextjs-portolio](https://github.com/asadsuzan/nextjs-portolio)

## 📌 Project Overview
This is a **personal portfolio and blog website** built with **Next.js** and **TypeScript**, featuring dynamic routing, API integration, authentication, state management, and deployment. It serves as both a portfolio to showcase projects and a blog management system with a dashboard for authenticated users.

## 🎯 Features
### 🌍 **Public Pages (Accessible to All Users)**
- **Home Page (`/`)**
  - Personal introduction (name, bio, and profile picture)
  - Skills showcase (icons/skill bar)
  - Featured projects
  - Resume download button
- **Projects Page (`/projects`)**
  - List of projects with images, descriptions, and links
  - Detailed project pages (`/projects/[id]`)
- **Blog Page (`/blog`)**
  - Displays a list of blogs (fetched from API/JSON file)
  - Detailed blog pages (`/blog/[id]`)
- **Contact Page (`/contact`)**
  - Simple contact form (name, email, message)
  - Messages stored in the database

### 🔐 **Dashboard (Only for Logged-in Users)**
- **Login (`/dashboard`)**
  - Social login via NextAuth
- **Blog Management (`/dashboard/blogs`)**
  - Create, Read, Update, and Delete (CRUD) blog posts
- **Project Management (`/dashboard/projects`)**
  - CRUD operations for projects
  - Upload project images, add links, and descriptions
- **Message Management (`/dashboard/messages`)**
  - View messages submitted from the contact form

## ⚙️ **Technical Stack**
### **Frontend**
- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Dark Mode Toggle**
- **SEO Optimized** (SSG, SSR, Metadata)

### **Backend**
- **MongoDB** as the database
- **NextAuth.js** for authentication
- **Next.js API Routes** (`/api/...`)

## 🚀 **Deployment**
- **Frontend & Backend Deployed on Vercel**
- **MongoDB Atlas** for database storage

## 🔧 **Installation & Setup**
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/asadsuzan/nextjs-portolio.git
cd nextjs-portolio
```

### 2️⃣ Install Dependencies
```bash
npm install  # or yarn install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file and configure the following:
```env
MONGODB_URI=""
GITHUB_SECRET=""
GITHUB_ID=""
NEXTAUTH_SECRET=""
GOOGLE_ID=""
GOOGLE_SECRET=""
BASE_URL=

```

### 4️⃣ Run the Project Locally
```bash
npm run dev  # or yarn dev
```
Open `http://localhost:3000` in your browser.



## 🛠 **Future Improvements**
- Enhance UI/UX with more animations
- Implement notifications for dashboard actions
- Optimize API responses for faster loading
- Add more social login options

## 🤝 **Contributing**
Feel free to fork the repo, open issues, or submit pull requests to improve the project.

## 📜 **License**
This project is licensed under the **MIT License**.

---
🚀 **Developed by [Asaduzzaman Suzan](https://github.com/asadsuzan)**

