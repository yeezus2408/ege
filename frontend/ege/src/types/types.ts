export interface IUser {
    email: string,
    username: string,
    token: string,
    id: string,
    courses: Array<any>
}


export interface INewUserData {
    email: string, 
    username: string,
    password: string
}


export interface IResponseUserData {
    username: string, 
    email: string,
    password: string
}


export interface IUserLogin {
    email: string,
    password: string
}