# MyWebApp - .NET 8 + Vue 2 Authentication App

A modern web application built with .NET 8 backend and Vue 2 frontend, featuring secure cookie-based authentication.

## Features

- 🔐 **Secure Authentication** - Cookie-based login with HTTP-only cookies
- 🛡️ **Protected Routes** - Automatic redirection to login for protected pages
- ⚡ **Modern Stack** - .NET 8 backend with Vue 2 frontend
- 📱 **Responsive UI** - Bootstrap-based responsive design
- 🗃️ **State Management** - Vuex for centralized state management

## Technology Stack

### Backend
- .NET 8
- ASP.NET Core MVC
- Cookie Authentication
- Protected API endpoints

### Frontend
- Vue.js 2.2.2
- Vue Router 2.3.0
- Vuex 2.3.1 (State Management)
- TypeScript
- Bootstrap 3
- Webpack 2

## Getting Started

### Prerequisites
- .NET 8 SDK
- Node.js (for npm packages)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MyWebApp
   ```

2. **Install npm packages**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   dotnet watch run
   ```

4. **Access the application**
   - Open your browser to `http://localhost:5000`
   - Use credentials: username: `user`, password: `password`

## Project Structure

```
MyWebApp/
├── Controllers/
│   ├── AccountController.cs      # Authentication endpoints
│   ├── HomeController.cs         # Main MVC controller
│   └── OrderController.cs        # Protected order API
├── ClientApp/
│   ├── components/               # Vue components
│   │   ├── app/                 # Main app component
│   │   ├── login/               # Login form
│   │   ├── orderedit/           # Order editing
│   │   └── navmenu/             # Navigation
│   ├── store/                   # Vuex store
│   │   ├── index.js            # Main store
│   │   └── modules/            # Store modules
│   │       ├── auth.js         # Authentication state
│   │       └── order.js        # Order management
│   └── boot.ts                 # Vue app entry point
├── Views/                      # Razor views
└── wwwroot/                    # Static files
```

## Authentication Flow

1. **Login** - User submits credentials via `/login` page
2. **Validation** - Server validates and sets HTTP-only cookie
3. **Protection** - Protected routes check authentication status
4. **Logout** - Clears authentication cookie

## API Endpoints

- `POST /account/login` - Authenticate user
- `POST /account/logout` - Log out user
- `GET /account/me` - Get current user info (protected)
- `GET /api/orders/{id}` - Get order details (protected)

## Development

### Available Scripts
- `dotnet watch run` - Run with hot reload
- `dotnet build` - Build the application
- `dotnet publish` - Publish for deployment

### State Management
The application uses Vuex for centralized state management:
- **Auth Module** - Manages authentication state and user info
- **Order Module** - Handles order data and operations

## Deployment

For production deployment:
1. Set `ASPNETCORE_ENVIRONMENT=Production`
2. Build with `dotnet publish -c Release`
3. Configure HTTPS and secure cookie settings

## License

This project is licensed under the MIT License.
