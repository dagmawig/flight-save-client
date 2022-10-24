import { Box,  Card, CardContent, Typography, Chip, Modal } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from './hooks'
import { changeDepDString, changeResult, changeView, SavedSearch } from "./flightSlice";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import { changeSavedSearch, changeLoading } from "./flightSlice";
import FlightClassIcon from '@mui/icons-material/FlightClass';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom";
import {styled } from "@mui/material/styles";
import { keyframes } from "@mui/system";

const blink  = keyframes`
from { opacity: 0; }
to { opacity: 1; }`;

const BlinkedBox = styled(Chip)({
    backgroundColor: 'red',
    animation: `${blink} 1s linear infinite`,
  });

interface IProps {
    data: SavedSearch,
    itemNo: number
}
const SavedSearchItem: FC<IProps> = ({ data, itemNo }: IProps) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const userID = localStorage.getItem("flightSave_userID")
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    let savedArr = useAppSelector(state => state.flight.savedSearch);
    interface FlightC {
        [k: string]: string,
    }
    const classObj: FlightC = {
        ECO: "Economy",
        PEC: "Premium",
        BUS: "Business",
        FST: "First"
    }
    function handleSearch() {
        const savedSearchItem = savedArr[itemNo];
        const date = new Date().toISOString().slice(0, 10);

        if (savedSearchItem.date_departure < date) {
            alert("departure date has passed!")
            return;
        }
        const data = {
            searchFilter: {
                date_departure: savedSearchItem.date_departure,
                location_departure: savedSearchItem.location_departure,
                location_arrival: savedSearchItem.location_arrival,
                number_of_stops: savedSearchItem.number_of_stops,
                classType: savedSearchItem.classType
            }
        }

        const searchFlight = async (): Promise<void | AxiosResponse<any, any>> => {
            let resp = await axios.post<any>("https://flight-save.glitch.me/search/", { ...data }).catch(err => {
                console.log("errrrr", err);
                dispatch(changeLoading(false));
                alert("no flight on this date!")
            })
            return resp;
        }

        dispatch(changeLoading(true));
        searchFlight().then(res => {
            if (res) {
                if (res.data.success) {
                    res.data.data.populated = true;
                    dispatch(changeResult(res.data.data));
                    dispatch(changeDepDString(savedSearchItem.date_departure))
                    let savedSearchArr = JSON.parse(JSON.stringify(savedArr));
                    savedSearchArr[itemNo].searchResult = res.data.data;

                    const data = {
                        userID:  userID,
                        savedSearch: savedSearchArr
                    }

                    const updateSearch = async (): Promise<void | AxiosResponse<any, any>> => {
                        let resp = await axios.post<any>("https://flight-save.glitch.me/updateSearch/", data).catch(err => {
                            console.log("errrrr", err);
                            dispatch(changeLoading(false));
                            alert(`error deleting ${err}`);
                        })
                        return resp;
                    }

                    updateSearch().then(res => {
                        if (res) {
                            if (res.data.success) {
                                dispatch(changeSavedSearch(res.data.data.user.searchData));
                            }
                            else {
                                dispatch(changeLoading(false));
                                alert(`${res.data.error}`);
                            }
                        }
                        else {
                            dispatch(changeLoading(false));
                            alert("server connection failed!");
                        }
                    })

                    dispatch(changeView(true));
                    navigate('/home');
                    dispatch(changeLoading(false));
                    if(savedArr[itemNo].searchResult.totPrice[0].toString() <= savedArr[itemNo].alertPrice) alert(`Min Price for ${savedArr[itemNo].name} is below alert price of $${savedArr[itemNo].alertPrice}!`)
                }
                else {
                    dispatch(changeLoading(false));
                    alert("no flight found!")
                }
            }
            else {
                dispatch(changeLoading(false));
                alert("server connection failed!");
            }
        })
    }

    function handleDelete() {
        console.log("deleeete")
        let arr = [...savedArr]
        arr.splice(itemNo, 1)
        const data = {
            userID: userID,
            savedSearch: arr
        }

        const updateSearch = async (): Promise<void | AxiosResponse<any, any>> => {
            let resp = await axios.post<any>("https://flight-save.glitch.me/updateSearch/", data).catch(err => {
                console.log("errrrr", err);
                dispatch(changeLoading(false));
                alert(`error deleting ${err}`);
            })
            return resp;
        }

        dispatch(changeLoading(true));
        setOpen(false);
        updateSearch().then(res => {
            if (res) {
                if (res.data.success) {
                    dispatch(changeSavedSearch(res.data.data.user.searchData));
                    dispatch(changeLoading(false));
                    alert("delete successful!")
                }
                else {
                    dispatch(changeLoading(false));
                    alert(`${res.data.error}`);
                }
            }
            else {
                dispatch(changeLoading(false));
                alert("server connection failed!");
            }
        })

    }
    console.log("saves s", data)
    return (
        <Card elevation={5} sx={{ minHeight: "190px", width: "95%", margin: "auto", my: "5px", fontSize: 14, borderRadius: 10 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", backgroundColor: (itemNo % 2 === 0) ? "#e0e0e0" : '' }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px" }}>
                    <Chip sx={{}} icon={<FlightClassIcon />} label={classObj[data.classType]} color="primary" />
                    <Chip sx={{ width: '40px', paddingLeft: "10px" }} icon={<DeleteIcon />} label="" color="error" onClick={handleOpen} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px" }}>
                    <Typography sx={{ fontSize: "inherit" }}>
                        <Chip label={data.name} color="primary" variant="outlined" />
                    </Typography>
                    <Typography sx={{ fontSize: "inherit" }}>
                        <Chip color="primary" sx={{ width: "100px", paddingLeft: "20px" }} icon={<>{data.location_departure} <FlightTakeoffIcon />{data.location_arrival}</>} variant="outlined" />
                    </Typography>
                    <Typography sx={{ fontSize: "inherit" }}>
                        <Chip icon={<CalendarMonthIcon />} color="primary" label={data.date_departure} variant="outlined" />
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-around", padding: "3px" }}>
                    <Typography sx={{ fontSize: "inherit" }}>
                        {(Math.ceil(data.searchResult.totPrice[0]).toString()<=data.alertPrice)? <BlinkedBox label={`MIN PRICE: $${Math.ceil(data.searchResult.totPrice[0])}`} /> : <Chip label={`MIN PRICE: $${Math.ceil(data.searchResult.totPrice[0])}`} color="primary" variant="outlined" /> }
                    </Typography>
                    <Typography sx={{ fontSize: "inherit" }}>
                        <Chip label={`ALERT PRICE: $${data.alertPrice}`} color="primary" variant="outlined" />
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", padding: "3px" }}>
                    <Chip label="SEARCH" color="success" onClick={handleSearch} />
                </Box>
            </CardContent>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: "200px",
                    bgcolor: 'background.paper',
                    border: '2px solid #2979ff',
                    borderRadius: "15px",
                    boxShadow: 24,
                    p: 4,
                }} >
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: "flex", justifyContent: "left" }}>
                        <Chip icon={<DeleteIcon />} color="primary" label="Delete Saved Search?" variant="outlined" />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
                        <Chip label="NO" color="primary" onClick={handleClose} /><Chip label="YES" color="error" onClick={handleDelete} />
                    </Typography>
                </Box>
            </Modal>
        </Card>
    )

}
export default function SavedSearchBox() {

    const savedResultArr: SavedSearch[] = useAppSelector(state => state.flight.savedSearch);
    const userID = localStorage.getItem("flightSave_userID");
    const SavedSearchList = savedResultArr.map((savedItem, ind) => {
        return (
            <SavedSearchItem data={savedItem} key={"savedItem" + ind} itemNo={ind} />
        )
    })

    const dispatch = useAppDispatch();


    useEffect(() => {
        const loadUserData = async (): Promise<void | AxiosResponse<any, any>> => {
            const data = {
                email: localStorage.getItem("flightSave_email"),
                userID: userID,
            }

            let resp = await axios.post<any>("https://flight-save.glitch.me/loadData/", { ...data }).catch(err => {
                console.log("errrrr", err);
                dispatch(changeLoading(false));
                alert(err)
            })
            return resp;
        }

        dispatch(changeLoading(true));
        loadUserData().then(res => {
            if(res) {
                if(res.data.success) {
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
        <Box sx={{ width: "100%", my: 0, mx: "auto", padding: 0, margin: 0, height: "calc(100vh - 80px)", overflowY: "hidden", display: "flex", flexDirection: "column" }}>
            <Box sx={{ position: "fixed", top: "50px", bottom: 0, left: 0, right: 0, zIndex: 5, width: "99%", height: "30px", display: "flex", justifyContent: 'center', alignItems: "center", padding: "5px", margin: 0, backgroundColor: "rgba(255,255,255, 1)" }} >
                <Chip size="small" label="SAVED SEARCHES" sx={{ backgroundColor: "info.main", fontWeight: "bold", color: "white" }} /></Box>
            <Box sx={{ height: "calc(100vh - 110px)", display: "flex", flexDirection: 'column', overflowY: "scroll", marginTop: "30px" }}>
                {SavedSearchList}
            </Box>
        </Box>
    )
}
