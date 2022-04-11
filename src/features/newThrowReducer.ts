import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Throw from './../models/throw'

//export type ThrowAction = { name: 'ADD', throw: Throw} | { name: 'RESET'}
// export const newThrowReducer = (state: Throw[] = [], action: ThrowAction) => {
//     if (action.name === 'ADD') {
//         return [...state, action.throw]
//     } else {
//         // action.name === RESET
//         return []
//     }
// }

export const newThrowSlice = createSlice({
    name: "newThrow",
    initialState: Array<Throw>(),
    reducers: {
        addThrow: (state, action: PayloadAction<Throw>) => {
            if (state.length === 3) {
                console.error("Error, trying to append throw when state already has three throws:", state)
                return state
            }
            const nextState = [...state, action.payload]
            console.log("Next State", nextState)
            return nextState
        },
        resetState: (_) => {
            return []
        }
    }
})

//export newThrowSlice