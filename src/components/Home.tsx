import React, { FC } from "react";
import { AppBar, Toolbar, Box, Typography, Button, IconButton } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DateRangePicker, DateRange } from '@mui/x-date-pickers-pro/DateRangePicker';
import fData from './data.json'
import SearchBox from "./SearchBox";
import SearchResultBox from "./FlightResult"
import { useAppDispatch, useAppSelector} from './hooks'

interface IProps {
    kind: string
}

console.log(fData);

const FlightForm: FC<IProps> = ({ kind = "One-way" }: IProps) => {
    const [valueOne, setValueOne] = React.useState<Date | null>(new Date());
    const [value, setValue] = React.useState<DateRange<Date>>([new Date(), new Date()]);

    return (
        <Box>
            <TextField
                id="depart-city"
                label="Departing from?"
                variant="outlined"
                sx={{ margin: "6px" }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }} />
            <TextField
                id="arrive-city"
                label="Going to?"
                variant="outlined"
                sx={{ margin: "6px" }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }} />
            {(kind === "One-way") ? <LocalizationProvider dateAdapter={AdapterDateFns} >
                <DatePicker
                    disablePast
                    label="Departing"
                    value={valueOne}
                    onChange={(newValue) => {
                        setValueOne(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} sx={{ margin: "6px", width: 150 }}
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

export default function Home() {
    const [value, setValue] = React.useState<Date | null>(new Date());
    const [cabinClass, setClass] = React.useState('Economy');
    const [stops, setStops] = React.useState('0');

    const handleClass = (event: SelectChangeEvent) => {
        setClass(event.target.value);
    };
    const handleStops = (event: SelectChangeEvent) => {
        setStops(event.target.value);
    };
    const [fKind, setFKind] = React.useState('One-way')
    const handleKind = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFKind(e.target.value)
    }

    const resultView = useAppSelector(state=>state.flight.resultView)

    return (
           (!resultView)?<SearchBox /> :
            <SearchResultBox />
 

        // <Box sx={{  width: "100%", my: 0, mx: "auto", padding: 0, margin:0, height: "calc(100vh-50px)", overflowY: "hidden"}}>
        //     <Box sx={{  position: "fixed", top: "50px", bottom: 0, left: 0, right: 0, zIndex: 5, width: "99%", height: "30px", display: "flex", justifyContent: 'space-between', padding: "5px", margin:0, backgroundColor: "rgba(255, 255, 255, 1)" }} >
        //     <Button variant="contained" color="primary" ><ArrowBackIcon/></Button>
        //         <Button variant="contained" color="success" sx={{mr: "5px"}} >Save Search</Button>
        //     </Box>
        //     <Box sx={{ maxHeight: "calc(100vh-80px)", overflowY: "scroll", marginTop: "30px"}}>
        //         {searchResultBox}
        //     </Box>
        // </Box>
    )
}
