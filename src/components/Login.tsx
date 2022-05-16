import React from "react";
import { createUserWithEmailAndPassword, signOut, sendEmailVerification, signInWithEmailAndPassword, } from 'firebase/auth';
import { Box, Button, Grid, TextField, Toolbar } from "@mui/material";
import auth from "./FirebaseConfig";
import { useAppDispatch, useAppSelector } from './hooks'
import { setUser, changeLoading } from "./flightSlice";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, getEmail] = React.useState('');
    const [password, getPassword] = React.useState('');
    const dispatch = useAppDispatch();

    const handleLogin = () => {
        dispatch(changeLoading(true))
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                let user = auth.currentUser;
                if (user !== null) {
                    if (user.emailVerified) {
                        localStorage.setItem("flightSave_userID", user.uid);
                        localStorage.setItem("flightSave_email", email);
                        dispatch(setUser(user.uid));
                        window.location.reload();
                        dispatch(changeLoading(false))
                    }
                    else {
                        sendEmailVerification(user)
                            .then(() => {
                                signOut(auth);
                                dispatch(changeLoading(false))
                                alert(`Verification link sent to ${email}. \n Please click on the link to verify your email and log into your acount.`);
                            })
                    }
                }
            }).catch(e => {
                dispatch(changeLoading(false));
                alert(e.message);
            })
    }

    const handleLoginInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') handleLogin();
    }
    return (
        <Grid container sx={{ height: "100%", width: "100%", m: 0, p: 0 }}>
            <Grid container direction="column" sx={{ alignItems: "center", justifyContent: "center", border: 3, borderColor: "primary.main", borderRadius: "10px", margin: "auto", height: "300px", width: "300px" }}>
                <Toolbar sx={{ height: "30px", fontWeight: "bold", mx: "auto", p: 0, fontSize: "16pt" }}>
                    <Box sx={{ textAlign: "center", margin: "auto", color: "primary.main" }}>Login Flight Save</Box>
                </Toolbar>
                <TextField onKeyDown={handleLoginInput} onChange={(e) => getEmail(e.target.value)} focused type={'email'} label="email" name='email' variant="outlined" sx={{ width: "250px", mx: "auto", my: "5px" }} />
                <TextField onKeyDown={handleLoginInput} type={'password'} onChange={(e) => getPassword(e.target.value)} focused label="password" variant="outlined" sx={{ width: "250px", mx: "auto", my: "5px", borderColor: "red" }} />
                <Button  onClick={handleLogin} color="primary" variant="contained" sx={{ marginTop: "5px" }}>Login</Button>
                <Box >
                    <Link to="/signup">
                        <a style={{fontSize: 12}}>New user? Create account here.</a>
                    </Link>
                </Box>
                <Box>
                    <Link to="/reset">
                        <a style={{fontSize: 12}}>Forgot password? Reset password here.</a>
                    </Link>
                </Box>
            </Grid>
        </Grid>
    )
}



export default Login;