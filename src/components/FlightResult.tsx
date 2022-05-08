import React, { FC } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardMedia, Modal, Chip, TextField, InputAdornment } from "@mui/material";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import fData from './data.json'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from './hooks'
import { changeView, changeAlertPrice, changeFlightName, changeLoading, changeSavedSearch } from "./flightSlice";
import SaveIcon from '@mui/icons-material/Save';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useNavigate } from "react-router-dom";

interface IProps {
    data: {
        itemNo: number,
        airline: string,
        totPrice: number,
        flightInfo: {
            sliceID: number,
            segmentID: number[],
            totDuration: number,
            overnight: boolean,
            cabinName: string,
            flightTime: string[],
            air: string[][],
            airCode: string[][]
        }
    }
}

export const SearchResultItem: FC<IProps> = ({ data }: IProps) => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [anchorEl1, setAnchorEl1] = React.useState<HTMLButtonElement | null>(null);
    const [anchorEl2, setAnchorEl2] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl1(event.currentTarget);
    };

    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const getTime = (dateString: string) => {
        const time = new Date(dateString);
        const hour = time.getHours();
        return {
            hour,
            minutes: time.getMinutes(),
            meridiem: (hour >= 12) ? 'p' : 'a'
        }
    }

    const layover = () => {
        return data.flightInfo.airCode.map((airport, ind) => {
            if (ind === 0) return null;
            const t2 = new Date(data.flightInfo.flightTime[2 * ind]).getTime() / 1000;
            const t1 = new Date(data.flightInfo.flightTime[(2 * ind) - 1]).getTime() / 1000;
            const timeDiff = Math.floor((t2 - t1) / 60);
            const h = Math.floor(timeDiff / 60);
            const min = timeDiff % 60;
            return (<div key={"lay" + ind}>
                <Button key={"popB" + ind} size="small" sx={{ backgroundColor: "#b3e5fc", textTransform: "none", minHeight: 0, minWidth: 0, padding: .25 }} aria-describedby={id} variant="contained" onClick={ind === 0 ? handleClick : (ind === 1 ? handleClick1 : handleClick2)}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography sx={{ fontSize: 10, marginBottom: 0 }} color="text.primary" gutterBottom>
                            {airport[0]}
                        </Typography>
                        <Typography sx={{ fontSize: 10 }} color="text.primary" gutterBottom>
                            {`${(h !== 0) ? `${h}h ` : ''}${(min !== 0) ? `${min}m` : ''}`}
                        </Typography>
                    </Box>
                </Button>
                <Popover
                    key={"pop" + ind}
                    disableScrollLock={true}
                    id={ind === 0 ? id : (ind === 1 ? id1 : id2)}
                    open={ind === 0 ? open : (ind === 1 ? open1 : open2)}
                    anchorEl={(ind === 0) ? anchorEl : (ind === 1 ? anchorEl1 : anchorEl2)}
                    onClose={ind === 0 ? handleClose : (ind === 1 ? handleClose1 : handleClose2)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Typography sx={{ p: 1, fontSize: 12 }}> {`${(h !== 0) ? `${h}h ` : ''}${(min !== 0) ? `${min}m` : ''}`} layover <br /> @ {data.flightInfo.air[ind][0]}</Typography>
                </Popover>
            </div>)
        })
    }

    const open = Boolean(anchorEl);
    const open1 = Boolean(anchorEl1);
    const open2 = Boolean(anchorEl2);
    const id = open ? 'simple-popover' : undefined;
    const id1 = open1 ? 'simple-popover' : undefined;
    const id2 = open2 ? 'simple-popover' : undefined;
    const totTime = `${(Math.floor(data.flightInfo.totDuration / 60) > 0) ? Math.floor(data.flightInfo.totDuration / 60).toString() + 'h ' : ''}${(Math.floor(data.flightInfo.totDuration % 60) > 0) ? Math.floor(data.flightInfo.totDuration % 60).toString() + 'm' : ''}`;

    const depTime = () => {
        const time: { hour: number, minutes: number, meridiem: string } = getTime(data.flightInfo.flightTime[0]);
        const hString = (time.hour % 12 === 0) ? '12' : (time.hour % 12).toString();
        const mString = `${Math.floor(time.minutes / 10).toString()}${(time.minutes % 10).toString()}`;

        return `${hString}:${mString}${time.meridiem}`
    };

    const arrTime = () => {
        const time: { hour: number, minutes: number, meridiem: string } = getTime(data.flightInfo.flightTime[data.flightInfo.flightTime.length - 1]);
        const hString = (time.hour % 12 === 0) ? '12' : (time.hour % 12).toString();
        const mString = `${Math.floor(time.minutes / 10).toString()}${(time.minutes % 10).toString()}`;

        return `${hString}:${mString}${time.meridiem}`
    }

    return (
        <Card elevation={5} sx={{ width: "99%", margin: "auto", mx: "3px", my: "5px" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", backgroundColor: (data.itemNo % 2 === 0) ? "#e0e0e0" : '' }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
                        <b>{(data.flightInfo.segmentID.length === 1) ? "Nonstop" : `${data.flightInfo.segmentID.length - 1} stop${(data.flightInfo.segmentID.length - 1 > 1) ? 's' : ''}`}</b> {totTime}
                    </Typography>
                    <Typography sx={{ fontSize: 10 }} color="text.primary" gutterBottom>
                        <b>{data.flightInfo.cabinName}</b>
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <CardMedia component="img" image={process.env.PUBLIC_URL + '/image/airline.jpg'} sx={{ height: 40, maxWidth: 50, objectFit: "contain", border: 1, borderColor: "grey.500" }} />
                    <Box sx={{ display: "flex", width: "240px", justifyContent: "space-between", alignItems: "center", backgroundColor: "#03a9f4", padding: "5px", borderRadius: "5px" }}>
                        <Box sx={{ height: "1px", backgroundColor: "#212121", position: "absolute", width: "240px", zIndex: 0 }}></Box>
                        <Box sx={{ width: "40px", backgroundColor: "#03a9f4", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography sx={{ fontSize: 14, fontWeight: "bold", marginBottom: 0 }} color="text.primary" gutterBottom>
                                {depTime()}
                            </Typography>
                            <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                                {data.flightInfo.airCode[0][0]}
                            </Typography>
                        </Box>

                        {layover()}

                        <Box sx={{ width: "40px", backgroundColor: "#03a9f4", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography sx={{ fontSize: 14, fontWeight: "bold", marginBottom: 0 }} color="text.primary" gutterBottom>
                                {arrTime()}
                            </Typography>
                            <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                                {data.flightInfo.airCode[data.flightInfo.airCode.length - 1][1]}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", }}>
                        <Typography sx={{ fontSize: 18, fontWeight: "bold", color: "success.main", marginBottom: 0 }} gutterBottom>
                            ${Math.ceil(data.totPrice)}
                        </Typography>
                        <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                            per person
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}



const SearchResultBox = () => {
    const dispatch = useAppDispatch();

    const handleBack = () => {
        dispatch(changeView(false));
    }
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const searchInfo = useAppSelector(state => state.flight.searchInfo)
    const handleSave = () => {
        if (flightName === '') { alert("enter flight name"); return; }
        if (alertPrice === null || alertPrice >= `${Math.ceil(result.totPrice[0])}`) { alert('please enter valid alert price'); return }
        const localDate = new Date(searchInfo.departDate || '');
        const dateString = `${localDate.getFullYear()}-${Math.floor((localDate.getMonth() + 1) / 10)}${(localDate.getMonth() + 1) % 10}-${Math.floor(localDate.getDate() / 10)}${localDate.getDate() % 10}`;

        const saveObj = {
            userID: "DAG",
            searchData: {
                type: "ONE_WAY",
                name: flightName,
                classType: searchInfo.cabinClass,
                searchResult: result,
                dep: {
                    date_departure: dateString,
                    location_departure: searchInfo.departCity,
                    location_arrival: searchInfo.arrCity,
                    number_of_stops: searchInfo.stops
                }
            }
        }

        const saveFlight = async (): Promise<void | AxiosResponse<any, any>> => {
            let resp = await axios.post<any>("https://flight-save.herokuapp.com/backend/saveSearch/", saveObj).catch(err => {
                console.log("errrrr", err);
                dispatch(changeLoading(false));
                alert(err)
            })
            return resp;
        }

        saveFlight().then(res=>{
            if(res) {
                console.log("save data", res.data);
                if(res.data.success) {
                    dispatch(changeLoading(false));
                    dispatch(changeSavedSearch(res.data.data))
                    navigate('/saved');
                    alert('flight search saved!');
                }
                else {
                    dispatch(changeLoading(false));
                    alert('saving error');
                }
            }
            else {
                dispatch(changeLoading(false));
                alert('saving error');
            }
        })

    }

    const handleFName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        dispatch(changeFlightName(event.target.value))
    }
    const handleAlertP = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        dispatch(changeAlertPrice(event.target.value))
    }

    const searchResult = useAppSelector(state => state.flight.searchResult);
    const flightName = useAppSelector(state => state.flight.saveModal.flightName);
    const alertPrice = useAppSelector(state => state.flight.saveModal.alertPrice);
    const result = (searchResult.populated) ? searchResult.dep : fData;
    const SearchResultList = result.totPrice.map((price, ind) => {
        return (
            <SearchResultItem key={'result' + ind} data={
                {
                    itemNo: ind,
                    airline: result.airline[ind],
                    totPrice: price,
                    flightInfo: {
                        sliceID: result.flightInfo.sliceIDArr[ind],
                        segmentID: result.flightInfo.segmentIDArr[ind],
                        totDuration: result.flightInfo.totDurationArr[ind],
                        overnight: result.flightInfo.overnightArr[ind],
                        cabinName: result.flightInfo.cabinNameArr[ind],
                        flightTime: result.flightInfo.flightTimeArr[ind],
                        air: result.flightInfo.airArr[ind],
                        airCode: result.flightInfo.airCodeArr[ind]
                    }
                }
            } />
        )
    })

    return (
        <Box sx={{ width: "100%", my: 0, mx: "auto", padding: 0, margin: 0, height: "100%", overflowY: "hidden", display: "flex", flexDirection: "column" }}>
            <Box sx={{ position: "fixed", top: "50px", bottom: 0, left: 0, right: 0, zIndex: 5, width: "99%", height: "30px", display: "flex", justifyContent: 'space-between', padding: "5px", margin: 0, backgroundColor: "rgba(255, 255, 255, 1)" }} >
                <Button variant="contained" color="primary" onClick={handleBack}><ArrowBackIcon /></Button>
                <Button variant="contained" color="success" sx={{ mr: "5px" }} onClick={handleOpen} >Save Search</Button>
            </Box>
            <Box sx={{ maxHeight: "calc(100vh-110px)", overflowY: "auto", marginTop: "30px" }}>
                {SearchResultList}
            </Box>

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
                    width: "300px",
                    bgcolor: 'background.paper',
                    border: '2px solid #2979ff',
                    borderRadius: "15px",
                    boxShadow: 24,
                    p: 4,
                }} >
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: "flex", justifyContent: "left" }}>
                        <Chip icon={<SaveIcon />} color="primary" label="Save Search" variant="outlined" />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <TextField
                            id="flight-name"
                            label="Flight Name"
                            variant="outlined"
                            placeholder="give it a name"
                            sx={{ margin: "6px", width: "250px" }}
                            value={flightName}
                            onChange={(e) => handleFName(e)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AirplaneTicketIcon />
                                    </InputAdornment>
                                ),
                            }} />
                        <TextField
                            id="alert-price"
                            label="Alert Price"
                            variant="outlined"
                            placeholder={`set price less than $${Math.ceil(result.totPrice[0])}`}
                            sx={{ margin: "6px", width: "250px" }}
                            value={alertPrice}
                            onChange={(e) => handleAlertP(e)}
                            InputProps={{
                                type: 'number',
                                inputProps: { min: '0', max: `${Math.ceil(result.totPrice[0] - 1)}`, step: "1" },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <NotificationAddIcon />
                                    </InputAdornment>
                                ),
                            }} />
                    </Typography>
                    <Typography id="modal-modal-action" sx={{ mt: 2, display: "flex", justifyContent: "space-around" }}>
                        <Chip label="Cancel" color="primary" onClick={handleClose} /><Chip label="Save" color="primary" onClick={handleSave} />
                    </Typography>
                </Box>
            </Modal>
        </Box>
    )
}

export default SearchResultBox;