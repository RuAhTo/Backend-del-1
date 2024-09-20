export default function LogIn(){
    return(
        <>
        <div className="sign-in-container">
            <h2>Log In</h2>
            <label>Username</label>
            <input type="text" name="username" id="usernameInput" placeholder="Enter a username.." />
            <label>Password</label>
            <input type="password" name="password" id="passwordInput" placeholder="Password" />
            <div className="sign-in-btn-container">
                <button type="submit">Log In</button>
            </div>
        </div>
    </>
    )
}