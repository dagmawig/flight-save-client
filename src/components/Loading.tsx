import { Box, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector} from './hooks'

export default function Loading() {
    const loading = useAppSelector(state=>state.flight.loading);

    return (
        <Box sx={{display: loading? "flex" : "none", position: "fixed", left: 0, top: "50px", width: "100%", height: "100%", padding: 0, backgroundColor: "#90caf9", zIndex: 1052, paddingTop: "150px", justifyContent: "center", opacity: .5}}>
            <CircularProgress color="primary" sx={{}} />
        </Box>
    )
}