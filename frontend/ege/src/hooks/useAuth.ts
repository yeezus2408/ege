import { useAppSelector } from "../store/hooks"


export const useAuth = (): boolean => {
    const isAuth = useAppSelector((state) => state.user.isAuth)
    return isAuth;
}


export const getUsername = (): string | undefined => {
    const username = useAppSelector((state) => state.user.user?.username);
    return username;
}