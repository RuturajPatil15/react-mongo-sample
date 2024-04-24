import "./loginSignup.css"
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header';

export default function Login() {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    let Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/loginuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        console.log(json);
        if (!json.success) {
            alert("Enter valid Credentials")
        }

        if (json.success) {
            // localStorage.setItem("UserEmail", credentials.email);
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"));

            Navigate("/")
        }
        console.log(JSON.stringify({ email: credentials.email, password: credentials.password }))
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <div>
                <Header />
            </div>
            <div>
                <div >
                    <div class="background">
                        <div class="shape"></div>
                        <div class="shape"></div>
                    </div>
                    <form className="loginform" onSubmit={handleSubmit}>
                        <h3 className="loginheading">Login</h3>
                        <hr/>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="formcontrol" placeholder="Enter your email" name='email' value={credentials.email} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="formcontrol" placeholder="Enter your password" name='password' value={credentials.password} onChange={onChange} />
                        </div>
                        <button className="login">Login</button>
                        <Link to="/signup" className='signupbtn'>Signup</Link>
                    </form>
                </div>

            </div>
        </div>
    )
}
