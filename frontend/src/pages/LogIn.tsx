import React, { useState } from 'react';
import { useAuth } from '../components/auth/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css'

const LogIn: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate(); // Använd useNavigate för att navigera
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch('http://localhost:3000/dnd_todo/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), // Lägg till användarnamn och lösenord
        });

        if (response.ok) {
            const data = await response.json();
            login(data.token);
            localStorage.setItem('token', data.token); // Spara token i localStorage
            localStorage.setItem('userId', data.id); // Spara användarens ID separat
            navigate('/'); // Navigera till huvudsidan
        }
    };

    return (
        <>
        <header>
            <h1>Welcome Back!</h1>
        </header>
        <main>
            <div className="auth-container">
                <h2>Log In</h2>
                <form className='auth-form-container' onSubmit={handleLogin}>
                        <div className="username-container input-container">
                            {/* <label>Username</label> */}
                            <label htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="password-container input-container">
                            <label>Password</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="auth-btn-container" tabIndex={2}>
                            <button type="submit">Log In</button>
                        </div>
                </form>
            <div className='auth-link-container'>
                <p>Not a member?</p>
                <Link to="/signup">Click here!</Link>
            </div>
            </div>
        </main>
        </>
    );
};

export default LogIn;
