import { Link } from "react-router-dom"
import './Auth.css'
import { useEffect, useState } from "react"

export default function Registered() {
    const [scaleIn, setScaleIn] = useState(false);

    useEffect(() => {
        setScaleIn(true);
        const timer = setTimeout(() => {
            setScaleIn(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);


return(
    <>
    <header>
        {/* <h1>Welcome!</h1> */}
    </header>
    <main>
        <div className={`auth-container ${scaleIn ? "scale-in-center" : ""}`}>
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