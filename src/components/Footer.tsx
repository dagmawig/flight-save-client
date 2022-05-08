import React from "react";
import { Box, Toolbar, Button } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <Box sx={{ position: "sticky", bottom: 0, zIndex: 20, width: "100%", height: "30px", display: "flex", justifyContent: 'space-between', backgroundColor: "info.main", padding: 0, margin: 0 }}>
            <Link style={{width: "50%"}} to='/'>
                <Button variant="contained" color="primary" sx={{ height: "25px", width: "100%", alignSelf: "center", color: "white", mr: '5px' }}><HomeIcon /></Button>
            </Link>
            <Link style={{width: "50%"}} to='/saved'>
                <Button variant="contained" color="primary" sx={{ height: "25px", width: "100%", alignSelf: "center", color: "white", mr: '5px' }}><SavedSearchIcon /></Button>
            </Link>

        </Box>

    )
}