import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "../../types/types"
import { RootState } from "../store"

interface UserState {
    user: IUser | null,
    isAuth: boolean,
    id: string,
}

// Define the initial state using that type
const initialState: UserState = {
    user: null,
    isAuth: false,
    id: '',
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    login: (state, action:PayloadAction<IUser>) => {
        state.user = action.payload,
        state.isAuth = true,
        state.id = action.payload.id
    },
    logout: (state) => {
        state.isAuth = false,
        state.user = null,
        state.id = ''
    }
  },
})

export const { login, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer