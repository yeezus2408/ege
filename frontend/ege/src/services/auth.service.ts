import { INewUserData, IResponseUserData, IUser, IUserLogin } from "../types/types";
import { instance } from "./axios.api";

export const AuthService = {
    async registration(userData: INewUserData) : Promise<IResponseUserData> {
        const { data } = await instance.post<IResponseUserData>('user/signUp', userData)
        return data;
    },


    async auth(userData: IUserLogin) : Promise<IUser> {
        const { data } = await instance.post<IUser>('user/signIn', userData);
        return data;
    },

    async getMe(): Promise<IUser | undefined> {
        const { data } = await instance.get<IUser>('user/getCurrentUser');
        if(data) return data;
    }
} 