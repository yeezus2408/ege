import { IComment, ICourses, ICreateCourse} from "../types/types";
import { instance } from "./axios.api";

export const CourseService = {
    async getAllCourses(): Promise<ICourses | undefined> {
        const { data } = await instance.get<ICourses>('course/all');
        if(data) return data;
    },


    async getCourseById( id: string): Promise<ICourses | undefined> {
        const { data } = await instance.get<ICourses>('course/getCourse/'+id);
        if(data) return data;
    },

    async addComment(courseId: string, comment: IComment): Promise<void> {
        await instance.post<void>(`course/${courseId}/comment`, comment);
    },


    async getCommentsByCourse(courseId: string): Promise<IComment | undefined> {
        const { data } = await instance.get<IComment>( `course/${courseId}/comments`);
        if( data ) return data;
    },


    async sendStar(courseId: string, star: number): Promise<void> {
        await instance.post<void>(`course/${courseId}/addStar?star=${star}`)
    },

    async createCourse(newCourse: ICreateCourse): Promise<string | undefined> {
        const { data } = await instance.post<string>('/course/create_course', newCourse);
        if( data ) return data;
    }

} 