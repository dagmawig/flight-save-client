import React from "react";
import { createUserWithEmailAndPassword, signOut, sendEmailVerification, } from 'firebase/auth';
import auth from "./FirebaseConfig";
import { Box, Button, Grid, TextField, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "./hooks";
import { changeLoading } from "./flightSlice";


const SignUp = () => {
    const [email, getEmail] = React.useState('');
    const [password, getPassword] = React.useState('');
    const dispatch = useAppDispatch();
    // const [valid, isValid] = React.useState(false);
    const navigate = useNavigate();
    const handleSignUp = () => {
        // if(valid) return;
        dispatch(changeLoading(true));
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            let user = auth.currentUser;
            if(user!== null) sendEmailVerification(user)
            .then(() => {
                signOut(auth);
                dispatch(changeLoading(false));
                alert(`Verification link sent to ${email}. \n Please click on the link to verify your email and log into your acount.`);
                navigate('/');
            })
        }).catch(e=>{
            dispatch(changeLoading(false));
            alert(e.message)})
    }

    const handleSignUpInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') handleSignUp();
    }

    return (
        <Grid container sx={{ height: "100%", width: "100%", m: 0, p: 0  }}>
            <Grid container direction="column" sx={{ alignItems: "center", justifyContent: "center", border: 3, borderColor: "primary.main", borderRadius: "10px",  margin: "auto", height: "300px", width: "300px"}}>
                <Toolbar sx={{height: "30px", fontWeight: "bold", mx: "auto", p: 0,  fontSize: "16pt" }}>
                   <Box  sx={{textAlign: "center", margin: "auto", color: "primary.main"}}>Sign Up Flight Save</Box> 
                </Toolbar>
                <TextField onKeyDown={handleSignUpInput} onChange={(e) => getEmail(e.target.value)} focused  type={'email'} label="email" name="email" variant="outlined" sx={{width: "250px", mx: "auto", my: "5px"}}/>
                <TextField onKeyDown={handleSignUpInput} onChange={(e) => getPassword(e.target.value)} focused label="password" type={'password'} variant="outlined" sx={{width: "250px", mx: "auto", my: "5px", borderColor: "red"}}/>
                <Button onClick={handleSignUp} color="primary" variant="contained" sx={{marginTop: "5px"}}>Sign Up</Button>
                <Box color='primary.text'>
                    <Link to="/">
                        <a style={{fontSize: 12}}>Have an account? Login here.</a>
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



export default SignUp;