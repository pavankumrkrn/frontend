import { Button, Card, Checkbox, Container, FormControlLabel, Input, Switch, TextField, Typography } from '@mui/material'
import React, { useState } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { RouteStrings } from '../../Utils/RouteStrings';
import { login } from '../../Services/AuthService/authService';

const LoginPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [admin, setadmin] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async () => {
        if(!username || !password) return;
        const responseOk = await login({username, password}).then((data: any) => {
            return (data?.data?.status === 'ok') 
        }).catch((error: any) => {
            return false
        });
        if(responseOk) navigate(RouteStrings.itemslist)
    }

    return (
        <Container maxWidth="sm">
            <Card variant='outlined'>
                <div className="login_form">
                    <div className="form_item_wrapper">
                        <TextField type='text' value={username} variant='outlined' placeholder='username / email'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                    </div>
                    <div className="form_item_wrapper">
                        <TextField type='password' value={password} variant='outlined' placeholder='password'
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form_item_wrapper">
                    {/* <Switch
                    
            checked={admin} // Use controlled state
            onChange={(e: any) => {
                setadmin(e.target.checked)
            }} // Update state on change
            inputProps={{ 'aria-label': 'controlled' }} 
        /> <p>Admin</p> */}
                    <FormControlLabel control={<Checkbox defaultChecked={admin} onChange={(e: any) => {
                        setadmin(e.target.checked)
                    }} />} label="Admin" />
                    </div>
                    <div className="form_item_wrapper">
                        <Button variant='contained' color='primary' type='button' onClick={handleLogin} >Login</Button>
                    </div>
                    <Link to={RouteStrings.signup} ><Typography variant='overline' component={'p'} onClick={() => {}} style={{
                        cursor: "pointer"
                    }} >Sign Up</Typography></Link>
                </div>
            </Card>
        </Container>
    )
}

export default LoginPage
