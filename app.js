// Password Strength Analyzer JavaScript

class PasswordAnalyzer {
    constructor() {
        this.initializeData();
        this.initializeElements();
        this.bindEvents();
        this.initializeTips();
    }

    initializeData() {
        this.commonPasswords = [
            "password", "123456", "password123", "admin", "qwerty", "letmein", "welcome", "monkey", "dragon", "pass", "master", "hello", "freedom", "whatever", "qazwsx", "trustno1", "jordan", "harley", "1234567890", "987654321", "superman", "batman", "michael", "jennifer", "shadow", "123abc", "abc123", "password1", "sunshine", "princess", "charlie", "rockyou", "12345678", "donald", "login", "master123"
        ];

        this.strengthLevels = [
            {min: 0, max: 30, label: "Very Weak", color: "#ff4444", description: "Easily cracked in seconds"},
            {min: 31, max: 50, label: "Weak", color: "#ff8800", description: "Could be cracked in minutes"},
            {min: 51, max: 70, label: "Medium", color: "#ffaa00", description: "Moderate security, could take hours"},
            {min: 71, max: 85, label: "Strong", color: "#88cc00", description: "Good security, could take days"},
            {min: 86, max: 100, label: "Very Strong", color: "#44aa44", description: "Excellent security, could take years"}
        ];

        this.passwordTips = [
            "Use at least 12-16 characters for optimal security",
            "Mix uppercase, lowercase, numbers, and symbols",
            "Avoid common words, names, or dictionary terms",
            "Don't use personal information like birthdays or names",
            "Consider using passphrases with random words",
            "Use a unique password for each account",
            "Consider using a password manager",
            "Avoid keyboard patterns like 'qwerty' or '123456'",
            "Don't reuse passwords across multiple sites",
            "Update passwords regularly, especially after breaches"
        ];

        this.characterSets = {
            lowercase: "abcdefghijklmnopqrstuvwxyz",
            uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            numbers: "0123456789",
            symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?/~`"
        };
    }

    initializeElements() {
        // Get all DOM elements
        this.passwordInput = document.getElementById('password');
        this.toggleVisibilityBtn = document.getElementById('toggleVisibility');
        this.generateBtn = document.getElementById('generateBtn');
        this.copyBtn = document.getElementById('copyBtn');
        this.clearBtn = document.getElementById('clearBtn');
        
        this.strengthText = document.getElementById('strengthText');
        this.strengthScore = document.getElementById('strengthScore');
        this.progressFill = document.getElementById('progressFill');
        
        this.lengthCount = document.getElementById('lengthCount');
        this.entropyValue = document.getElementById('entropyValue');
        this.crackTime = document.getElementById('crackTime');
        
        this.requirements = {
            length: document.getElementById('req-length'),
            uppercase: document.getElementById('req-uppercase'),
            lowercase: document.getElementById('req-lowercase'),
            numbers: document.getElementById('req-numbers'),
            symbols: document.getElementById('req-symbols'),
            common: document.getElementById('req-common')
        };
        
        this.lengthSlider = document.getElementById('lengthSlider');
        this.lengthDisplay = document.getElementById('lengthDisplay');
        this.includeUppercase = document.getElementById('includeUppercase');
        this.includeLowercase = document.getElementById('includeLowercase');
        this.includeNumbers = document.getElementById('includeNumbers');
        this.includeSymbols = document.getElementById('includeSymbols');
        
        this.tipsToggle = document.getElementById('tipsToggle');
        this.tipsContent = document.getElementById('tipsContent');
    }

    bindEvents() {
        // Password input events
        if (this.passwordInput) {
            this.passwordInput.addEventListener('input', (e) => {
                e.preventDefault();
                this.analyzePassword();
            });
            
            this.passwordInput.addEventListener('keyup', (e) => {
                this.analyzePassword();
            });
            
            this.passwordInput.addEventListener('paste', (e) => {
                setTimeout(() => this.analyzePassword(), 10);
            });
        }
        
        // Button events
        if (this.toggleVisibilityBtn) {
            this.toggleVisibilityBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.togglePasswordVisibility();
            });
        }
        
        if (this.generateBtn) {
            this.generateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.generatePassword();
            });
        }
        
        if (this.copyBtn) {
            this.copyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.copyPassword();
            });
        }
        
        if (this.clearBtn) {
            this.clearBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearPassword();
            });
        }
        
        // Slider event
        if (this.lengthSlider) {
            this.lengthSlider.addEventListener('input', (e) => {
                this.lengthDisplay.textContent = this.lengthSlider.value;
            });
        }
        
        // Tips toggle
        if (this.tipsToggle) {
            this.tipsToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTips();
            });
        }
    }

    initializeTips() {
        const tipsList = document.getElementById('tipsList');
        if (tipsList) {
            this.passwordTips.forEach(tip => {
                const li = document.createElement('li');
                li.textContent = tip;
                tipsList.appendChild(li);
            });
        }
    }

    analyzePassword() {
        const password = this.passwordInput.value;
        const analysis = this.getPasswordAnalysis(password);
        
        this.updateUI(analysis);
        this.updateRequirements(analysis);
        
        // Enable/disable copy button
        if (this.copyBtn) {
            this.copyBtn.disabled = password.length === 0;
        }
    }

    getPasswordAnalysis(password) {
        if (!password) {
            return {
                score: 0,
                strength: this.strengthLevels[0],
                entropy: 0,
                crackTime: 'Instantly',
                requirements: {
                    length: false,
                    uppercase: false,
                    lowercase: false,
                    numbers: false,
                    symbols: false,
                    common: true
                }
            };
        }

        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            numbers: /\d/.test(password),
            symbols: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?/~`]/.test(password),
            common: !this.isCommonPassword(password)
        };

