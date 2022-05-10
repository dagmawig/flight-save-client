import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface SearchResult {
    populated: boolean,
    totPrice: number[],
    airline: string[],
    flightInfo: {
        sliceIDArr: number[],
        segmentIDArr: number[][],
        totDurationArr: number[],
        overnightArr: boolean[],
        cabinNameArr: string[],
        flightTimeArr: string[][],
        airArr: string[][][],
        airCodeArr: string[][][]
    }
}

export interface SavedSearch {
    name: string,
    classType: string,
    alertPrice: string,
    date_departure: string,
    location_departure: string,
    location_arrival: string,
    number_of_stops: string,
    searchResult: SearchResult
}

interface UserData {
    searchInfo: {
        departCity: string,
        arrCity: string,
        departDate: string | null,
        departDString: string,
        cabinClass: string,
        stops: string,
    },
    saveModal: {
        flightName: string,
        alertPrice: string | null
    },
    searchResult: SearchResult
    savedSearch: SavedSearch[],
    resultView: boolean,
    loading: boolean,
    saved: boolean
}

interface CabinClass {

}

const initialState: UserData = {
    searchInfo: {
        departCity: '',
        arrCity: '',
        departDate: new Date().toISOString(),
        departDString: '',
        cabinClass: 'ECO',
        stops: '0'
    },
    saveModal: {
        flightName: '',
        alertPrice: null
    },
    searchResult: {
        populated: false,
        totPrice: [],
        airline: [],
        flightInfo: {
            sliceIDArr: [],
            segmentIDArr: [],
            totDurationArr: [],
            overnightArr: [],
            cabinNameArr: [],
            flightTimeArr: [],
            airArr: [],
            airCodeArr: [],
        }
    },
    savedSearch: [],
    resultView: false,
    loading: false,
    saved: false
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
        },
        changeResult: (state, action: PayloadAction<any>) => {
            state.searchResult = action.payload
        },
        changeSavedSearch: (state, action: PayloadAction<SavedSearch[]>) => {
            state.savedSearch = action.payload
        },
        changeFlightName: (state, action: PayloadAction<string>) => {
            state.saveModal.flightName = action.payload
        },
        changeAlertPrice: (state, action: PayloadAction<string>) => {
            state.saveModal.alertPrice = action.payload
        },
        changeDepDString: (state, action: PayloadAction<string>) => {
            state.searchInfo.departDString = action.payload
        },
        changeSaved: (state, action: PayloadAction<boolean>) => {
            state.saved = action.payload
        },
    }
})


export const { setCabin, setStops, setDepCity, setArrCity, setDepDate, changeView, changeLoading, changeResult, changeSavedSearch, changeAlertPrice, changeFlightName, changeDepDString, changeSaved } = flightSlice.actions

export default flightSlice.reducer

