# EnVtory - Lumber Processing Management System

<div align="center">

![EnVtory Logo](https://img.shields.io/badge/EnVtory-Lumber%20Management-FF8C00?style=for-the-badge&logo=tree&logoColor=white)

**A comprehensive lumber processing management system with mobile, web, and API components**

[![React Native](https://img.shields.io/badge/React%20Native-0.81.4-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0.9-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

</div>

## 🏭 Project Overview

EnVtory is a comprehensive lumber processing management system designed to streamline operations in lumber mills and wood processing facilities. The system consists of three integrated components that work together to provide complete visibility and control over lumber processing workflows.

### 🎯 **Project Status: In Development**

> **Note for Potential Employers**: This is an active development project showcasing modern full-stack development skills. The system demonstrates proficiency in React Native, Node.js, MongoDB, and modern software engineering practices. While functional, it represents ongoing work and may contain features in various stages of completion.

## 🏗️ System Architecture

```
EnVtory/
├── 📱 lumber-tracker-mobile/     # React Native mobile application
├── 🌐 lumber-tracker-frontend/   # React web dashboard
├── 🔧 LumberTrackerAPI/          # Node.js/Express backend API
└── 📋 README.md                  # This file
```

## 🚀 Components

### 📱 **Mobile Application** (`lumber-tracker-mobile/`)
- **Technology**: React Native with Expo
- **Purpose**: Field operations and real-time data entry
- **Features**: Offline capability, station management, data entry forms
- **Platform**: iOS, Android, Web

### 🌐 **Web Dashboard** (`lumber-tracker-frontend/`)
- **Technology**: React with modern web technologies
- **Purpose**: Administrative dashboard and reporting
- **Features**: Analytics, user management, system configuration
- **Platform**: Web browsers

### 🔧 **Backend API** (`LumberTrackerAPI/`)
- **Technology**: Node.js with Express and MongoDB
- **Purpose**: Data management and business logic
- **Features**: RESTful API, database operations, authentication
- **Database**: MongoDB Atlas (cloud)

## ✨ Key Features

### 🏭 **Lumber Processing Workflow**
- **6 Processing Stations**: Green Lumber → Infeed Queue → Rip Line → Air-Drying → Kiln Operations → KD Lumber
- **Status Tracking**: Real-time status updates and transitions
- **Quality Control**: Comments, notes, and quality assessments
- **Inventory Management**: Comprehensive tracking and reporting
- **Data Entry Forms**: Streamlined input for lumber information

### 📊 **Data Management**
- **Real-time Sync**: Mobile and web components stay synchronized
- **Offline Capability**: Mobile app works without internet connection
- **Cloud Storage**: MongoDB Atlas for reliable data persistence
- **Backup & Recovery**: Automated data protection

### 🎨 **User Experience**
- **Modern UI**: Material Design 3 with custom neon orange theme
- **Cross-Platform**: Consistent experience across devices
- **Responsive Design**: Optimized for mobile and desktop
- **Intuitive Navigation**: Workflow-based user interface

## 🛠️ Technology Stack

### **Frontend Technologies**
- **React Native 0.81.4** - Cross-platform mobile development
- **Expo SDK 54.0.9** - Development platform and tools
- **TypeScript 5.3.3** - Type-safe development
- **React Native Paper** - Material Design components
- **Expo Router** - File-based navigation

### **Backend Technologies**
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### **Development Tools**
- **Git** - Version control
- **npm** - Package management
- **ESLint** - Code quality
- **Jest** - Testing framework
- **Metro** - React Native bundler

## 📱 Screenshots

<div align="center">

### **Mobile Application Interface**

| Home Dashboard | Build New Load | Package Uploaded | Search Results |
|:---:|:---:|:---:|:---:|
| ![Home Dashboard](screenshots/Home%20Screen.jpg) | ![Build New Load](screenshots/Build%20New%20Load.jpg) | ![Package Uploaded](screenshots/Confirmed%20Package%20Uploaded.jpg) | ![Search Results](screenshots/Search%20Results.jpg) |

### **Key Features Demonstrated**
- ✅ **Intuitive Navigation** - Easy access to all processing stations
- ✅ **Real-time Data Entry** - Quick and efficient lumber tracking
- ✅ **Modern UI/UX** - Clean, professional interface design
- ✅ **Cross-platform** - Consistent experience across devices
- ✅ **Station Management** - Comprehensive lumber processing workflow

</div>

> **Note**: Screenshots show the application running on mobile devices, demonstrating the user interface and key features in action.



## 🚀 Quick Start

### Prerequisites
- Node.js (v20.17.0 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- MongoDB Atlas account (for cloud database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Brandon-Sickler/lumber-tracker-mobile.git
   cd EnVtory
   ```

2. **Install dependencies for each component**
   ```bash
   # Mobile app
   cd lumber-tracker-mobile
   npm install
   
   # Web frontend
   cd ../lumber-tracker-frontend
   npm install
   
   # Backend API
   cd ../LumberTrackerAPI
   npm install
   ```

3. **Configure environment variables**
   - Copy `.env.example` to `.env` in each component
   - Update with your MongoDB Atlas connection string
   - Configure API endpoints

4. **Start the development servers**
   ```bash
   # Start API server
   cd LumberTrackerAPI
   npm start
   
   # Start mobile app (in new terminal)
   cd lumber-tracker-mobile
    npx expo start
   
   # Start web frontend (in new terminal)
   cd lumber-tracker-frontend
   npm start
   ```

## 📁 Project Structure

```
EnVtory/
├── 📱 lumber-tracker-mobile/          # Mobile application
│   ├── app/                          # Expo Router screens
│   ├── src/                          # Source code
│   ├── assets/                       # Images, fonts, icons
│   └── README.md                     # Mobile app documentation
├── 🌐 lumber-tracker-frontend/        # Web dashboard
│   ├── public/                       # Static assets
│   ├── src/                          # React components
│   └── README.md                     # Frontend documentation
├── 🔧 LumberTrackerAPI/              # Backend API
│   ├── controllers/                  # Route controllers
│   ├── models/                       # Database models
│   ├── routes/                       # API routes
│   └── README.md                     # API documentation
└── 📋 README.md                      # This main documentation
```

## 🎓 Technical Skills Demonstrated

### **Full-Stack Development**
- **Frontend**: React Native, React, TypeScript, Material Design
- **Backend**: Node.js, Express.js, RESTful API design
- **Database**: MongoDB, Mongoose ODM, cloud deployment
- **Mobile**: Cross-platform development, native features

### **Software Engineering**
- **Architecture**: Modular design, separation of concerns
- **Code Quality**: TypeScript, ESLint, comprehensive testing
- **Version Control**: Professional Git workflow
- **Documentation**: Detailed READMEs, code comments

### **Industry Knowledge**
- **Manufacturing**: Lumber processing workflows
- **Business Logic**: Inventory management, status tracking
- **User Experience**: Mobile-first design, intuitive interfaces

## 🔮 Future Enhancements

### **Phase 1 - Core Features** ✅
- [x] Basic mobile application structure
- [x] Station management system
- [x] Local data storage
- [x] Basic API endpoints

### **Phase 2 - Integration** ✅
- [x] Complete API integration
- [x] Real-time synchronization
- [x] User authentication
- [x] Web dashboard development

### **Phase 3 - Advanced Features** 🚧
- [ ] Advanced reporting and analytics
- [ ] Multi-user support with roles
- [ ] Push notifications
- [ ] Photo documentation
- [ ] Export functionality (PDF, Excel)

### **Phase 4 - Enterprise** 📋
- [ ] Integration with external systems
- [ ] Advanced security features
- [ ] Performance optimization
- [ ] Scalability improvements

## 🤝 Contributing

We welcome contributions! Please see the individual README files in each component for specific contribution guidelines.

**General Process:**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 Brandon Sickler

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the individual component READMEs for specific guidance
- Review the Expo documentation: [docs.expo.dev](https://docs.expo.dev/)

## 👨‍💻 About the Developer

This project was created and is maintained by **Brandon Sickler**.

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-@Brandon--Sickler-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Brandon-Sickler)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Brandon%20Sickler-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/brandonsicklerexpat/)

</div>

*Passionate about building innovative solutions that solve real-world problems in the lumber and manufacturing industries. This project demonstrates modern full-stack development skills and industry-specific knowledge.*

---

<div align="center">

**EnVtory** - *Streamlining lumber processing operations through technology*

</div>