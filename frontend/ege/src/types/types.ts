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


export interface ILesson {
    id: string, 
    title: string,
    description: string,
    content: string
}


export interface IComment {
    author: string,
    content: string
}

export interface ICourses {
    id: string,
    name: string,
    price: number,
    description: string,
    status: string,
    author_id: string,
    lessons: Array<ILesson>,
    comments: Array<IComment>
}

