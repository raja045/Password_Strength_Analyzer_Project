# Password Strength Analyzer 🔐

A comprehensive, real-time password strength analyzer built with vanilla HTML, CSS, and JavaScript. This tool helps users create secure passwords by providing instant feedback, strength scoring, and security recommendations based on NIST guidelines and cybersecurity best practices.

![Password Strength Analyzer Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-orange.svg)

## 🚀 Features

### Core Functionality
- **Real-time Password Analysis**: Instant feedback as you type
- **Strength Meter**: Visual progress bar with color-coded strength levels
- **Entropy Calculation**: Mathematical strength assessment using entropy formula
- **Pattern Detection**: Identifies common weak patterns and dictionary words
- **Time-to-Crack Estimation**: Shows estimated time to crack password

### User Interface
- **Password Visibility Toggle**: Show/hide password with eye icon
- **Interactive Checklist**: Real-time requirements validation
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Dark Mode Ready**: Prepared for dark theme implementation

### Security Features
- **NIST Compliance**: Based on latest NIST password guidelines
- **Common Password Detection**: Checks against database of weak passwords
- **Character Set Analysis**: Evaluates use of different character types
- **Length Requirements**: Enforces minimum length recommendations
- **Pattern Recognition**: Detects keyboard patterns and sequences

### Additional Tools
- **Password Generator**: Create strong passwords with customizable options
- **Copy to Clipboard**: Easy password copying functionality
- **Security Tips**: Educational content about password best practices
- **Strength Recommendations**: Specific suggestions for improvement

## 🎯 Password Strength Criteria

The analyzer evaluates passwords based on these criteria:

| Criterion | Requirement | Points |
|-----------|-------------|---------|
| Length | 8+ characters (12+ recommended) | 25% |
| Uppercase Letters | A-Z | 20% |
| Lowercase Letters | a-z | 20% |
| Numbers | 0-9 | 15% |
| Special Characters | !@#$%^&*()_+-=[]{}etc. | 15% |
| No Common Patterns | Avoid dictionary words, sequences | 5% |

### Strength Levels

| Level | Score Range | Color | Security Level |
|-------|-------------|-------|----------------|
| Very Weak | 0-30% | 🔴 Red | Easily cracked in seconds |
| Weak | 31-50% | 🟠 Orange | Could be cracked in minutes |
| Medium | 51-70% | 🟡 Yellow | Moderate security, hours to crack |
| Strong | 71-85% | 🟢 Light Green | Good security, days to crack |
| Very Strong | 86-100% | 🟢 Dark Green | Excellent security, years to crack |

## 🛠️ Technical Implementation

### Entropy Calculation
The strength score is calculated using the entropy formula:

```
E = L × log₂(R)
```

Where:
- **E** = Entropy (bits)
- **L** = Password length
- **R** = Character set size (lowercase + uppercase + digits + symbols)

### Character Set Sizes
- Numbers (0-9): 10 characters
- Lowercase letters (a-z): 26 characters  
- Uppercase letters (A-Z): 26 characters
- Special symbols: 32 characters
- **Total possible**: 94 characters

### Time-to-Crack Estimation
Based on modern hardware capabilities:
- Assumes 1 billion guesses per second
- Calculates expected time to crack (50% probability)
- Formula: `2^(entropy-1) / guesses_per_second`

## 📁 Project Structure

```
password-strength-analyzer/
├── index.html          # Main HTML structure
├── style.css           # Styling and animations
├── app.js              # JavaScript functionality
├── README.md           # Project documentation
└── assets/
    └── icons/          # UI icons and graphics
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely client-side

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/password-strength-analyzer.git
   cd password-strength-analyzer
   ```

2. **Open the application**
   ```bash
   # Option 1: Open directly in browser
   open index.html
   
   # Option 2: Serve locally (optional)
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Start analyzing passwords!**
   - Enter a password in the input field
   - Watch real-time strength feedback
   - Follow recommendations to improve security

## 💻 Usage Examples

### Basic Usage
```html
<!-- Include in your HTML -->
<script src="app.js"></script>
<link rel="stylesheet" href="style.css">

<!-- The analyzer will automatically initialize -->
```

### Customization
```javascript
// Customize strength criteria
const analyzer = new PasswordAnalyzer({
    minLength: 12,
    requiredTypes: ['upper', 'lower', 'number', 'symbol'],
    commonPasswords: customPasswordList
});
```

## 🔧 Configuration Options

### Customizable Settings
```javascript
const config = {
    minLength: 8,              // Minimum password length
    recommendedLength: 12,     // Recommended length
    maxLength: 64,             // Maximum allowed length
    strengthLevels: 5,         // Number of strength levels
    realTimeValidation: true,  // Enable real-time checking
    showEntropy: true,         // Display entropy score
    showTimeToCrack: true      // Show crack time estimation
};
```

## 🎨 Customization

### Styling
The CSS uses CSS custom properties (variables) for easy theming:

```css
:root {
    --primary-color: #4f46e5;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
    --background-color: #ffffff;
    --text-color: #1f2937;
}
```

### Adding New Features
1. **Custom validation rules**: Extend the `validatePassword()` method
2. **New strength criteria**: Modify the `calculateStrength()` function
3. **Additional UI elements**: Update HTML structure and CSS

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 60+ | ✅ Full |
| Firefox | 55+ | ✅ Full |
| Safari | 12+ | ✅ Full |
| Edge | 79+ | ✅ Full |
| IE | 11+ | ⚠️ Limited |

## 📚 Educational Resources

### Password Security Best Practices
1. **Length over complexity**: Longer passwords are generally more secure
2. **Unique passwords**: Use different passwords for each account
3. **Password managers**: Consider using tools like Bitwarden or 1Password
4. **Two-factor authentication**: Add an extra layer of security
5. **Regular updates**: Change passwords if accounts are compromised

### NIST Guidelines Compliance
This tool follows the latest NIST Special Publication 800-63B guidelines:
- Minimum 8 characters (recommends 12+)
- No mandatory periodic changes
- Allow all printable ASCII characters
- Check against common password lists
- Support password managers and copy/paste

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Reporting Issues
- Use GitHub Issues to report bugs
- Include browser version and steps to reproduce
- Provide screenshots if applicable

### Submitting Changes
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test in multiple browsers
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Password Strength Analyzer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Acknowledgments

- **NIST** for password security guidelines
- **Dropbox zxcvbn** for inspiration on password strength algorithms
- **Web security community** for research and best practices
- **Open source contributors** who make projects like this possible

## 📞 Support

- **Documentation**: Check this README and code comments
- **Issues**: [GitHub Issues](https://github.com/yourusername/password-strength-analyzer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/password-strength-analyzer/discussions)
- **Email**: support@passwordanalyzer.com

## 🔄 Version History

### v1.0.0 (2025-01-XX)
- Initial release
- Real-time password analysis
- Entropy calculation
- Modern responsive UI
- Password generator
- Security tips and recommendations

---

## 🚀 Quick Start Guide

1. **Download or clone** this repository
2. **Open `index.html`** in your web browser
3. **Start typing** a password to see real-time feedback
4. **Follow the suggestions** to create a stronger password
5. **Use the generator** if you need help creating passwords

**That's it!** No installation, no setup, no dependencies. Just open and start creating secure passwords.

---

*Made with ❤️ for a more secure internet*