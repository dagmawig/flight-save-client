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


interface IProps {
    kind: string
}

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
                    renderInput={(params) => <TextField {...params} sx={{ margin: "6px", width: 150}}
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

    return (
        <Box sx={{ width: "90%", height: "500px", margin: "auto", display: "flex", justifyContent: 'center', flexDirection: "column", backgroundColor: "#e3f2fd", borderRadius: "5px", padding: "5px" }}>
            <Toolbar sx={{ color: "#3f51b5", fontWeight: "bold", width: "100%", fontSize: "16pt" }}>
                Search Flight
            </Toolbar>
            <FormControl sx={{ margin: "5px" }}>
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
            </FormControl>
            <FlightForm kind={fKind} />
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth: 200 }} size="small">
                <InputLabel id="demo-select-small">Cabin</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={cabinClass}
                    label="Class"
                    onChange={handleClass}
                >
                    <MenuItem value={"Economy"}>Economy</MenuItem>
                    <MenuItem value={"Premium Economy"}>Premium Economy</MenuItem>
                    <MenuItem value={"Business"}>Business</MenuItem>
                    <MenuItem value={"First"}>First</MenuItem>
                </Select>
            </FormControl >
            <FormControl sx={{ m: 1, minWidth: 120, maxWidth:150 }} size="small">
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
            <Button variant="contained" color="primary" sx={{ height: "50px", alignSelf: "center", color: "white", width: "95%", margin: "6px" }}>Find Your Flight</Button>
        </Box>
    )
}
