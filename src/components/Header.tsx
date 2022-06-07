import { Toolbar, Box, Button } from "@mui/material";
import { useAppDispatch } from "./hooks";
import { reset, changeLoading } from "./flightSlice";
import { Link, useNavigate } from "react-router-dom";
export default function Header() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(changeLoading(true));
        localStorage.setItem("flightSave_userID", "");
        dispatch(reset());
        navigate('/');
        window.location.reload();
    }

    return (
        <Box sx={{ position: "sticky", top: 0, zIndex: 20, width: "100%", height: "50px", display: "flex", justifyContent: 'space-between', backgroundColor: "info.main", padding: 0, margin: 0 }}>
            <Toolbar sx={{ color: "white", fontSize: "18pt" }}>
                Flight Save <span style={{fontSize: 12, verticalAlign: "super"}}>&nbsp;Powered by Priceline API</span>
            </Toolbar>
            <Button variant="contained" color="error" sx={{ height: "25px", alignSelf: "center", color: "white", mr: '5px' }} onClick={logout}>Logout</Button>
        </Box>

    )
}
