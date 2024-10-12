/* eslint-disable @typescript-eslint/no-unused-vars */

interface IUser {
    id?: string;
    name: string;
    surname: string;
    telephone: string;
    email: string;
    password?: string
    role?: string
    avatar?: string
}
interface INewUser {
    id?:string
    name: string;
    surname: string;
    telephone: string;
    email: string;
}

interface IClient {
    id:string
    name: string;
    surname: string;
    telephone: string;
    email: string;
}

interface IEvents {
    id: string | undefined;
    title: string;
    start: Date;
    end: Date;
    staff: string
}


