document.addEventListener('DOMContentLoaded', () => {
    const fullNameInput = document.getElementById('full-name');
    const userIdInput = document.getElementById('user-id');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const roleSelect = document.getElementById('role');
    const registerButton = document.querySelector('button.bg-primary'); // Selecting by class since ID is missing
    const togglePasswordButton = document.querySelector('button span[data-icon="visibility"]').parentElement;

    // Toggle Password Visibility
    togglePasswordButton.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const iconSpan = togglePasswordButton.querySelector('span');
        iconSpan.textContent = type === 'password' ? 'visibility' : 'visibility_off';
    });

    // Mock Registration API Call
    async function registerUser(userData) {
        // Replace this with your actual API call
        // const response = await fetch('/api/register', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(userData)
        // });
        // return await response.json();

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success
                resolve({ success: true, message: 'Account created successfully' });
                // Simulate error: reject({ success: false, message: 'Email already exists' });
            }, 1000);
        });
    }

    // Register Button Click Handler
    registerButton.addEventListener('click', async (e) => {
        e.preventDefault(); // Prevent default form submission if it was inside a form tag

        // Basic Validation
        if (!fullNameInput.value.trim()) {
            alert('Please enter your full name.');
            return;
        }
        if (!userIdInput.value.trim()) {
            alert('Please enter your ID.');
            return;
        }
        if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
            alert('Please enter a valid email address.');
            return;
        }
        if (!passwordInput.value) {
            alert('Please enter a password.');
            return;
        }
        if (roleSelect.value === 'Select your role') {
            alert('Please select a role.');
            return;
        }

        const userData = {
            fullName: fullNameInput.value,
            userId: userIdInput.value,
            email: emailInput.value,
            role: roleSelect.value,
            password: passwordInput.value
        };

        try {
            // Show loading state
            const originalText = registerButton.textContent;
            registerButton.disabled = true;
            registerButton.textContent = 'Creating Account...';

            const response = await registerUser(userData);

            if (response.success) {
                console.log('Registration successful:', response);
                window.location.href = 'student_home.html';
            } else {
                alert(response.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('An error occurred during registration.');
        } finally {
            registerButton.disabled = false;
            registerButton.textContent = 'Create Account';
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
