import { Box, Button, Card, CardContent, Typography, Chip, Modal } from "@mui/material";
import React, { FC } from "react";
import { useAppDispatch, useAppSelector } from './hooks'
import { SavedSearch } from "./flightSlice";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import { changeSavedSearch } from "./flightSlice";

interface IProps {
    data: SavedSearch,
    itemNo: number
}
const SavedSearchItem: FC<IProps> = ({ data, itemNo }: IProps) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useAppDispatch();
    let savedArr = useAppSelector(state => state.flight.savedSearch);
    function handleSearch() {

    }
    function handleDelete() {
        savedArr.splice(itemNo, 1)
        dispatch(changeSavedSearch(savedArr))
    }
    console.log("saves s", data)
    return (
        <Card elevation={5} sx={{ width: "95%", margin: "auto",  my: "3px", fontSize: 14, borderRadius: 10 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", backgroundColor: (itemNo % 2 === 0) ? "#e0e0e0" : '' }}>
                <Box sx={{ display: "flex", justifyContent: "right", alignItems: "center", padding: "3px" }}>
                    <Chip sx={{ width: '40px', paddingLeft: "10px" }} icon={<DeleteIcon />} label="" color="error" onClick={handleOpen} />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px" }}>
                    <Typography sx={{ fontSize: "inherit" }}>
                        <Chip label={data.flightName} color="primary" variant="outlined" />
                    </Typography>
                    <Typography sx={{ fontSize: "inherit" }}>
                        <Chip color="primary" sx={{ width: "100px", paddingLeft: "20px" }} icon={<>{data.searchInfo.departCity} <FlightTakeoffIcon />{data.searchInfo.arrCity}</>} variant="outlined" />
                    </Typography>
                    <Typography sx={{ fontSize: "inherit" }}>
                        <Chip icon={<CalendarMonthIcon />} color="primary" label="2022-06-30" variant="outlined" />
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-around", padding: "3px" }}>
                    <Typography sx={{ fontSize: "inherit" }}>
                        <Chip label={`MIN PRICE: $${data.minPrice}`} color="primary" variant="outlined" />
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
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{display: "flex", justifyContent: "left"}}>
                    <Chip icon={<DeleteIcon />} color="primary" label="Delete Saved Search?" variant="outlined" />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, display: "flex", justifyContent: "space-around"}}>
                    <Chip label="NO" color="primary" onClick={handleClose} /><Chip label="YES" color="error" onClick={handleDelete} />
                    </Typography>
                </Box>
            </Modal>
        </Card>
    )

}
export default function SavedSearchBox() {

    const savedResultArr: SavedSearch[] = useAppSelector(state => state.flight.savedSearch);

    const SavedSearchList = savedResultArr.map((savedItem, ind) => {
        return (
            <SavedSearchItem data={savedItem} itemNo={ind} />
        )
    })

    return (
        <Box sx={{  width: "100%", my: 0, mx: "auto", padding: 0, margin: 0, height: "calc(100vh - 80px)", overflowY: "hidden", display: "flex", flexDirection:"column" }}>
            <Box sx={{ position: "fixed", top: "50px", bottom: 0, left: 0, right: 0, zIndex: 5, width: "99%", height: "30px", display: "flex", justifyContent: 'center', alignItems: "center", padding: "5px", margin: 0, backgroundColor: "rgba(255,255,255, 1)" }} >
                <Chip size="small" label="SAVED SEARCHES" sx={{backgroundColor: "info.main", fontWeight: "bold", color: "white"}} /></Box>
            <Box sx={{ maxHeight: "calc(100vh - 110px)", display: "flex", overflowY: "auto", marginTop: "30px" }}>
            {SavedSearchList}
            </Box>
        </Box>
    )
}
