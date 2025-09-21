# Contributing to Lumber Tracker Mobile

Thank you for your interest in contributing to the Lumber Tracker Mobile project! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

We welcome contributions from the community! Whether you're fixing bugs, adding features, improving documentation, or suggesting ideas, your help is appreciated.

### Types of Contributions

- 🐛 **Bug Reports**: Found a bug? Let us know!
- ✨ **Feature Requests**: Have an idea for a new feature?
- 🔧 **Code Contributions**: Fix bugs or implement new features
- 📚 **Documentation**: Improve README, code comments, or guides
- 🧪 **Testing**: Add tests or help improve test coverage
- 🎨 **UI/UX**: Improve the user interface and experience

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Git
- A code editor (VS Code recommended)

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/lumber-tracker-mobile.git
   cd lumber-tracker-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

## 📋 Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the project's ESLint configuration
- **Prettier**: Code formatting is handled automatically
- **Naming**: Use descriptive variable and function names
- **Comments**: Add comments for complex logic

### File Structure

```
app/                    # Main application screens
├── (tabs)/            # Tab navigation screens
├── stations/          # Processing station screens
└── modal.tsx          # Modal components

src/
├── components/        # Reusable UI components
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── navigation/       # Navigation configuration
├── screens/          # Additional screens
├── styles/           # Global styles and themes
└── types/            # TypeScript type definitions
```

### Component Guidelines

- Use functional components with hooks
- Follow React Native best practices
- Use React Native Paper components when possible
- Implement proper error handling
- Add TypeScript types for all props and state

### State Management

- Use React Context for global state
- Keep local state minimal and focused
- Follow the existing context patterns in `src/context/`

## 🧪 Testing

### Running Tests

```bash
npm test
```

### Writing Tests

- Add tests for new components and functions
- Use Jest and React Native Testing Library
- Aim for meaningful test coverage
- Test both happy paths and edge cases

## 📝 Commit Guidelines

### Commit Message Format

Use clear, descriptive commit messages:

```
type(scope): brief description

Detailed explanation of what was changed and why.
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(stations): add barcode scanning to green lumber station

fix(inventory): resolve data persistence issue with AsyncStorage

docs(readme): update installation instructions
```

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test-related changes

## 🔄 Pull Request Process

### Before Submitting

1. **Test your changes**
   ```bash
   npm test
   npm run lint
   ```

2. **Test on multiple platforms**
   - Test on iOS simulator/device
   - Test on Android emulator/device
   - Test on web (if applicable)

3. **Update documentation**
   - Update README if needed
   - Add/update code comments
   - Update type definitions

4. **Check your changes**
   - Ensure no console errors
   - Verify UI looks correct
   - Test all related functionality

### Submitting a Pull Request

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request**
   - Use the GitHub PR template
   - Provide a clear title and description
   - Link any related issues
   - Add screenshots for UI changes

3. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Documentation update
   - [ ] Refactoring
   - [ ] Other (please describe)

   ## Testing
   - [ ] Tests pass locally
   - [ ] Tested on iOS
   - [ ] Tested on Android
   - [ ] Tested on Web

   ## Screenshots (if applicable)
   Add screenshots for UI changes

   ## Checklist
   - [ ] Code follows project style guidelines
   - [ ] Self-review completed
   - [ ] Documentation updated
   - [ ] No breaking changes
   ```

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Environment Information**
   - OS (Windows, macOS, Linux)
   - Node.js version
   - Expo CLI version
   - Device/emulator details

2. **Steps to Reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior
   - Screenshots or videos if helpful

3. **Error Messages**
   - Full error logs
   - Console output
   - Stack traces

### Feature Requests

For feature requests, please include:

- Clear description of the feature
- Use case and motivation
- Potential implementation ideas
- Any relevant examples or references

## 🏗️ Project-Specific Guidelines

### Lumber Industry Context

- Understand the lumber processing workflow
- Consider real-world usage scenarios
- Maintain data accuracy and integrity
- Think about scalability for different mill sizes

### Mobile-First Design

- Optimize for mobile devices
- Consider offline functionality
- Ensure good performance on lower-end devices
- Test with different screen sizes

### Data Management

- Follow existing data models in `src/context/`
- Ensure proper data validation
- Consider data persistence and synchronization
- Maintain data consistency across stations

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **LinkedIn**: Connect with [Brandon Sickler](https://www.linkedin.com/in/brandonsicklerexpat/)

## 🎯 Areas Needing Contribution

We especially welcome contributions in these areas:

- [ ] **Testing**: Increase test coverage
- [ ] **Performance**: Optimize app performance
- [ ] **Accessibility**: Improve accessibility features
- [ ] **Documentation**: Improve code documentation
- [ ] **UI/UX**: Enhance user experience
- [ ] **Offline Support**: Improve offline functionality
- [ ] **Data Export**: Add export capabilities
- [ ] **Analytics**: Add usage analytics

## 📄 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of background, experience level, gender identity, race, ethnicity, religion, or other characteristics.

### Expected Behavior

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or inflammatory comments
- Personal attacks or political discussions
- Spam or off-topic discussions

## 📜 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to the Lumber Tracker Mobile project! 🚀
