import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import '../style/start.css'
import logo from '../style/images/WFL.jpg'

const Start = () => {
    const [flip, setFlip] = useState(false)
    
    return (
        <>
            <div className="start-page-container">
                <div className="start-logo-container">
                    <img className="start-logo" src={logo} />
                </div>
                <div className="forms-container">
                    {
                        flip ? <SignUpForm />
                        : <LoginForm />
                    }
                </div>
                <a className="log-or-sign" onClick={() => flip ? setFlip(false) : setFlip(true)}>
                    {flip ? 'Already have an account?' : 'Don\'t have an account?'}
                </a>
            </div>
        </>
    );
}

export default Start