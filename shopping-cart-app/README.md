# Shopping Cart Application

A modern e-commerce application built with React that allows users to browse products, manage their shopping cart, and complete purchases. This full-stack application features dynamic product listings, persistent cart storage, and a seamless checkout experience.

## Features

- **Product Catalog**
  - Browse products with images, prices, and descriptions
  - Responsive grid layout
  - Product detail pages
- **Shopping Cart**
  - Add/remove items
  - Adjust quantities
  - Persistent storage using localStorage
  - Real-time price calculations
- **Responsive Design**
  - Mobile-first approach
  - Adapts to all screen sizes
- **State Management**
  - React Context API for global state
  - Custom hooks for data fetching
- **Checkout Process**
  - Shipping information form
  - Order summary with items
  - Order confirmation page
- **Performance Optimizations**
  - Code splitting with React.lazy
  - Efficient API calls
  - Loading states and error boundaries

## Technologies Used

- **Frontend**: React, React Router, Styled Components
- **State Management**: React Context API
- **API**: Axios for HTTP requests
- **Testing**: Jest, React Testing Library
- **Build Tool**: Create React App
- **Mock Server**: JSON Server

## Setup Instructions

### Prerequisites
- Node.js v16+
- npm v8+

### Installation
1. Clone the repository:
```bash
git clone https://github.com/CarlosDDCmx/JavaScript-Assignments.git
cd shopping-cart-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Start the mock API server (in a separate terminal):
```bash
npm run server
```

The application will be running at `http://localhost:3000`

### Available Scripts
- `npm start`: Runs the app in development mode
- `npm run server`: Starts the mock API server
- `npm run dev`: Runs both frontend and backend concurrently
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production

## Project Structure
```
src/
├── api/             # API communication
├── assets/          # Static assets
├── components/      # Reusable components
├── context/         # Global state management
├── hooks/           # Custom hooks
├── pages/           # Application views
├── styles/          # Global styles
├── App.js           # Main application
└── index.js         # Entry point
```
