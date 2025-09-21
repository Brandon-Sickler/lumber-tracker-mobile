# Lumber Tracker Mobile

A comprehensive mobile application for tracking lumber through various processing stages in a lumber mill. Built with React Native and Expo, this app helps manage inventory and monitor lumber from initial receipt through final processing.

## 🏭 Overview

The Lumber Tracker Mobile app provides a complete solution for managing lumber inventory across different processing stations:

- **Green Lumber Received** - Track incoming lumber shipments
- **Infeed Queue** - Manage lumber waiting for processing
- **Rip Line Production** - Monitor cutting and processing operations
- **Air-Drying** - Track lumber in air-drying stages
- **Kiln Operations** - Manage kiln-drying processes
- **KD Lumber** - Track kiln-dried finished lumber

## ✨ Features

- **Multi-Station Tracking**: Monitor lumber through 6 different processing stages
- **Inventory Management**: Real-time inventory tracking with detailed statistics
- **Status Updates**: Easy status transitions between processing stages
- **Barcode Scanning**: Quick lumber identification using camera/barcode scanner
- **Data Persistence**: Local storage with AsyncStorage for offline capability
- **Modern UI**: Clean, intuitive interface built with React Native Paper
- **Cross-Platform**: Runs on iOS, Android, and Web

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd lumber-tracker-mobile
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
    npx expo start
   ```

4. Run on your preferred platform:
   - **iOS**: Press `i` in the terminal or scan QR code with Camera app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in the terminal

## 📱 App Structure

### Main Screens
- **Home**: Dashboard with inventory overview and station navigation
- **Inventory**: Detailed inventory management
- **Stations**: Individual screens for each processing stage

### Processing Stations
1. **Green Lumber** - Initial lumber receipt and logging
2. **Infeed Queue** - Queue management for processing
3. **Rip Line** - Production line operations
4. **Air-Drying** - Natural drying process tracking
5. **Kiln Operations** - Kiln-drying management
6. **KD Lumber** - Finished product tracking

### Data Models

**Lumber Item Structure:**
```typescript
interface Lumber {
  id: string;
  species: string;        // Wood species (Pine, Oak, Maple, etc.)
  grade: string;          // Quality grade (A, B, C, D)
  vendor: string;         // Supplier information
  footage: string;        // Board footage
  comments: string;       // Additional notes
  date: string;          // Processing date
  courses: string;       // Number of courses
  status: 'green' | 'air-drying' | 'kiln' | 'kd' | 'infeed' | 'rip';
  kilnName?: string;     // Specific kiln identifier
  loadNumber: string;    // Unique load identifier
}
```

## 🛠️ Technology Stack

### **Core Framework & Platform**
- **Framework**: React Native 0.74.5 with Expo SDK 51.0.32
- **Language**: TypeScript 5.3.3 (strict mode enabled)
- **Cross-Platform**: iOS, Android, and Web support
- **Development**: Expo CLI for streamlined workflow

### **UI/UX & Design System**
- **UI Framework**: React Native Paper 5.12.5 (Material Design 3)
- **Custom Theme**: Neon orange primary color (`rgb(255, 140, 0)`)
- **Icons**: Expo Vector Icons (Ionicons)
- **Typography**: SpaceMono font for custom styling
- **Styling**: StyleSheet with Flexbox responsive layout

### **Navigation & Routing**
- **Navigation**: Expo Router 3.5.23 (file-based routing)
- **Stack Navigation**: Screen transitions and modal presentation
- **Tab Navigation**: Bottom tab bar with custom icons
- **Deep Linking**: URL-based navigation support

### **State Management & Data**
- **State Management**: React Context API with custom hooks
- **Data Persistence**: AsyncStorage for local storage
- **Forms**: React Hook Form for form state management
- **Date Handling**: Date-fns for date manipulation

### **Mobile-Specific Features**
- **Camera**: Expo Camera for barcode scanning
- **Barcode Scanner**: Expo Barcode Scanner integration
- **Keyboard Handling**: KeyboardAvoidingView for better UX
- **Touch Gestures**: React Native Gesture Handler
- **Safe Areas**: React Native Safe Area Context

### **Development Tools & Quality**
- **Build System**: Metro bundler with Babel transpilation
- **Code Quality**: ESLint, TypeScript strict mode, Jest testing
- **Module Resolution**: Custom path aliases (`@/components`, `@/utils`)
- **Testing**: Jest with React Test Renderer

### **Performance & Animation**
- **Animations**: React Native Reanimated for smooth animations
- **Charts**: React Native Chart Kit for data visualization
- **SVG**: React Native SVG for scalable graphics
- **PDF Generation**: React Native HTML to PDF

### **Architecture Patterns**
- **Component Architecture**: Functional components with hooks
- **Custom Hooks**: Reusable logic (`useLumber`, `useInventory`)
- **Context Providers**: Global state management
- **Error Boundaries**: Comprehensive error handling
- **Type Safety**: Full TypeScript coverage with strict mode

## 📁 Project Structure

```
lumber-tracker-mobile/
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab navigation screens
│   ├── stations/          # Processing station screens
│   └── modal.tsx          # Modal components
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/          # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # Additional screens
│   ├── styles/           # Global styles and themes
│   └── types/            # TypeScript type definitions
├── assets/               # Images, fonts, and static assets
└── __tests__/           # Test files
```

## 🔧 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm test` - Run test suite
- `npm run lint` - Run ESLint

