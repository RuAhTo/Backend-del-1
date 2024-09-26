import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import './Auth.css'

export default function SignIn() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [buttonShake, setButtonShake] = useState(false);
    const [formError, setFormError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (event: React.FormEvent) => {
        event.preventDefault();

                // Kontrollera att alla fält är ifyllda
        if (!username || !password || !email) {
            setFormError('Please enter all the fields')
            setButtonShake(true)
            setTimeout(() => setButtonShake(false), 500); // Ta bort animation efter 500ms
            return;
        }

        setFormError('');
        setLoading(true);

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
                navigate('/registered'); // Navigera till huvudsidan
            } else {
                throw new Error('Something went wrong ¯\\_(ツ)_/¯');
            }
        } catch (error) {
            console.log('Error', error);
        } finally{
            setLoading(false)
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
                        onChange={(e) => setUsername(e.target.value)}
                    />
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
            
            <div className="auth-link-container">
                <p>Already a member?</p>
                <Link to="/login">Click here!</Link>
            </div>
        </div>
        </main>
    </>
)

}