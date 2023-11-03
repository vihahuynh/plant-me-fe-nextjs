import { createSlice } from "@reduxjs/toolkit";

const initState = {
    message: '',
    type: 'info'
}

const alertSlice = createSlice({
    name: 'alert',
    initialState: initState,
    reducers: {
        updateMessage(state, action) {
            state.message = action.payload.message
            state.type = action.payload.type
        },
        clear(state) {
            state.message = ''
            state.type = 'info'
        }
    }
})

export default alertSlice