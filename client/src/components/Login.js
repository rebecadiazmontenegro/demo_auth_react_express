import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (token) {
            localStorage.setItem('access_token', token);
            navigate('/'); // Redirect to the home page or dashboard
        }
    }, [navigate]);

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/google';
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Login</h1>
            <button onClick={handleGoogleLogin} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                Login with Google
            </button>
        </div>
    );
};

export default Login;