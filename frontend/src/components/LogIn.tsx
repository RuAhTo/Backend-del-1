import React, { useState } from 'react';
import { useAuth } from './auth/AuthProvider';
import { useNavigate } from 'react-router-dom';

const LogIn: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate(); // Använd useNavigate för att navigera
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), // Lägg till användarnamn och lösenord
        });

        if (response.ok) {
            const data = await response.json();
            login(data.token);
            navigate('/'); // Navigera till huvudsidan
        }
    };

    return (
        <>
            <div className="sign-in-container">
                <h2>Log In</h2>
                <form onSubmit={handleLogin}>
                    <label>Username</label>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter a username.." 
                    />
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password" 
                    />
                    <div className="sign-in-btn-container">
                        <button type="submit">Log In</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LogIn;
