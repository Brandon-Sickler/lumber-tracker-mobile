# EnVtory Frontend - React Web Dashboard

The web dashboard component of the EnVtory lumber processing management system. Built with React, this application provides administrators and managers with comprehensive analytics, reporting, and system management capabilities.

> **Note**: This is part of the larger EnVtory system. See the main [README.md](../README.md) for the complete project overview.

## 🌐 Overview

The EnVtory Frontend provides a comprehensive web-based dashboard for managing lumber processing operations:

- **Analytics Dashboard** - Real-time insights and performance metrics
- **User Management** - Role-based access control and user administration
- **System Configuration** - Settings and preferences management
- **Reporting Tools** - Generate and export detailed reports
- **Data Visualization** - Charts and graphs for operational insights

## ✨ Features

### 📊 **Analytics & Reporting**
- Real-time inventory statistics
- Processing efficiency metrics
- Quality control reports
- Performance dashboards
- Export functionality (PDF, Excel)

### 👥 **User Management**
- Basic user interface
- Simple navigation
- User-friendly design
- Intuitive controls

### ⚙️ **System Administration**
- Configuration management
- System settings and preferences
- Integration management
- Basic administration features

### 📱 **Responsive Design**
- Mobile-friendly interface
- Cross-browser compatibility
- Adaptive layouts
- Modern UI/UX design

## 🛠️ Technology Stack

### **Core Technologies**
- **React** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **Material-UI** - Component library and design system

### **State Management**
- **React Context API** - Global state management
- **React Hooks** - Local state and side effects
- **Custom Hooks** - Reusable business logic

### **Data & API**
- **Axios** - HTTP client for API communication
- **React Query** - Server state management and caching
- **Formik** - Form handling and validation

### **Development Tools**
- **Create React App** - Development environment
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Jest** - Testing framework

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Access to the EnVtory API backend

### Installation

1. **Navigate to the frontend directory**
   ```bash
   cd lumber-tracker-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API endpoint and configuration
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The application will automatically reload on changes

## 📁 Project Structure

```
lumber-tracker-frontend/
├── public/                 # Static assets
│   ├── index.html         # Main HTML template
│   └── favicon.ico        # Site icon
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   ├── styles/           # Global styles and themes
│   └── App.tsx           # Main application component
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🔧 Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the application for production
- `npm test` - Run the test suite
- `npm run lint` - Run ESLint for code quality
- `npm run format` - Format code with Prettier

## 🎨 Customization

The application uses Material-UI with a custom theme. You can customize:

- **Colors**: Update the theme palette in `src/styles/theme.ts`
- **Typography**: Modify font settings in the theme configuration
- **Components**: Override Material-UI component styles
- **Layout**: Adjust the main layout in `src/App.tsx`

## 📊 Features in Detail

### Dashboard
- Real-time inventory overview
- Processing station status
- Performance metrics and KPIs
- Quick action buttons

### Analytics
- Interactive charts and graphs
- Historical data analysis
- Trend identification
- Custom date range filtering

### User Management
- User creation and editing
- Role assignment and permissions
- Activity monitoring
- Security settings

### Reporting
- Automated report generation
- Custom report templates
- Export options (PDF, Excel, CSV)
- Scheduled reporting

## 🔗 API Integration

The frontend communicates with the EnVtory API backend through:

- **RESTful API calls** using Axios
- **Real-time updates** via WebSocket connections
- **Authentication** using JWT tokens
- **Error handling** with user-friendly messages

## 🧪 Testing

The application includes comprehensive testing:

- **Unit Tests** - Component and utility function testing
- **Integration Tests** - API integration testing
- **E2E Tests** - End-to-end user workflow testing
- **Visual Regression Tests** - UI consistency testing

## 🚀 Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

### Docker Deployment
```bash
docker build -t envtory-frontend .
docker run -p 3000:3000 envtory-frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the main [README.md](../README.md) for project overview
- Review the React documentation: [reactjs.org](https://reactjs.org/)

---

**EnVtory Frontend** - *Web dashboard for lumber processing management*