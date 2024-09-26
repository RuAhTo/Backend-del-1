import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css'

const LogIn: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate(); // Använd useNavigate för att navigera
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [buttonShake, setButtonShake] = useState(false);
    const [formError, setFormError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
        const timer = setTimeout(() => {
            setFadeIn(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();


        setLoading(true)
        setFormError('');

        const response = await fetch('http://localhost:3000/dnd_todo/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }), // Lägg till användarnamn och lösenord
        });

        try {
            if (response.ok) {
                const data = await response.json();
                login(data.token);
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.id);
                navigate('/');
            } else if (response.status === 401) {
                // Felaktiga inloggningsuppgifter
                setFormError('Incorrect username or password. Please try again.');
            } else if (response.status === 404) {
                // Användare hittades inte
                setFormError('User not found. Please check your credentials or sign up.');
            } else {
                // Allmän felhantering
                setFormError('Something went wrong. Please try again later.');
            }
        } catch (error){
            console.error('Error:', error);
            setFormError('Network error. Please check your connection.');
        } finally{
            setLoading(false);
            setButtonShake(true); // Skaka knappen vid fel
            setTimeout(() => setButtonShake(false), 500);
        }
    };

    return (
        <>
        <header>
            <h1>Welcome Back!</h1>
        </header>
        <main>
            <div className={`auth-container ${fadeIn ? 'fade-in': ''}`}>
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
                        <label htmlFor="password">Password</label>
                        <input
                            type={showPassword ? "text" : "password"} // Dynamiskt byt mellan 'text' och 'password'
                            name="password"
                            id="passwordInput"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* Se lösenord-knapp */}
                        <div className="show-password-container">
                            <input 
                            type="checkbox"
                            className="show-password-btn"
                            onClick={() => setShowPassword(!showPassword)}
                            />
                            <label htmlFor="">Show password</label>
                        </div>
                    </div>
                    <div className="auth-btn-container">
                        <button
                            type="submit"
                            disabled={loading}
                            className={buttonShake ? 'shake-horizontal' : ''}
                        >
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                    <p>{formError}</p>
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
