import { useState } from "react"
import { useNavigate } from "react-router-dom"

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
        <h4>Log in or create a new account.</h4>
    </header>
    <main>
        <div className="sign-in-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
            <label htmlFor="username">Username</label>
            <input 
                value={username}
                type="text" 
                name="username" 
                id="usernameInput" 
                placeholder="Enter a username.."
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                name="password" 
                id="passwordInput" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />
            <label htmlFor="email">Email</label>
            <input 
                type="email" 
                name="email" 
                id="emailInput" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="sign-in-btn-container">
                <button type="submit">Submit</button>
            </div>
            </form>
        </div>
        </main>
    </>
)

}