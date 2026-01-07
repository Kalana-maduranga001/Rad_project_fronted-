👕 Clothing Brand Store – Frontend

A modern, responsive e-commerce frontend for a clothing brand, built using React + TypeScript as part of the Rapid Application Development (RAD) coursework.
The application focuses on product discovery, size selection, cart management, and a smooth shopping experience.

🌟 Features
User Features

Modern landing page with brand-focused UI

Product listing with categories & gender filters

Product size selection (S, M, L, XL, etc.)

Add to cart & cart management

User authentication (login & register)

Order placement workflow

Responsive design (mobile, tablet & desktop)

Admin Features

View all orders in admin dashboard

Order status management

Product and inventory visibility

🛠️ Technologies Used

React 18 with TypeScript

Vite – fast build & development tool

Tailwind CSS – utility-first styling

Redux Toolkit – global state management

React Router v6 – client-side routing

Axios – API communication

ESLint & Prettier – code quality

📸 Screenshots

Home Page – Featured clothing collections

Products Page – Category & size-based browsing

Cart Page – Selected items and checkout preview

Authentication – Login & Register pages

Admin Orders Dashboard

(Add screenshots in GitHub for better presentation)

🚀 Setup & Run Instructions
1️⃣ Clone the repository
git clone https://github.com/Kalana-maduranga001/Rad_project_fronted-.git
cd Rad_project_fronted-

2️⃣ Install dependencies
npm install

3️⃣ Configure environment variables

Create a .env file in the root directory:

VITE_API_URL=http://localhost:5000/api

4️⃣ Start development server
npm run dev


📍 Frontend will be available at:
http://localhost:5173

📁 Project Structure
src/
 ├── components/        # Reusable UI components
 ├── pages/             # Page-level components
 ├── redux/             # Redux slices & store
 ├── services/          # API service files
 ├── context/           # Cart & auth context
 ├── assets/            # Images & static files
 ├── App.tsx
 └── main.tsx

📌 Notes

This frontend consumes REST APIs from the Clothing Store backend

State management handled using Redux Toolkit

Fully responsive and scalable UI architecture

👨‍💻 Author

Kalana Maduranga
Full Stack Developer
RAD Coursework Project

📄 License

This project is licensed under the MIT License
