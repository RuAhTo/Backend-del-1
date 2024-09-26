import { Link } from "react-router-dom"
import './Auth.css'

export default function Registered() {

return(
    <>
    <header>
        {/* <h1>Welcome!</h1> */}
    </header>
    <main>
        <div className="auth-container">
            <h2>Your registration is complete!</h2>

            <div className="auth-link-container">
                <p>Proceed to log in</p>
                <Link to="/login">Click here!</Link>
            </div>
        </div>
        </main>
    </>
)
}