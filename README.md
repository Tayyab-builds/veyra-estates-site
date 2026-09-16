# Veyra Estates

A premium real estate website focused on luxury properties, refined visual design, and a polished customer experience.

## Overview

Veyra Estates is a modern luxury real estate platform built with React, Vite, and Tailwind CSS.

The website includes property discovery, buying and rental experiences, property details, agent profiles, customer accounts, favorites, inquiries, and an admin management area.

The project currently uses frontend/mock data and local storage for demonstrations.

## Features

### Public Experience

- Luxury real estate homepage
- Property listings and filtering
- Property detail pages
- Buy properties experience
- Rental properties experience
- Agent directory and profiles
- Locations and market discovery
- About and contact pages
- Favorites system
- Responsive navigation
- Responsive mobile layouts
- Premium visual design and motion effects

### Customer Experience

- Mock customer authentication
- Customer account dashboard
- Profile management
- Reservations
- Favorite properties
- Customer activity
- Account navigation
- Persistent login state using local storage

### Admin Experience

- Admin authentication
- Admin dashboard
- Property management
- Add, edit, and delete properties
- User overview
- Inquiry management
- Developer/content management mode
- Local storage based admin data

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript / JSX
- Local Storage
- Custom client-side routing
- Git & GitHub
- Vercel

## Project Structure

```text
veyra-estates/
├── public/
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── App.jsx
│   ├── router.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── .gitignore
Getting Started
1. Clone the repository
git clone https://github.com/Tayyab-builds/veyra-estates.git
2. Enter the project
cd veyra-estates
3. Install dependencies
npm install
4. Start the development server
npm run dev

Open the local Vite URL shown in the terminal.

Build for Production
npm run build

The production build is generated in:

dist/
Demo Accounts

The project currently uses mock authentication.

Customer
Email: customer@veyraestates.com
Admin
Email: admin@veyraestates.com

Authentication is currently frontend-only and intended for demonstration purposes.

Data & Persistence

The current project does not use a production backend.

Demonstration state is handled through:

Frontend mock data
Local Storage
Client-side state

This includes authentication state, favorites, property updates, inquiries, and content overrides where applicable.

Deployment

The project is designed for deployment with Vercel.

Recommended production configuration:

Framework: Vite
Build Command: npm run build
Output Directory: dist
Status

Veyra Estates is currently in active development and deployment preparation.

License

This project is a private/personal project by Tayyab-builds.

All design, branding, content, and project-specific assets are intended for this project only.


One thing: I used the demo email names shown above as placeholders; your actual project history earlier used different mock account emails. Before putting this README live, use the **exact emails currently present in `src/data/mockAccounts.js`** so the README doesn't document incorrect credentials.
