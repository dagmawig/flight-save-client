import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface SavedSearch {
    searchInfo: {
        departCity: string,
        arrCity: string,
        departDate: string | null,
        cabinClass: string,
        stops: string,
    },
    flightName: string,
    minPrice: number,
    alertPrice: number
}

interface UserData {
    searchInfo: {
        departCity: string,
        arrCity: string,
        departDate: string | null,
        cabinClass: string,
        stops: string,
    },
    searchResult: {
        populated: boolean,
        dep: {
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
    },
    savedSearch: SavedSearch[],
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
    searchResult: {
        populated: false,
        dep: {
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
                airCodeArr: []
            }
        }
    },
    savedSearch: [
        {
            searchInfo: {
                departCity: 'STL',
                arrCity: 'NYC',
                departDate: '2022-06-01T02:39:29.000Z',
                cabinClass: 'ECO',
                stops: '0'
            },
            flightName: 'Flight to NYC',
            minPrice: 215,
            alertPrice: 200
        }
    ],
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
        },
        changeResult: (state, action: PayloadAction<any>) => {
            state.searchResult = action.payload
        },
        changeSavedSearch: (state, action: PayloadAction<SavedSearch[]>) => {
            state.savedSearch = action.payload
        }
    }
})


export const { setCabin, setStops, setDepCity, setArrCity, setDepDate, changeView, changeLoading, changeResult, changeSavedSearch } = flightSlice.actions

export default flightSlice.reducer

