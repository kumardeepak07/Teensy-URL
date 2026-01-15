# Teensy-URL

A **full-stack URL shortening web application** with frontend and backend components.

Live demo: [Teensy-URL](https://teensy-url-pbt3.vercel.app)

## 🚀 About

Teensy-URL is a modern web application that allows users to shorten long URLs and manage them. This project includes a **frontend** UI and a **backend API** that handles link creation, redirection, and analytics.

It’s ideal for learning **full-stack development**, URL routing, REST APIs, and deployment workflows.

## 🧱 Project Structure

Teensy-URL/
├── teensy-url-frontend/ # Frontend (UI, likely in Next.js / React)
├── teensy-url-backend/ # Backend API (Node.js / Express / similar)
└── README.md

## ✨ Features

- 🚀 Shorten long URLs
- 🔗 Redirect shortened links
- 🧠 Optional analytics (click counts, timestamps)
- 📱 Responsive UI
- 📦 Separate frontend & backend for easy scaling

## 🛠 Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React / Next.js (likely TypeScript / JavaScript) |
| Backend    | Node.js (Express or similar) |
| Database   | Could be MongoDB / PostgreSQL / file store |
| Deployment | Vercel (frontend), backend host (API) |

## 📝 Prerequisites

Make sure you have the following installed:

- Node.js (v14+)
- npm or Yarn
- Git

## 💡 Setup & Installation

### 🧩 1. Clone the repository

```bash
git clone https://github.com/kumardeepak07/Teensy-URL.git
cd Teensy-URL
🔧 2. Backend Setup
bash
Copy code
cd teensy-url-backend
Install dependencies
bash
Copy code
npm install
Environment variables
Create a .env file:

env
Copy code
PORT=5000
DATABASE_URL=<your database connection string>
JWT_SECRET=<your secret key>
Adjust variables to match your chosen database and auth strategy.

Run backend
bash
Copy code
npm run dev
Backend should start on http://localhost:5000.

🖼️ 3. Frontend Setup
bash
Copy code
cd teensy-url-frontend
Install dependencies
bash
Copy code
npm install
Environment variables
Create a .env.local:

env
Copy code
NEXT_PUBLIC_API_URL=http://localhost:5000
Run frontend
bash
Copy code
npm run dev
Frontend typically runs on http://localhost:3000.

🔄 Usage
Visit the frontend in your browser.

Enter a long URL in the input.

Click “Shorten” to generate a compact link.

Copy and share the generated short URL.

Visit the short URL to redirect to the original.

🧪 Testing
If tests are present:

bash
Copy code
npm test
Or for frontend:

bash
Copy code
npm run test
📦 Deployment
Frontend
Deploy on Vercel:

Connect the repo in Vercel.

Set NEXT_PUBLIC_API_URL to your production backend URL.

Deploy.

Backend
Deploy on any Node.js hosting (Heroku, Render, Railway etc.):

Add environment variables in host dashboard.

Deploy automatically from GitHub.

📁 API Endpoints (Example)
Method	Route	Description
POST	/api/shorten	Create a new short URL
GET	/s/:shortCode	Redirect to original URL
GET	/api/stats/:code	Get click stats (optional)
