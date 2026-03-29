# 🍬 Golden Sweets - Sweet Shop Management System

A full-stack web application for managing a sweet shop, built with **Test-Driven Development (TDD)** principles.

![Sweet Shop](https://img.shields.io/badge/Sweet%20Shop-Management%20System-purple)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-v18+-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-v6+-brightgreen)
![Tests](https://img.shields.io/badge/Tests-22%20Passed-success)
![Coverage](https://img.shields.io/badge/Coverage-100%25-yellow)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [My AI Usage](#my-ai-usage)
- [Screenshots](#screenshots)
- [License](#license)

---

## ✨ Features

### User Features
- **Authentication**: Secure JWT-based login/registration with HTTP-only cookies
- **Browse Sweets**: View all available sweets with images and details
- **Search & Filter**: Real-time search by name, filter by category and price range
- **Purchase System**: Buy sweets with automatic inventory management
- **Responsive Design**: Beautiful UI that works on all devices

### Admin Features
- **Inventory Management**: Full CRUD operations for sweets
- **Stock Control**: Restock functionality with quantity tracking
- **Dashboard Analytics**: View and manage all products
- **Role-Based Access**: Secure admin-only endpoints

### Technical Features
- **RESTful API**: Clean, well-structured API endpoints
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs with 10 salt rounds
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error handling and user feedback
- **Test Coverage**: 100% endpoint coverage with Jest + Supertest

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 (React 19)
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcryptjs
- **Testing**: Jest + Supertest

---

## 📁 Project Structure

```
sweet-shop-management/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   ├── sweetController.js    # Sweet CRUD
│   │   └── inventoryController.js # Purchase/Restock
│   ├── middleware/
│   │   ├── authProtect.js        # JWT verification
│   │   └── adminValidate.js      # Admin role check
│   ├── models/
│   │   ├── userSchema.js         # User model
│   │   └── sweetSchema.js        # Sweet model
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── adminRoutes.js        # Admin endpoints
│   │   └── sweetRoutes.js        # Sweet endpoints
│   ├── tests/
│   │   ├── auth/                 # Auth tests
│   │   └── sweets/               # Sweet tests
│   ├── .env                      # Environment variables
│   ├── app.js                    # Express app
│   └── package.json
│
└── frontend/
    ├── app/
    │   ├── dashboard/
    │   │   └── page.js           # Dashboard page
    │   ├── login/
    │   │   └── page.js           # Login page
    │   ├── register/
    │   │   └── page.js           # Register page
    │   ├── layout.js             # Root layout
    │   ├── page.js               # Landing page
    │   └── globals.css           # Global styles
    ├── components/
    │   ├── Navbar.js             # Navigation bar
    │   ├── SweetCard.js          # Sweet display card
    │   └── SweetModal.js         # Add/Edit modal
    ├── context/
    │   └── AuthContext.js        # Auth state management
    ├── lib/
    │   └── api.js                # Axios instance
    └── package.json
```

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   NODE_ENV=development
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/sweet-shop
   MONGODB_URI_TEST=mongodb://localhost:27017/sweet-shop-test
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

4. **Create admin user** (Optional)
   ```bash
   node scripts/createAdmin.js
   ```
   - Email: `admin@sweetshop.com`
   - Password: `admin123`

5. **Seed sample data** (Optional)
   ```bash
   node scripts/seedSweets.js
   ```

6. **Start the server**
   ```bash
   npm start
   ```
   Server runs on `http://localhost:3001`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:3000`

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@sweetshop.com",
  "password": "admin123"
}
```

#### Logout
```http
POST /api/auth/logout
```

### Sweet Endpoints

#### Get All Sweets (Protected)
```http
GET /api/sweets
```

#### Search Sweets (Protected)
```http
GET /api/sweets/search?name=gulab&category=Milk&minPrice=20&maxPrice=50
```

#### Create Sweet (Admin Only)
```http
POST /api/sweets
Content-Type: application/json

{
  "name": "Gulab Jamun",
  "category": "Milk",
  "price": 30,
  "quantity": 100
}
```

#### Update Sweet (Admin Only)
```http
PUT /api/sweets/:id
Content-Type: application/json

{
  "price": 35,
  "quantity": 150
}
```

#### Delete Sweet (Admin Only)
```http
DELETE /api/sweets/:id
```

#### Purchase Sweet (Protected)
```http
POST /api/sweets/:id/purchase
```

#### Restock Sweet (Admin Only)
```http
POST /api/sweets/:id/restock
Content-Type: application/json

{
  "amount": 50
}
```

---

## 🧪 Testing

The backend includes comprehensive test coverage with Jest and Supertest.

### Run All Tests
```bash
cd backend
npm test
```

### Test Coverage
- **22 tests** across 14 test suites
- **100% endpoint coverage**
- Tests include:
  - Authentication (register, login, logout)
  - Sweet CRUD operations
  - Search and filter functionality
  - Inventory management (purchase, restock)
  - Role-based authorization

### Test Users
- **Admin**: `admin@sweetshop.com` / `admin123`
- **Regular User**: `user@sweetshop.com` / `user123`

---

## 🤖 My AI Usage

### AI Tools Used

I utilized multiple AI tools throughout this project to enhance development speed and code quality:

1. **ChatGPT** (Initial Learning and brainstormin)
2. **GitHub Copilot** (Mainly debugging and TDD implementation)
3. **Google Gemini** (Mainly the assist in the frontend development)

---


#### 1. **ChatGPT — Learning, Planning & TDD Brainstorming**

**Used for:**
- Learning and understanding Test-Driven Development (TDD)
- Applying the Red–Green–Refactor workflow in a real project
- Brainstorming backend architecture and API design

**Examples:**
- "Explain how to apply TDD step-by-step in a production backend"
- "Help me break down Sweet CRUD and Inventory features into testable units"

**Impact on the project:**
- Helped me shift my mindset to writing tests before implementation
- Guided feature breakdown into small, testable components
- Improved clarity on what should be tested and how

**Outcome:**
- Clean, scalable backend structure
- Meaningful test coverage
- Git commit history clearly reflecting Red → Green → Refactor

---

#### 2. **GitHub Copilot — Debugging & TDD Test Implementation**

**Used for:**
- Writing and refining Jest + Supertest test files
- Debugging failing tests and async behavior
- Autocompleting repetitive or boilerplate code

**Examples:**
- Test case generation for CRUD, inventory, search, and auth flows
- Fixing common issues like async database handling and test cleanup
- Suggesting consistent assertion patterns

**Impact on the project:**
- Reduced repetitive typing
- Helped debug edge cases faster
- Improved consistency across test files

**Outcome:**
- Stable test suite with isolated test cases
- Faster iteration while keeping full control over logic

---

#### 3. **Google Gemini — Frontend Development & UI Assistance**

**Used for:**
- Assisting with frontend UI development
- Creating React components using Tailwind CSS
- Improving layout, spacing, and overall UX

**Examples:**
- "Create a clean sweet card component with purchase and admin actions"
- "Improve dashboard layout for better usability"

**Impact on the project:**
- Helped speed up frontend development due to limited time
- Provided visual and layout suggestions that were manually refined

**Outcome:**
- Cleaner, more user-friendly UI
- Consistent and professional frontend presentation

---

### Reflection on AI Impact

#### ✅ **Positive Impacts**

1. **Accelerated Development (60% faster)**
   - What would typically take 15-20 hours was completed in 8-10 hours
   - Rapid prototyping of features without sacrificing quality

2. **Improved Code Quality**
   - AI suggested best practices I might have overlooked
   - Consistent error handling and validation patterns
   - Better code organization and separation of concerns

3. **Learning Enhancement**
   - Exposed to new patterns and approaches (e.g., TDD workflow)
   - Learned advanced Mongoose features and Jest configurations
   - Discovered Tailwind CSS v4 features I wasn't aware of

4. **Reduced Debugging Time**
   - AI helped identify common pitfalls (e.g., CORS issues, cookie settings)
   - Quick resolution of environment-specific bugs
   - Better understanding of error messages

5. **UI/UX Excellence**
   - Created professional, modern designs faster
   - Consistent theming across all pages
   - Responsive layouts without extensive manual testing

#### ⚠️ **Challenges & Limitations**

1. **Over-Reliance Risk**
   - Had to consciously review AI-generated code for understanding
   - Some suggestions needed manual refinement for project-specific needs

2. **Context Limitations**
   - AI sometimes suggested outdated patterns
   - Had to specify technology versions explicitly (Next.js 16, Tailwind v4)

3. **Testing Edge Cases**
   - AI-generated tests covered common scenarios well
   - Had to manually add specific business logic tests

4. **Code Style Consistency**
   - Different AI tools had varying code styles
   - Required manual cleanup for consistency (e.g., removing excessive comments)

#### 🎯 **Best Practices I Developed**

1. **Iterative Prompting**: Start broad, then refine with specific requirements
2. **Code Review**: Always review and understand AI-generated code before using
3. **Documentation**: Ask AI to explain complex logic it generates
4. **Testing**: Validate all AI-generated code with actual tests
5. **Human Oversight**: Use AI as a tool, not a replacement for critical thinking

#### 💡 **Key Takeaway**

AI tools are **incredible productivity multipliers** when used thoughtfully. They excel at:
- Boilerplate generation
- Pattern implementation
- Bug identification
- Documentation creation

However, they require **human expertise** for:
- Architecture decisions
- Business logic validation
- Code quality assurance
- Creative problem-solving

The sweet spot is **collaborative development**: AI handles repetitive tasks while I focus on design, architecture, and critical thinking. This project demonstrated that AI can reduce development time significantly without compromising quality, provided there's active human oversight and code review.

---

## 📸 Screenshots

### Landing Page
Modern, animated landing page with gradient effects and smooth transitions.

### Dashboard
Professional sidebar layout with category filters, search, and responsive grid.

### Login/Register
Clean authentication forms with proper error handling and loading states.

---

## 🎓 Learning Outcomes

Through this project, I learned:
- **TDD Methodology**: Red-Green-Refactor cycle with Jest
- **JWT Authentication**: Secure cookie-based auth implementation
- **RBAC**: Role-based access control patterns
- **MongoDB**: Advanced queries and schema design
- **Next.js 16**: App router, React 19, and Server Components
- **Tailwind v4**: New CSS variable system and @theme directive
- **AI Collaboration**: Effective prompting and AI-assisted development

---

## 📝 License

This project is created for educational purposes as part of a coding assignment.

---

## 👤 Author

**Pankaj Kumar**
- GitHub: [@bytescom](https://github.com/bytescom)
- Email: hello@pankajk.site

---

## 🙏 Acknowledgments

- **AI Tools**: Google Gemini, GitHub Copilot, ChatGPT
- **Technologies**: Next.js, Express.js, MongoDB, Tailwind CSS
- **Community**: Stack Overflow, MDN Web Docs, React documentation

---

**Note**: This project demonstrates modern web development practices including authentication, authorization, CRUD operations, testing, and responsive UI design. All business logic and architectural decisions were made by the developer with AI assistance for implementation speed.
