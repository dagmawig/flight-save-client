import { Box } from "@mui/material"
import SearchBox from "./SearchBox";
import SearchResultBox from "./FlightResult"
import { useAppSelector, useAppDispatch } from './hooks'
import { changeSavedSearch, changeLoading } from "./flightSlice";
import { useEffect } from "react";
import axios, { AxiosResponse } from 'axios';


export default function Home() {


    const resultView = useAppSelector(state => state.flight.resultView);

    const dispatch = useAppDispatch();
    const userID = localStorage.getItem("flightSave_userID");
    
    // hook used to update user data by importing it from server during page loading
    useEffect(() => {
        const loadUserData = async (): Promise<void | AxiosResponse<any, any>> => {
            const data = {
                email: localStorage.getItem("flightSave_email"),
                userID: userID,
            }

            let resp = await axios.post<any>("https://flight-save.herokuapp.com/backend/loadData/", { ...data }).catch(err => {
                console.log("errrrr", err);
                dispatch(changeLoading(false));
                alert("no flight on this date!")
            })
            return resp;
        }

        dispatch(changeLoading(true));
        loadUserData().then(res => {
            if (res) {
                if (res.data.success) {
                    dispatch(changeSavedSearch(res.data.data.user.searchData));
                    dispatch(changeLoading(false));
                }
                else {
                    dispatch(changeLoading(false));
                    alert(res.data.error || res.data.message);
                }
            }
            else {
                dispatch(changeLoading(false));
                alert("Server connection error!")
            }
        })
    }, [])



    return (
        (!resultView) ? (
            <Box sx={{ height: "calc(100vh - 80px)", margin: 0, padding: 0 }}>
                <SearchBox />
            </Box>
        ) :
            <Box sx={{ width: "100%", my: 0, mx: "auto", padding: 0, margin: 0, height: "calc(100vh - 80px)" }}>
                <SearchResultBox />
            </Box>
    )
}
