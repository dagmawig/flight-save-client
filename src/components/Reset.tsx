import React from "react";
import { sendPasswordResetEmail, } from 'firebase/auth';
import { Box, Button, Grid, TextField, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import auth from "./FirebaseConfig";
import { useAppDispatch } from "./hooks";
import { changeLoading } from "./flightSlice";

const Reset = () => {
    const [email, getEmail] = React.useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleReset = () => {
        dispatch(changeLoading(true));
        sendPasswordResetEmail(auth, email).then(() => {
            dispatch(changeLoading(false))
            alert(`Password reset link sent to ${email}.`);
            getEmail("");
            navigate('/');
        }).catch(e =>{
            dispatch(changeLoading(false));
            alert(e.message)})
    }
    const handleResetInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') handleReset();
    }
    return (
        <Grid container sx={{ height: "100%", width: "100%", m: 0, p: 0  }}>
            <Grid container direction="column" sx={{ alignItems: "center", justifyContent: "center", border: 3, borderColor: "primary.main", borderRadius: "10px",  margin: "auto", height: "300px", width: "300px"}}>
                <Toolbar sx={{height: "30px", fontWeight: "bold", mx: "auto", p: 0,  fontSize: "16pt" }}>
                   <Box  sx={{textAlign: "center", margin: "auto", color: "primary.main"}}>Reset Password Flight Save</Box> 
                </Toolbar>
                <TextField onKeyDown={handleResetInput} onChange={(e) => getEmail(e.target.value)} focused name="email"  type={'email'} label="email" variant="outlined" sx={{width: "250px", mx: "auto", my: "5px"}}/>
                <Button onClick={handleReset} color="primary" variant="contained" sx={{marginTop: "5px"}}>Reset Password</Button>
                <Box>
                    <Link to="/signup">
                        <a href="/signup" style={{fontSize: 12}}>New user? Create account here.</a>
                    </Link>
                </Box>
                <Box>
                <Link to="/">
                        <a href="/" style={{fontSize: 12}} id="login_link">Remember password? Sign in here.</a>
                    </Link>
                </Box>
            </Grid>
        </Grid>
    )
}



export default Reset;