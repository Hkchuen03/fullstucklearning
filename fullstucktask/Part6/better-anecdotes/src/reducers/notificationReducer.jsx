import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {content: null},
    reducers: {
        notify(state, action) {
            state.content = action.payload
        },
        muteNotification(state, action) {
            state.content = null
        }
    }
})

export const { notify, muteNotification } = notificationSlice.actions
export default notificationSlice.reducer