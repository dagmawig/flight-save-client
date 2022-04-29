import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
 
interface UserData {
    searchInfo: {
        departCity: string,
        arrCity: string,
        departDate: string | null,
        cabinClass: string,
        stops: string,
    },
    resultView: boolean,
    loading: boolean
}

interface CabinClass {

}

const initialState: UserData = {
    searchInfo: {
        departCity: '',
        arrCity: '',
        departDate: new Date().toISOString(),
        cabinClass: 'ECO',
        stops: '0'
    },
    resultView: false,
    loading: false
}

export const flightSlice = createSlice({
    name: 'flight',
    initialState,
    reducers: {
        setCabin: (state, action: PayloadAction<string>) => {
            state.searchInfo.cabinClass = action.payload
        },
        setStops: (state, action: PayloadAction<string>) => {
            state.searchInfo.stops = action.payload
        },
        setDepCity: (state, action: PayloadAction<string>) => {
            state.searchInfo.departCity = action.payload
        },
        setArrCity: (state, action: PayloadAction<string>) => {
            state.searchInfo.arrCity = action.payload
        },
        setDepDate: (state, action: PayloadAction<string | null>) => {
            state.searchInfo.departDate = action.payload
        },
        changeView: (state, action: PayloadAction<boolean>) => {
            state.resultView = action.payload
        },
        changeLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})


export const { setCabin, setStops, setDepCity, setArrCity, setDepDate, changeView, changeLoading } = flightSlice.actions

export default flightSlice.reducer

