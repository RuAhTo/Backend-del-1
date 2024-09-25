import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import './Auth.css'

export default function SignIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate(); // Använd useNavigate för att navigera

    const handleSignup = async (event: React.FormEvent) => {

        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/dnd_todo/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                }),
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log('response ok', data);
                alert(`User ${data.username} created`);
                navigate('/login'); // Navigera till huvudsidan
            } else {
                throw new Error('Something went wrong ¯\\_(ツ)_/¯');
            }
        } catch (error) {
            console.log('Error', error);
        }
}
    
        

return(
    <>
    <header>
        <h1>Welcome!</h1>
    </header>
    <main>
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form className="auth-form-container" onSubmit={handleSignup}>
                <div className="username-container input-container">
                    <label htmlFor="username">Username</label>
                    <input 
                        value={username}
                        type="text" 
                        name="username" 
                        id="usernameInput" 
                        placeholder="Enter a username.."
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="password-container input-container">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="passwordInput" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div className="email-container input-container">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="emailInput" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="auth-btn-container">
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div className="auth-link-container">
                <p>Already a member?</p>
                <Link to="/login">Click here!</Link>
            </div>
        </div>
        </main>
    </>
)

}