        const entropy = this.calculateEntropy(password);
        const score = this.calculateScore(password, requirements, entropy);
        const strength = this.getStrengthLevel(score);
        const crackTime = this.estimateCrackTime(entropy);

        return {
            score,
            strength,
            entropy,
            crackTime,
            requirements
        };
    }

    calculateEntropy(password) {
        if (!password) return 0;

        let charsetSize = 0;
        if (/[a-z]/.test(password)) charsetSize += 26;
        if (/[A-Z]/.test(password)) charsetSize += 26;
        if (/\d/.test(password)) charsetSize += 10;
        if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?/~`]/.test(password)) charsetSize += 32;

        if (charsetSize === 0) return 0;
        return password.length * Math.log2(charsetSize);
    }

    calculateScore(password, requirements, entropy) {
        if (!password) return 0;

        let score = 0;

        // Base score from entropy
        score += Math.min(entropy / 2, 40);

        // Length bonus
        if (password.length >= 8) score += 10;
        if (password.length >= 12) score += 10;
        if (password.length >= 16) score += 10;

        // Character type bonuses
        if (requirements.uppercase) score += 5;
        if (requirements.lowercase) score += 5;
        if (requirements.numbers) score += 5;
        if (requirements.symbols) score += 10;

        // Common password penalty
        if (!requirements.common) score -= 25;

        // Pattern penalties
        if (this.hasRepeatingCharacters(password)) score -= 10;
        if (this.hasSequentialCharacters(password)) score -= 10;
        if (this.hasKeyboardPatterns(password)) score -= 15;

        return Math.max(0, Math.min(100, Math.round(score)));
    }

    isCommonPassword(password) {
        const lower = password.toLowerCase();
        return this.commonPasswords.some(common => 
            lower.includes(common) || common.includes(lower)
        );
    }

    hasRepeatingCharacters(password) {
        return /(.)\1{2,}/.test(password);
    }

    hasSequentialCharacters(password) {
        const sequences = ['012', '123', '234', '345', '456', '567', '678', '789', 'abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk', 'jkl', 'klm', 'lmn', 'mno', 'nop', 'opq', 'pqr', 'qrs', 'rst', 'stu', 'tuv', 'uvw', 'vwx', 'wxy', 'xyz'];
        const lower = password.toLowerCase();
        return sequences.some(seq => lower.includes(seq) || lower.includes(seq.split('').reverse().join('')));
    }

    hasKeyboardPatterns(password) {
        const patterns = ['qwerty', 'asdfgh', 'zxcvbn', '1234567890'];
        const lower = password.toLowerCase();
        return patterns.some(pattern => lower.includes(pattern));
    }

    getStrengthLevel(score) {
        return this.strengthLevels.find(level => score >= level.min && score <= level.max) || this.strengthLevels[0];
    }

    estimateCrackTime(entropy) {
        if (entropy <= 0) return 'Instantly';
        
        // Assume 1 billion guesses per second
        const guessesPerSecond = 1e9;
        const totalCombinations = Math.pow(2, entropy);
        const averageGuesses = totalCombinations / 2;
        const seconds = averageGuesses / guessesPerSecond;
        
        if (seconds < 1) return 'Instantly';
        if (seconds < 60) return `${Math.round(seconds)} seconds`;
        if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
        if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
        if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
        if (seconds < 31536000000) return `${Math.round(seconds / 31536000)} years`;
        return `${Math.round(seconds / 31536000000)} centuries`;
    }

    updateUI(analysis) {
        const { score, strength, entropy, crackTime } = analysis;
        const password = this.passwordInput.value;
        
        // Update stats
        if (this.lengthCount) this.lengthCount.textContent = password.length;
        if (this.entropyValue) this.entropyValue.textContent = `${Math.round(entropy)} bits`;
        if (this.crackTime) this.crackTime.textContent = crackTime;
        
        // Update strength display
        if (this.strengthText) {
            this.strengthText.textContent = password ? strength.label : 'Enter a password';
        }
        if (this.strengthScore) {
            this.strengthScore.textContent = `${score}%`;
        }
        
        // Update progress bar
        if (this.progressFill) {
            this.progressFill.style.width = `${score}%`;
            this.progressFill.style.backgroundColor = strength.color;
        }
    }

    updateRequirements(analysis) {
        const { requirements } = analysis;
        
        Object.keys(requirements).forEach(key => {
            const element = this.requirements[key];
            if (element) {
                const isMet = requirements[key];
                const icon = element.querySelector('.requirement__icon');
                
                if (isMet) {
                    element.classList.add('met');
                } else {
                    element.classList.remove('met');
                }
                
                if (icon) {
                    icon.textContent = isMet ? '✓' : '✗';
                }
            }
        });
    }

    togglePasswordVisibility() {
        if (!this.passwordInput) return;
        
        const isPassword = this.passwordInput.type === 'password';
        this.passwordInput.type = isPassword ? 'text' : 'password';
        
        const eyeIcon = this.toggleVisibilityBtn.querySelector('.icon-eye');
        const eyeOffIcon = this.toggleVisibilityBtn.querySelector('.icon-eye-off');
        
        if (eyeIcon && eyeOffIcon) {
            if (isPassword) {
                eyeIcon.classList.add('hidden');
                eyeOffIcon.classList.remove('hidden');
            } else {
                eyeIcon.classList.remove('hidden');
                eyeOffIcon.classList.add('hidden');
            }
        }
    }

    generatePassword() {
        const length = parseInt(this.lengthSlider.value) || 16;
        let charset = '';
        
        if (this.includeLowercase.checked) charset += this.characterSets.lowercase;
        if (this.includeUppercase.checked) charset += this.characterSets.uppercase;
        if (this.includeNumbers.checked) charset += this.characterSets.numbers;
        if (this.includeSymbols.checked) charset += this.characterSets.symbols;
        
        if (!charset) {
            alert('Please select at least one character type for password generation.');
            return;
        }
        
        let password = '';
        
        // Ensure at least one character from each selected type
        if (this.includeLowercase.checked) {
            password += this.getRandomChar(this.characterSets.lowercase);
        }
        if (this.includeUppercase.checked) {
            password += this.getRandomChar(this.characterSets.uppercase);
        }
        if (this.includeNumbers.checked) {
            password += this.getRandomChar(this.characterSets.numbers);
        }
        if (this.includeSymbols.checked) {
            password += this.getRandomChar(this.characterSets.symbols);
        }
        
        // Fill the rest randomly
        for (let i = password.length; i < length; i++) {
            password += this.getRandomChar(charset);
        }
        
        // Shuffle the password
        password = this.shuffleString(password);
        
        if (this.passwordInput) {
            this.passwordInput.value = password;
            this.analyzePassword();
        }
        
        // Visual feedback
        if (this.generateBtn) {
            this.generateBtn.style.backgroundColor = '#44aa44';
            setTimeout(() => {
                this.generateBtn.style.backgroundColor = '';
            }, 300);
        }
    }

    getRandomChar(charset) {
        return charset[Math.floor(Math.random() * charset.length)];
    }

    shuffleString(str) {
        const array = str.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }

    copyPassword() {
        const password = this.passwordInput.value;
        if (!password) return;
        
        // Create a temporary textarea to copy from
        const textarea = document.createElement('textarea');
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            
            if (this.copyBtn) {
                const originalText = this.copyBtn.textContent;
                this.copyBtn.textContent = 'Copied!';
                this.copyBtn.style.backgroundColor = '#44aa44';
                this.copyBtn.style.color = 'white';
                
                setTimeout(() => {
                    this.copyBtn.textContent = originalText;
                    this.copyBtn.style.backgroundColor = '';
                    this.copyBtn.style.color = '';
                }, 2000);
            }
        } catch (err) {
            console.error('Copy failed:', err);
        } finally {
            document.body.removeChild(textarea);
        }
    }

    clearPassword() {
        if (this.passwordInput) {
            this.passwordInput.value = '';
            this.analyzePassword();
            this.passwordInput.focus();
        }
    }

    toggleTips() {
        if (!this.tipsContent || !this.tipsToggle) return;
        
        const isHidden = this.tipsContent.classList.contains('hidden');
        
        if (isHidden) {
            this.tipsContent.classList.remove('hidden');
            this.tipsToggle.classList.add('active');
        } else {
            this.tipsContent.classList.add('hidden');
            this.tipsToggle.classList.remove('active');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    try {
        new PasswordAnalyzer();
        console.log('Password Analyzer initialized successfully');
    } catch (error) {
        console.error('Error initializing Password Analyzer:', error);
    }
});