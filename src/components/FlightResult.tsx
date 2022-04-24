import React, { FC } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardMedia } from "@mui/material";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

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

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
            if(ind===0) return null;
            const t2 = new Date(data.flightInfo.flightTime[2*ind]).getTime()/1000;
            const t1 = new Date(data.flightInfo.flightTime[(2*ind)-1]).getTime()/1000;
            const timeDiff  = Math.floor((t2-t1)/60);
            const h = Math.floor(timeDiff/60);
            const min = timeDiff%60;
            return (<div key={"lay"+ind}>
                <Button key={"popB"+ind} size="small" sx={{ backgroundColor: "#b3e5fc", textTransform: "none", minHeight: 0, minWidth: 0, padding: .25 }} aria-describedby={id} variant="contained" onClick={handleClick}>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography sx={{ fontSize: 10, marginBottom: 0 }} color="text.primary" gutterBottom>
                            {airport[0]}
                        </Typography>
                        <Typography sx={{ fontSize: 10 }} color="text.primary" gutterBottom>
                            {`${(h!==0)? `${h}h `: ''}${(min!==0)? `${min}m`: ''}`}
                        </Typography>
                    </Box>
                </Button>
                <Popover
                key={"pop"+ind}
                    disableScrollLock={true}
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Typography sx={{ p: 1, fontSize: 12 }}> {`${(h!==0)? `${h}h `: ''}${(min!==0)? `${min}m`: ''}`} layover <br /> @ {data.flightInfo.air[ind][0]}</Typography>
                </Popover>
            </div>)
        })
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
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
            <CardContent sx={{ display: "flex", flexDirection: "column", backgroundColor: (data.itemNo%2===0)? "#e0e0e0": ''}}>
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

