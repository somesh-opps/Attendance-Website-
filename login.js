document.addEventListener('DOMContentLoaded', () => {
    const studentIdInput = document.getElementById('student-id');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('button.bg-primary');
    const togglePasswordButton = document.querySelector('button span[data-icon="visibility"]').parentElement;

    // Toggle Password Visibility
    togglePasswordButton.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const iconSpan = togglePasswordButton.querySelector('span');
        iconSpan.textContent = type === 'password' ? 'visibility' : 'visibility_off';
    });

    // Mock Login API Call
    async function loginUser(credentials) {
        // Replace this with your actual API call
        // const response = await fetch('/api/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(credentials)
        // });
        // return await response.json();

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success
                if (credentials.studentId && credentials.password) {
                     resolve({ success: true, token: 'mock-jwt-token', user: { name: 'Student' } });
                } else {
                     reject({ success: false, message: 'Invalid credentials' });
                }
            }, 1000);
        });
    }

    // Login Button Click Handler
    loginButton.addEventListener('click', async (e) => {
        e.preventDefault();

        // Basic Validation
        if (!studentIdInput.value.trim()) {
            alert('Please enter your Student ID.');
            return;
        }
        if (!passwordInput.value) {
            alert('Please enter your password.');
            return;
        }

        try {
            // Show loading state
            const originalText = loginButton.textContent;
            loginButton.disabled = true;
            loginButton.textContent = 'Logging in...';

            const response = await loginUser({ 
                studentId: studentIdInput.value, 
                password: passwordInput.value 
            });

            if (response.success) {
                console.log('Login successful:', response);
                // Store token if needed
                // localStorage.setItem('token', response.token);
                window.location.href = 'student_home.html';
            } else {
                alert(response.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login.');
        } finally {
            loginButton.disabled = false;
            loginButton.textContent = 'Log In';
        }
    });
});
