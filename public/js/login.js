document.addEventListener("DOMContentLoaded", function () {
    const email = document.getElementById("email")
    const fname = document.getElementById("fname")
    const lname = document.getElementById("lname")
    const uname = document.getElementById("uname")
    const password = document.getElementById("password")
    const loginForm = document.getElementById("login_form")
    const signupForm = document.getElementById("sign_form")

    // Function to store tokens in localStorage
    const storeTokens = (accessToken, refreshToken) => {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
    };
  
    // Function to check if the user is logged in
    const isLoggedIn = () => {
        const accessToken = localStorage.getItem('access_token');
        return !!accessToken; // Returns true if access token exists, false otherwise
    };
  
    // Function to retrieve access token
    const getAccessToken = () => {
        return localStorage.getItem('access_token');
    };
  
    // Function to retrieve refresh token
    const getRefreshToken = () => {
        return localStorage.getItem('refresh_token');
    };
  
    // Function to clear tokens from storage on logout
    const clearTokens = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    // Function to register a new user
    const registerUser = async (first_name, last_name, username, email, password) => {
        try {
            const response = await fetch('/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ first_name, last_name, username, email, password }),
            });
  
            if (response.ok) {
                console.log('User registered successfully');
                alert("successful")
                window.location.assign("http://localhost:3000/home.html")
            } else {
                console.error('Failed to register user');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };
  
    // Function to obtain access token
    const obtainAccessToken = async (email, password) => {
        try {
            const response = await fetch('/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
  
            if (response.ok) {
                const data = await response.json();
                const { access, refresh } = data;
                console.log('Access Token:', access);
                console.log('Refresh Token:', refresh);
            } else {
                console.error('Failed to obtain access token');
            }
        } catch (error) {
            console.error('Error while obtaining access token:', error);
        }
    };

    // Function to refresh access token using refresh token
    const refreshAccessToken = async (refreshToken) => {
        try {
            const response = await fetch('/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh: refreshToken }),
            });
  
            if (response.ok) {
                const data = await response.json();
                const { access } = data;
                console.log('New Access Token:', access);
            } else {
                console.error('Failed to refresh access token');
            }
        } catch (error) {
            console.error('Error while refreshing access token:', error);
        }
    };

    // Function to perform login
    const loginUser = async (email, password) => {
        try {
            const response = await fetch('/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
  
            if (response.ok) {
                const data = await response.json();
                const { access, refresh } = data;
                // alert(response.status)
  
                // Store tokens in localStorage upon successful login
                storeTokens(access, refresh);
                alert(response.status)
                if (response.status == 200) {
                    // alert(response.body.access)
                    window.location.assign("http://localhost:3000/home.html")
                } else {
                    alert("Sign Up Failed")
                }
            } else {
                console.error('Login failed');
                alert("login failed")
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert(`Error during login" ${error}`)
        }
    };

    // Register a new user
    const register = async (username, email, password) => {
        await registerUser(email, password)
    };

    // Register a new user
    const login = async (username, email, password) => {
        await login(username, email, password)
    };
  
    // Obtain access token upon login
    const fetchAccessToken = async (email, password) => {
        await obtainAccessToken(email, password)
    };
  
    // Refresh access token when it expires
    const fetchRefreshAccessToken = async (refreshToken) => {
        await refreshAccessToken(refreshToken)
    };
    
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        loginUser(
            email.value,
            password.value
        );
    });
});
