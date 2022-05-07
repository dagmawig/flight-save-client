import React from "react";
import { AppBar, Toolbar, Box, Typography, Button, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import "./Header.css"

export default function Header() {
    return (
        <Box sx={{ position: "sticky", top: 0, zIndex: 20,  width: "100%", height: "50px", display: "flex", justifyContent: 'space-between', backgroundColor: "info.main", padding: 0, margin:0 }}>
            <Toolbar sx={{ color: "white", fontSize: "18pt" }}>
                Flight Save
            </Toolbar>
            <Button variant="contained" color="error" sx={{ height: "25px", alignSelf: "center", color: "white", mr: '5px' }}>Logout</Button>
        </Box>

    )
}

{/* <AppBar sx={{ width: '412px'}}>
                <Toolbar>
                    Priceline
                </Toolbar>
            </AppBar> */}