import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router-dom";

// import Logo from '../../assets/northwestHorizontalBlack.png'
import Logo2 from '../../assets/northwestHorizontalBlackWhite.png'
import '../../colors.css';
import './home.css';

export function Home() {
    const { register, handleSubmit, errors } = useForm();
    const [message, setMessage] = useState({});
    const history = useHistory();

    const onSubmit = (data, e) => {
        console.log(JSON.stringify(data))
        setMessage({
            data: "Login is in progress...",
        });
        fetch(`/api/auth`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                console.log(res.ok)
                if (res.ok) {
                    console.log('res is ok')
                    return res.text()
                } else {
                    console.log('res is not ok')
                    throw new Error('Something went wrong. very. very. wrong.')
                }
            })
            .then(({ error, data }) => {
                setMessage({
                    data: error || "Logged in successfully, redirecting...",
                });

                !error &&
                setTimeout(() => {
                    // localStorage.setItem("token", data.token);
                    history.push("/playground");
                }, 3000);

                !error && e.target.reset();
            })
            .catch((error) => {
                console.log(error)
                setMessage({
                    data: 'Invalid Credentials',
                });
            });
    };

    const onSubmit1 = (e) => {
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
                        {/*action='auth' method='post'*/}
                        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
                            <h2>Northwest Network Account Login</h2>
                            <input placeholder="Please enter your northwest account username" name="username" type="text" ref={register({ required: true })} />
                            <input placeholder="Please enter your northwest account password" name="password" type="password" ref={register({ required: true })} />
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
                            <small>{message.data}</small>
                            <small>{message.text}</small>
                            <span><Link to="/forgotPassword">Forgot Password?</Link> | <Link to="/needHelp">Need Help?</Link></span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