## 🎨 Customization

The app uses a custom theme with a neon orange primary color (`rgb(255, 140, 0)`). You can customize colors and styling in:
- `app/_layout.tsx` - Main theme configuration
- `src/styles/` - Global style definitions
- `src/constants/Colors.ts` - Color palette

## 📊 Features in Detail

### Inventory Management
- Real-time inventory tracking
- Status-based filtering
- Detailed statistics and reporting
- Bulk operations support

### Station Operations
- Intuitive workflow management
- Status transition tracking
- Process-specific data entry
- Quality control integration

### Data Persistence
- Local storage with AsyncStorage
- Offline capability
- Data synchronization ready
- Backup and restore functionality

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to get started.

**Quick Start:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For detailed information about our development process, coding standards, and how to contribute effectively, please read our [Contributing Guide](CONTRIBUTING.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 Brandon Sickler

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the Expo documentation: [docs.expo.dev](https://docs.expo.dev/)
- Join the Expo community: [chat.expo.dev](https://chat.expo.dev/)

## 🏗️ Architecture & Design Patterns

### **Component Architecture**
- **Functional Components**: Modern React patterns with hooks
- **Custom Hooks**: Reusable business logic (`useLumber`, `useInventory`)
- **Context Providers**: Global state management with React Context
- **Error Boundaries**: Comprehensive error handling and recovery

### **File Organization**
```
src/
├── components/     # Reusable UI components
├── context/        # State management (Lumber, Inventory, Process)
├── hooks/          # Custom React hooks
├── screens/        # Screen components
├── types/          # TypeScript definitions
├── utils/          # Helper functions
├── api/            # API utilities (ready for backend integration)
├── constants/      # App constants and configuration
└── styles/         # Global styles and themes

app/
├── (tabs)/         # Tab-based navigation screens
├── stations/       # Lumber processing station screens
└── styles/         # App-specific styles
```

### **Data Flow**
- **Unidirectional Data Flow**: React's standard data flow pattern
- **Context-based State**: Centralized state management
- **Local Storage**: AsyncStorage for data persistence
- **Type Safety**: Full TypeScript coverage with strict mode

### **Industry-Specific Design**
- **Workflow-based UI**: Matches real lumber processing operations
- **Status-driven Logic**: Lumber status transitions between stations
- **Quality Control**: Comments and notes system for tracking
- **Inventory Management**: Comprehensive tracking and reporting

## 🎓 Technical Skills Demonstrated

### **Frontend Development**
- **React Native**: Cross-platform mobile development
- **TypeScript**: Type-safe development with strict mode
- **Modern JavaScript**: ES6+ features and async/await patterns
- **Material Design**: Professional UI/UX implementation

### **Mobile Development**
- **Cross-platform**: iOS, Android, and Web support
- **Native Integration**: Camera, barcode scanning, device APIs
- **Performance**: Optimized rendering and smooth animations
- **Responsive Design**: Adaptive layouts for different screen sizes

### **Software Engineering**
- **Clean Architecture**: Separation of concerns and modular design
- **Code Quality**: ESLint, TypeScript, comprehensive testing setup
- **Documentation**: Detailed README, contributing guidelines, code comments
- **Version Control**: Professional Git workflow and repository management

### **Industry Knowledge**
- **Lumber Processing**: Understanding of manufacturing workflows
- **Business Logic**: Status management, inventory tracking, quality control
- **Process Optimization**: Streamlined mobile workflow for field operations

## 🔮 Future Enhancements

- [ ] Cloud synchronization with backend API
- [ ] Advanced reporting and analytics dashboard
- [ ] Multi-user support with role-based access
- [ ] Integration with external lumber management systems
- [ ] Advanced barcode/QR code features with inventory lookup
- [ ] Photo documentation for quality control
- [ ] Export functionality (PDF reports, Excel spreadsheets)
- [ ] Push notifications for status updates and alerts
- [ ] Real-time collaboration between multiple users
- [ ] Advanced search and filtering capabilities

## 👨‍💻 About the Author

This project was created and is maintained by **Brandon Sickler**.

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-@Brandon--Sickler-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Brandon-Sickler)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Brandon%20Sickler-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/brandonsicklerexpat/)

</div>

*Passionate about building innovative solutions that solve real-world problems in the lumber and manufacturing industries. Connect with me to discuss technology, lumber processing, or potential collaborations!*