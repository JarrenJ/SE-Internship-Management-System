import React, {useState} from "react";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { NWHorizontal2Color } from 'assets'
import '../../colors.css';
import './home.css';


export const Grid = styled.div`
  display: flex;
  height: 100%;
  margin: 0 100px;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    margin: 0 auto;
    //overflow-x: hidden;
    overflow-y: hidden;
  }
`

export const Row = styled.div`
  display: flex;
  width: 100%;
  max-width: ${(props) => props.maxWidth};
  @media (max-width: 1280px) {
    flex-direction: column;
  }
`

export const Col = styled.div`
  flex: ${(props) => props.size};
  background-color: ${(props => props.bgColor)};
  min-width: ${(props => props.minWidth)};
  height: 500px;

  @media (max-width: 768px) {
    min-width: 100%;
  }
  
  //border: 5px solid black;
`


export function Home() {
    const { register, handleSubmit } = useForm();
    const [message, setMessage] = useState({});
    const history = useHistory();

    const onSubmit = (data, e) => {
        setMessage({
            data: "Logging in...",
        });
        // Fetch api endpoint to query database for user with credentials from form
        fetch(`/api/auth`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                console.log(res)
                if (res.ok) {
                    // api returned status 200, so we return the response
                    return res.json()
                } else {
                    // api returned code 400, so we throw an error to catch later
                    throw new Error('Something went wrong with the /api/auth endpoint (Most likely an invalid user)')
                }
            })
            .then(({ error, data }) => {
                setMessage({
                    data: error || "Logged in successfully, redirecting...",
                });

                !error &&
                setTimeout(() => {
                    // set JWT here - for login session and to guard routes so only authenticated users can access them
                    sessionStorage.setItem("token", data.token);
                    // sessionStorage.setItem("role", data.role);
                    sessionStorage.setItem("userID", data.userID);
                    // PUSH new url onto history so create a new entry
                    history.push("/dashboard");
                }, 3000);

                !error && e.target.reset();
            })
            // Catch user with invalid credentials here... or any other error
            .catch((error) => {
                console.log(error)
                setMessage({
                    data: 'Invalid Credentials',
                });
            });
    };

    return(
        <>
        <div className="login__container">
            <Grid>
                    <div className="login__logo">
                        <img src={NWHorizontal2Color} alt='NW_Horizontal_2Color'/>
                    </div>
                    <Row maxWidth={'1120px'}>
                        <Col size={1} minWidth={'500px'}>
                            <div className="login__img" />
                        </Col>
                        <Col size={1} bgColor={'white'} minWidth={'500px'}>
                            <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
                                <h2>Northwest Network Account Login</h2>
                                <input
                                    placeholder="Please enter your northwest account username"
                                    name="username"
                                    type="text"
                                    ref={register({ required: true })}
                                />
                                <input
                                    placeholder="Please enter your northwest account password"
                                    name="password"
                                    type="password"
                                    ref={register({ required: true })}
                                />
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
                                <small className='login__error'>{message.data}</small>
                                <span><Link to="/forgotPassword">Forgot Password?</Link> | <Link to="/needHelp">Need Help?</Link></span>
                            </form>
                        </Col>
                    </Row>
            </Grid>
        </div>
                    {/*    <div className="login__container">*/}
                    {/*        <div className="login__logo">*/}
                    {/*            <img src={NWHorizontal2Color} alt='NW_Horizontal_2Color'/>*/}
                    {/*        </div>*/}
                    {/*        <div className="login__box">*/}
                    {/*            <div className="row">*/}
                    {/*                <div className="login__column">*/}
                    {/*                    <div className="login__img" />*/}
                    {/*                </div>*/}
                    {/*                <div className="login__column">*/}
                    {/*                    <form className="login__form" onSubmit={handleSubmit(onSubmit)}>*/}
                    {/*                        <h2>Northwest Network Account Login</h2>*/}
                    {/*                        <input*/}
                    {/*                            placeholder="Please enter your northwest account username"*/}
                    {/*                            name="username"*/}
                    {/*                            type="text"*/}
                    {/*                            ref={register({ required: true })}*/}
                    {/*                        />*/}
                    {/*                        <input*/}
                    {/*                            placeholder="Please enter your northwest account password"*/}
                    {/*                            name="password"*/}
                    {/*                            type="password"*/}
                    {/*                            ref={register({ required: true })}*/}
                    {/*                        />*/}
                    {/*                        <FormControlLabel*/}
                    {/*                            control={*/}
                    {/*                                <Checkbox*/}
                    {/*                                    // checked={checked}*/}
                    {/*                                    // onChange={handleChange}*/}
                    {/*                                    name="checkedB"*/}
                    {/*                                    color="primary"*/}
                    {/*                                />*/}
                    {/*                            }*/}
                    {/*                            label="Remember me"*/}
                    {/*                        />*/}
                    {/*                        <button type="submit">Submit</button>*/}
                    {/*                        <small className='login__error'>{message.data}</small>*/}
                    {/*                        <span><Link to="/forgotPassword">Forgot Password?</Link> | <Link to="/needHelp">Need Help?</Link></span>*/}
                    {/*                    </form>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
        </>
    )
}
