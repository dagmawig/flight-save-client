import React, { FC } from "react";
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Autocomplete } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
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
import fData from './data.json';
import cityCode from './city.json';
import { useAppDispatch, useAppSelector } from './hooks'
import { setCabin, setStops, setDepCity, setArrCity, setDepDate, changeView } from './flightSlice'


interface IProps {
    kind: string
}

const FlightForm: FC<IProps> = ({ kind = "One-way" }: IProps) => {
    const dispatch = useAppDispatch();
    const [valueOne, setValueOne] = React.useState<Date | null>(new Date());
    const [value, setValue] = React.useState<DateRange<Date>>([new Date(), new Date()]);
    const depCity = useAppSelector(state => state.flight.searchInfo.departCity)
    const handleDepCity = (event: React.SyntheticEvent<Element | Event>, value: string | null): void => {
        if(value !==null) dispatch(setDepCity(value))
    }
    const arrCity = useAppSelector(state => state.flight.searchInfo.arrCity)
    const handleArrCity = (event: React.SyntheticEvent<Element | Event>, value: string | null) => {
        if(value !==null) dispatch(setArrCity(value))
    }
    const depDate = useAppSelector(state => state.flight.searchInfo.departDate)
    const handleDepDate = (date: string | null) => {
        dispatch(setDepDate(date))
        // const localDate = (date!==null)? new Date(date) : null
        // if(localDate===null)  dispatch(setDepDate(localDate))
        // else {
        //     const dateString = `${localDate.getFullYear()}-${Math.floor(localDate.getMonth()/10)}${localDate.getMonth()%10}-${Math.floor(localDate.getDate()/10)}${localDate.getDate()%10}`;
        //     dispatch(setDepDate(dateString))
        // }
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
            options={cityCode.map(option=>option)}
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

    const [value, setValue] = React.useState<Date | null>(new Date());
    const cabinClass = useAppSelector((state => state.flight.searchInfo.cabinClass))
    const stops = useAppSelector(state => state.flight.searchInfo.stops)
    const handleClass = (event: SelectChangeEvent) => {
        dispatch(setCabin(event.target.value))
    };
    const handleStops = (event: SelectChangeEvent) => {
        dispatch(setStops(event.target.value));
    };

    const handleSearch = () => {

        dispatch(changeView(true));
    }

    return (
        <Box sx={{ width: "90%", height: "500px", margin: "auto", display: "flex", justifyContent: 'center', flexDirection: "column", backgroundColor: "#e3f2fd", borderRadius: "5px", padding: "5px" }}>
            <Toolbar sx={{ color: "#3f51b5", fontWeight: "bold", width: "100%", fontSize: "16pt" }}>
                Search Flight
            </Toolbar>
            {/* <FormControl sx={{ margin: "5px" }}>
                <RadioGroup
                    row
                    aria-labelledby="radio-buttons-group-label"
                    defaultValue="One-way"
                    name="radio-buttons-group"
                    sx={{ color: "gray" }}
                    onChange={handleKind}
                >
                    <FormControlLabel value="One-way" control={<Radio />} label="One-way" />
                    <FormControlLabel value="Round-trip" control={<Radio />} label="Round-trip" />
                </RadioGroup>
            </FormControl> */}
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