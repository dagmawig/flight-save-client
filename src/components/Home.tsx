import React from "react";
import {  Box } from "@mui/material"
import SearchBox from "./SearchBox";
import SearchResultBox from "./FlightResult"
import { useAppSelector } from './hooks'


export default function Home() {

    
    const resultView = useAppSelector(state => state.flight.resultView)

    return (
        (!resultView) ? (
            <Box sx={{ height: "calc(100vh - 80px)", margin: 0, padding: 0 }}>
                <SearchBox />
            </Box>
        ) :
            <Box sx={{width: "100%", my: 0, mx: "auto", padding: 0, margin: 0, height: "calc(100vh - 80px)" }}>
                <SearchResultBox />
            </Box>
    )
}
