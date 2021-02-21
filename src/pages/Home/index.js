import React from "react";
import { Link } from "react-router-dom";

import '../../colors.css';
import './home.css';

export default function Home() {

    return(
        <div className="main">
            <div className="login__box">
                <div className="row">
                    <div className="login__column">
                        <div className="login__img" />
                    </div>
                    <div className="login__column">
                        <form className="login__form" onSubmit={(e) => e.preventDefault()}>
                            <h2>NorthWest Network Account Login</h2>
                            <input placeholder="Please enter your northwest account username" name="login__username" type="text"/>
                            <input placeholder="Please enter your northwest account password" name="login__password" type="password"/>
                            <span><input type="checkbox"/>Remember Me</span>
                            <button type="submit">Submit</button>
                            <span><Link to="/forgotPassword">Forgot Password?</Link> | <Link to="/needHelp">Need Help?</Link></span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
