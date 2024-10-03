import { Button, Card, Container, Input, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
// import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { RouteStrings } from '../../Utils/RouteStrings';
import { signup } from '../../Services/AuthService/authService';

const SignUpPage = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [email, setemail] = useState<string>('');

    const navigate = useNavigate();

    const handleSignUp = async () => {
        signup({
            username, email, password
        }).then((data) => {
            if(data.data.status === 'ok') navigate(RouteStrings.login)
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <Container maxWidth="sm">
            <Card variant='outlined'>
                <div className="login_form">
                    <div className="form_item_wrapper">
                        <TextField type='text' value={username} variant='outlined' placeholder='username'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                    </div>
                    <div className="form_item_wrapper">
                        <TextField type='text' value={email} variant='outlined' placeholder='email'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setemail(e.target.value)} />
                    </div>
                    <div className="form_item_wrapper">
                        <TextField type='password' value={password} variant='outlined' placeholder='password'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form_item_wrapper">
                        <Button variant='contained' color='primary' type='button' onClick={handleSignUp} >Sign Up</Button>
                    </div>
                  <Link to={RouteStrings.login}>  <Typography variant='overline' component={'p'} onClick={() => {}} style={{
                        cursor: "pointer"
                    }} >Login</Typography></Link>
                </div>
            </Card>
        </Container>
    )
}

export default SignUpPage
