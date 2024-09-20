

export default function SignIn() {

return(
    <>
        <div className="sign-in-container">
            <h2>Sign Up</h2>
            <label>Username</label>
            <input type="text" name="username" id="usernameInput" placeholder="Enter a username.." />
            <label>Password</label>
            <input type="password" name="password" id="passwordInput" placeholder="Password" />
            <label>Email</label>
            <input type="email" name="email" id="emailInput" />
            <div className="sign-in-btn-container">
                <button type="submit">Submit</button>
            </div>
        </div>
    </>
)

}