import React from "react";
import { Link } from "react-router-dom";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// import Logo from '../../assets/northwestHorizontalBlack.png'
import Logo2 from '../../assets/northwestHorizontalBlackWhite.png'
import '../../colors.css';
import './home.css';

export function Home() {

    const onSubmit = (e) => {
        // e.preventDefault()
        console.log('in onSubmit function')
        fetch(`/auth`)
            .then((response) => response.json())
            .then(users => console.log(users));
    }


    return(
        <div className="main">
            <div className="login__logo">
                {/*<img src={Logo} alt='NW_Logo_Horizontal_Black'/>*/}
                <img src={Logo2} alt='NW_Logo_Horizontal_BlackWhite'/>
            </div>
            <div className="login__box">
                <div className="row">
                    <div className="login__column">
                        <div className="login__img" />
                    </div>
                    <div className="login__column">
                        {/*onSubmit={(e) => e.preventDefault()}*/}
                        <form className="login__form" action='auth' method='post' onSubmit={onSubmit}>
                            <h2>Northwest Network Account Login</h2>
                            <input placeholder="Please enter your northwest account username" name="username" type="text"/>
                            <input placeholder="Please enter your northwest account password" name="password" type="password"/>
                            {/*<span><input type="checkbox"/>Remember Me</span>*/}
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        // checked={checked}
                                        // onChange={handleChange}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <button type="submit">Submit</button>
                            <span><Link to="/forgotPassword">Forgot Password?</Link> | <Link to="/needHelp">Need Help?</Link></span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
