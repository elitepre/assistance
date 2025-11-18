 // DOM Elements
        const heroSection = document.getElementById('heroSection');
        const featuresSection = document.getElementById('featuresSection');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        const dashboard = document.getElementById('dashboard');
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const showLogin = document.getElementById('showLogin');
        const showSignup = document.getElementById('showSignup');
        const logoutLink = document.getElementById('logoutLink');
        const homeLink = document.getElementById('homeLink');
        const aboutLink = document.getElementById('aboutLink');
        const faqLink = document.getElementById('faqLink');
        const contactLink = document.getElementById('contactLink');
        const loginFormElement = document.getElementById('loginFormElement');
        const signupFormElement = document.getElementById('signupFormElement');
        const withdrawalFormElement = document.getElementById('withdrawalFormElement');
        const initiateWithdrawal = document.getElementById('initiateWithdrawal');
        const withdrawalForm = document.getElementById('withdrawalForm');
        const withdrawalReceipt = document.getElementById('withdrawalReceipt');
        const greetingText = document.getElementById('greetingText');
        const dateTime = document.getElementById('dateTime');
        const printReceipt = document.getElementById('printReceipt');
        const newWithdrawal = document.getElementById('newWithdrawal');
        const statusText = document.getElementById('statusText');
        const statusDetails = document.getElementById('statusDetails');

        // Show login form
        loginBtn.addEventListener('click', () => {
            heroSection.classList.add('hidden');
            featuresSection.classList.add('hidden');
            signupForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            dashboard.classList.add('hidden');
            document.querySelector('.footer').classList.add('hidden');
        });

        // Show signup form
        signupBtn.addEventListener('click', () => {
            heroSection.classList.add('hidden');
            featuresSection.classList.add('hidden');
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
            dashboard.classList.add('hidden');
            document.querySelector('.footer').classList.add('hidden');
        });

        // Show login from signup
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            signupForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        });

        // Show signup from login
        showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
        });

        // Show home section
        homeLink.addEventListener('click', (e) => {
            e.preventDefault();
            heroSection.classList.remove('hidden');
            featuresSection.classList.remove('hidden');
            loginForm.classList.add('hidden');
            signupForm.classList.add('hidden');
            dashboard.classList.add('hidden');
            document.querySelector('.footer').classList.remove('hidden');
            logoutLink.style.display = 'none';
        });

        // Show FAQ section
        faqLink.addEventListener('click', (e) => {
            e.preventDefault();
            // If user is logged in, show dashboard with FAQ, otherwise show home with FAQ
            if (dashboard.classList.contains('hidden')) {
                heroSection.classList.remove('hidden');
                featuresSection.classList.remove('hidden');
                loginForm.classList.add('hidden');
                signupForm.classList.add('hidden');
                dashboard.classList.add('hidden');
                document.querySelector('.footer').classList.remove('hidden');
            }
            
            // Scroll to FAQ section
            document.querySelector('.faq-section').scrollIntoView({ behavior: 'smooth' });
        });

        // Initialize withdrawal form
        initiateWithdrawal.addEventListener('click', () => {
            withdrawalForm.style.display = 'block';
            initiateWithdrawal.style.display = 'none';
        });

        // Toggle bars functionality
        document.querySelectorAll('.toggle-bar').forEach(bar => {
            bar.addEventListener('click', () => {
                const content = bar.nextElementSibling;
                const icon = bar.querySelector('i');
                
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                } else {
                    content.style.display = 'block';
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            });
        });

        // Update greeting and time
        function updateGreeting() {
            const now = new Date();
            const hours = now.getHours();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/New_York'
            };
            
            const timeString = now.toLocaleDateString('en-US', options);
            dateTime.textContent = timeString;
            
            let greeting = 'Good ';
            if (hours < 12) {
                greeting += 'Morning';
            } else if (hours < 18) {
                greeting += 'Afternoon';
            } else {
                greeting += 'Evening';
            }
            
            // Get user's name from localStorage if available
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                greeting += `, ${currentUser.name}`;
            } else {
                greeting += ', User';
            }
            
            greetingText.textContent = greeting;
        }

        // Update time every minute
        setInterval(updateGreeting, 60000);
        updateGreeting();

        // Generate random transaction ID
        function generateTransactionId() {
            const prefix = 'EARTH';
            const year = new Date().getFullYear();
            const randomNum = Math.floor(100000 + Math.random() * 900000);
            return `${prefix}-${year}-${randomNum}`;
        }

        // Signup form submission
        signupFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const pin = document.getElementById('signupPin').value;
            
            // Basic validation
            if (pin.length !== 4 || !/^\d+$/.test(pin)) {
                document.getElementById('signupError').textContent = 'PIN must be exactly 4 digits';
                document.getElementById('signupError').style.display = 'block';
                document.getElementById('signupSuccess').style.display = 'none';
                return;
            }
            
            // Save user to localStorage
            const user = {
                name,
                email,
                password,
                pin,
                balance: 50000
            };
            
            // Get existing users or initialize empty array
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Check if user already exists
            const existingUser = users.find(u => u.email === email);
            if (existingUser) {
                document.getElementById('signupError').textContent = 'User with this email already exists';
                document.getElementById('signupError').style.display = 'block';
                document.getElementById('signupSuccess').style.display = 'none';
                return;
            }
            
            // Add new user and save
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Show success message
            document.getElementById('signupSuccess').textContent = 'Account created successfully! You can now login.';
            document.getElementById('signupSuccess').style.display = 'block';
            document.getElementById('signupError').style.display = 'none';
            
            // Clear form
            signupFormElement.reset();
            
            // Show login form after 2 seconds
            setTimeout(() => {
                signupForm.classList.add('hidden');
                loginForm.classList.remove('hidden');
                document.getElementById('signupSuccess').style.display = 'none';
            }, 2000);
        });

        // Login form submission
        loginFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Find user with matching credentials
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Set current user
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Show dashboard
                heroSection.classList.add('hidden');
                featuresSection.classList.add('hidden');
                loginForm.classList.add('hidden');
                signupForm.classList.add('hidden');
                dashboard.classList.remove('hidden');
                document.querySelector('.footer').classList.remove('hidden');
                logoutLink.style.display = 'block';
                
                // Update greeting with user's name
                updateGreeting();
                
                // Clear form
                loginFormElement.reset();
                document.getElementById('loginError').style.display = 'none';
            } else {
                document.getElementById('loginError').textContent = 'Invalid email or password';
                document.getElementById('loginError').style.display = 'block';
            }
        });

        // Withdrawal form submission
        withdrawalFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const pin = document.getElementById('securityPin').value;
            const withdrawalAmount = document.getElementById('withdrawalAmount').value;
            
            // Get current user
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            const users = JSON.parse(localStorage.getItem('users'));
            
            // Find current user in users array
            const userIndex = users.findIndex(u => u.email === currentUser.email);
            
            if (userIndex !== -1) {
                // Check if PIN is correct
                if (users[userIndex].pin !== pin) {
                    document.getElementById('withdrawalError').textContent = 'Incorrect PIN. Please try again.';
                    document.getElementById('withdrawalError').style.display = 'block';
                    return;
                }
                
                // Check if withdrawal amount is valid
                if (withdrawalAmount <= 0 || withdrawalAmount > 50000) {
                    document.getElementById('withdrawalError').textContent = 'Invalid withdrawal amount. Please enter an amount between $1 and $50,000.';
                    document.getElementById('withdrawalError').style.display = 'block';
                    return;
                }
                
                // Show receipt and hide form
                withdrawalForm.style.display = 'none';
                withdrawalReceipt.style.display = 'block';
                document.getElementById('withdrawalError').style.display = 'none';
            }
        });

        // Print receipt
        printReceipt.addEventListener('click', () => {
            window.print();
        });

        // New withdrawal
        newWithdrawal.addEventListener('click', () => {
            withdrawalReceipt.style.display = 'none';
            withdrawalForm.style.display = 'block';
            withdrawalFormElement.reset();
            initiateWithdrawal.style.display = 'block';
        });

        // Status toggle
        statusText.addEventListener('click', () => {
            if (statusDetails.style.display === 'block') {
                statusDetails.style.display = 'none';
                statusText.innerHTML = 'PENDING <i class="fas fa-chevron-down"></i>';
            } else {
                statusDetails.style.display = 'block';
                statusText.innerHTML = 'PENDING <i class="fas fa-chevron-up"></i>';
            }
        });

        // Logout functionality
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            heroSection.classList.remove('hidden');
            featuresSection.classList.remove('hidden');
            dashboard.classList.add('hidden');
            logoutLink.style.display = 'none';
        });

        // Check if user is already logged in
        window.addEventListener('DOMContentLoaded', () => {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                heroSection.classList.add('hidden');
                featuresSection.classList.add('hidden');
                dashboard.classList.remove('hidden');
                logoutLink.style.display = 'block';
                updateGreeting();
            }
        });