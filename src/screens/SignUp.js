import "./loginSignup.css"
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function SignUp() {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/signupuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, confirmpassword: credentials.confirmpassword })
        })
        const json = await response.json()
        console.log(json);
        if (!json.success) {
            alert("Enter valid Credentials")
        } else {
            alert("Register successfully")
        }

        console.log(JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, confirmpassword: credentials.confirmpassword }))
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
                <div>
                    <div class="background">
                        <div class="shape"></div>
                        <div class="shape"></div>
                    </div>
                    <form className="signupform" onSubmit={handleSubmit}>
                        <h3 className="signupheading">Signup</h3>
                        <hr/>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label" >Name</label>
                            <input type="text" className="formcontrol" placeholder="Enter your name" name='name' value={credentials.name} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="formcontrol" placeholder="Enter your email" name='email' value={credentials.email} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="formcontrol" placeholder="Enter your password" name='password' value={credentials.password} onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label" >Confirm Password</label>
                            <input type="password" className="formcontrol" placeholder="Confirm your password" name='confirmpassword' value={credentials.confirmpassword} onChange={onChange} />
                        </div>
                        <button className="signup">Signup</button>
                        <Link to="/login" className='loginbtn'>Login</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
