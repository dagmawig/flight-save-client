import React, { FC } from "react";
import { Toolbar, Box, Button, Autocomplete } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import cityCode from './city.json';
import { useAppDispatch, useAppSelector } from './hooks'
import { setCabin, setStops, setDepCity, setArrCity, setDepDate, changeView, changeLoading, changeResult, changeDepDString } from './flightSlice'
import axios, { AxiosResponse } from 'axios';

interface IProps {
    kind: string
}



const FlightForm: FC<IProps> = ({ kind = "One-way" }: IProps) => {
    const dispatch = useAppDispatch();
    const [value, setValue] = React.useState<DateRange<Date>>([new Date(), new Date()]);
    const depCity = useAppSelector(state => state.flight.searchInfo.departCity)
    const handleDepCity = (event: React.SyntheticEvent<Element | Event>, value: string | null): void => {
        if (value !== null) dispatch(setDepCity(value))
    }
    const arrCity = useAppSelector(state => state.flight.searchInfo.arrCity)
    const handleArrCity = (event: React.SyntheticEvent<Element | Event>, value: string | null) => {
        if (value !== null) dispatch(setArrCity(value))
    }
    const depDate = useAppSelector(state => state.flight.searchInfo.departDate)
    const handleDepDate = (date: string | null) => {
        if (date !== null) {
            const isoDate = new Date(date).toISOString()
            dispatch(setDepDate(isoDate))
            const localDate = new Date(date);
            const dateString = `${localDate.getFullYear()}-${Math.floor((localDate.getMonth() + 1) / 10)}${(localDate.getMonth() + 1) % 10}-${Math.floor(localDate.getDate() / 10)}${localDate.getDate() % 10}`;
            dispatch(changeDepDString(dateString))
        }
    }

    return (
        <Box>
            <Autocomplete
                id="departAuto"
                freeSolo={false}
                disableClearable
                options={cityCode.map(option => option)}
                onChange={handleDepCity}
                renderInput={
                    params => <TextField
                        {...params}
                        id="depart-city"
                        label="Departing from?"
                        variant="outlined"
                        placeholder="city code"
                        sx={{ margin: "6px", width: "250px" }}
                        value={depCity}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }} />
                } />

            <Autocomplete
                id="arrAuto"
                freeSolo={false}
                disableClearable
                options={cityCode.map(option => option)}
                onChange={handleArrCity}
                renderInput={
                    params => <TextField
                        {...params}
                        id="arrive-city"
                        label="Going to?"
                        variant="outlined"
                        placeholder="city code"
                        sx={{ margin: "6px", width: "250px" }}
                        value={arrCity}
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }} />
                } />

            {(kind === "One-way") ? <LocalizationProvider dateAdapter={AdapterDateFns} >
                <DatePicker
                    disablePast
                    label="Departing"
                    value={depDate}
                    onChange={(date) => handleDepDate(date)}
                    renderInput={(params) => <TextField  {...params} sx={{ margin: "6px", width: 150 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarTodayIcon />
                                </InputAdornment>
                            ),
                        }}
                    />}
                />
            </LocalizationProvider> :
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        disablePast
                        startText="Departing"
                        endText="Returning"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} sx={{ margin: "6px", width: 250 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CalendarTodayIcon />
                                            </InputAdornment>
                                        ),
                                    }} />
                                <Box sx={{ mx: 1 }}> to </Box>
                                <TextField {...endProps} sx={{ margin: "6px", width: 250 }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CalendarTodayIcon />
                                            </InputAdornment>
                                        ),
                                    }} />
                            </React.Fragment>
                        )}
                    />
                </LocalizationProvider>
            }
        </Box>
    )
}

const SearchBox = () => {
    const dispatch = useAppDispatch();

    const cabinClass = useAppSelector((state => state.flight.searchInfo.cabinClass))
    const stops = useAppSelector(state => state.flight.searchInfo.stops)
    const handleClass = (event: SelectChangeEvent) => {
        dispatch(setCabin(event.target.value))
    };
    const handleStops = (event: SelectChangeEvent) => {
        dispatch(setStops(event.target.value));
    };
    const searchInfo = useAppSelector(state => state.flight.searchInfo);

    const handleSearch = () => {
        if(searchInfo.departCity === searchInfo.arrCity && searchInfo.departCity !== "") {
            alert("depart city can't be same as arrival city!");
            return;
        }
        if (searchInfo.departCity !== "" && searchInfo.arrCity !== "" && searchInfo.departDate !== null) {

            const data = {
                searchFilter: {
                    date_departure: searchInfo.departDString,
                    location_departure: searchInfo.departCity,
                    location_arrival: searchInfo.arrCity,
                    number_of_stops: searchInfo.stops,
                    classType: searchInfo.cabinClass
                }
            }

            const searchFlight = async (): Promise<void | AxiosResponse<any, any>> => {
                let resp = await axios.post<any>("https://flight-save.herokuapp.com/backend/search/", { ...data }).catch(err => {
                    console.log("errrrr", err);
                    dispatch(changeLoading(false));
                    alert("no flight on this date!")
            })
                return resp;
            }

            dispatch(changeLoading(true));
            searchFlight().then(res => {
                if (res) {
                    console.log("search data", res.data);
                    if(res.data.success) {
                        res.data.data.populated = true;
                        dispatch(changeResult(res.data.data))
                        dispatch(changeView(true));
                        dispatch(changeLoading(false));
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
    }

    return (
        <Box sx={{ width: "90%", height: "100%", margin: "auto", display: "flex", justifyContent: 'start', flexDirection: "column", backgroundColor: "#e3f2fd", borderRadius: "5px", padding: "5px" }}>
            <Toolbar sx={{ color: "#3f51b5", fontWeight: "bold", width: "100%", fontSize: "16pt" }}>
                Search Flight
            </Toolbar>
            <FlightForm kind={'One-way'} />
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 200 }} size="small">
                <InputLabel id="demo-select-small">Cabin</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={cabinClass}
                    label="Class"
                    onChange={handleClass}
                >
                    <MenuItem value={"ECO"}>Economy</MenuItem>
                    <MenuItem value={"PEC"}>Premium Economy</MenuItem>
                    <MenuItem value={"BUS"}>Business</MenuItem>
                    <MenuItem value={"FST"}>First</MenuItem>
                </Select>
            </FormControl >
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 150 }} size="small">
                <InputLabel id="demo-select-small">Stops</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={stops}
                    label="Stops"
                    onChange={handleStops}
                >
                    <MenuItem value={0}>Non stop</MenuItem>
                    <MenuItem value={1}>Up to 1</MenuItem>
                    <MenuItem value={2}>Up to 2</MenuItem>
                    <MenuItem value={3}>Up to 3</MenuItem>
                </Select>
            </FormControl >
            <Button variant="contained" color="primary" sx={{ height: "50px", alignSelf: "center", color: "white", width: "95%", margin: "6px" }} onClick={handleSearch}>Find Your Flight</Button>
        </Box>
    )
}

export default SearchBox;