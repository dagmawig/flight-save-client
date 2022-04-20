import React, { FC } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardMedia } from "@mui/material";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

interface IProps {
    data: {
        airline: string[],
        totPrice: number[],
        flightInfo: {
            sliceIDArr: number[],
            segmentIDArr: number[][],
            totDurationArr: number[],
            overnightArr: boolean[],
            cabinNameArr: string[],
            flightTimeArr: string[][],
            destAirArr: string[][],

        }
    }
}

export const SearchResult: FC<IProps> = ({ data }: IProps) => {

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <Card elevation={5} sx={{ width: "100%", margin: "auto" }}>
            <CardContent sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: 12 }} color="text.primary" gutterBottom>
                        <b>Nonstop</b> 2h 15m
                    </Typography>
                    <Typography sx={{ fontSize: 10 }} color="text.primary" gutterBottom>
                        <b>Main Cabin</b>
                    </Typography>
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <CardMedia component="img" image={process.env.PUBLIC_URL + '/image/airline.jpg'} sx={{ height: 40, maxWidth: 50, objectFit: "contain", border: 1, borderColor: "grey.500" }} />
                    <Box sx={{ display: "flex", width: "240px", justifyContent: "space-between", alignItems: "center", backgroundColor: "#03a9f4", padding: "5px", borderRadius:"5px"}}>
                        <Box sx={{height: "1px", backgroundColor:"#212121", position: "absolute", width: "240px", zIndex:0}}></Box>
                        <Box sx={{ width:"40px", backgroundColor: "#03a9f4", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography sx={{ fontSize: 14, fontWeight: "bold", marginBottom: 0 }} color="text.primary" gutterBottom>
                                7:00a
                            </Typography>
                            <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                                STL
                            </Typography>
                        </Box>

                        <Button size="small" sx={{backgroundColor: "#b3e5fc", textTransform: "none", minHeight:0, minWidth:0, padding:.25}} aria-describedby={id} variant="contained" onClick={handleClick}>
                            <Box sx={{  display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Typography sx={{ fontSize: 10, marginBottom: 0 }} color="text.primary" gutterBottom>
                                    CLT
                                </Typography>
                                <Typography sx={{ fontSize: 10 }} color="text.primary" gutterBottom>
                                    33m
                                </Typography>
                            </Box>
                        </Button>
                        <Popover
                            disableScrollLock ={true}
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Typography sx={{ p: 1, fontSize: 12 }}>33m layover <br/> @ CLT airport</Typography>
                        </Popover>

                        <Button size="small" sx={{backgroundColor: "#b3e5fc", textTransform: "none", minHeight:0, minWidth:0, padding:.25}} aria-describedby={id} variant="contained" onClick={handleClick}>
                            <Box sx={{  display: "flex", flexDirection: "column", alignItems: "center" }}>
                                <Typography sx={{ fontSize: 10, marginBottom: 0 }} color="text.primary" gutterBottom>
                                    CLT
                                </Typography>
                                <Typography sx={{ fontSize: 10 }} color="text.primary" gutterBottom>
                                    33m
                                </Typography>
                            </Box>
                        </Button>
                        <Popover
                            disableScrollLock ={true}
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Typography sx={{ p: 1, fontSize: 12 }}>33m layover <br/> @ CLT airport</Typography>
                        </Popover>

                        <Box sx={{ width:"40px", backgroundColor: "#03a9f4", zIndex: 2,  display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography sx={{ fontSize: 14, fontWeight: "bold", marginBottom: 0 }} color="text.primary" gutterBottom>
                                12:41p
                            </Typography>
                            <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
                                LGA
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", }}>
                        <Typography sx={{ fontSize: 18, fontWeight: "bold", color: "success.main", marginBottom: 0 }} gutterBottom>
                            $216
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


