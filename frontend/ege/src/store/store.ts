import { configureStore } from "@reduxjs/toolkit"
import reducer from "./user/userSlice"
export const store = configureStore({
    reducer: {
        user: reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch