/* eslint-disable @typescript-eslint/no-unused-vars */

import { stringOrDate } from "react-big-calendar";

export interface IUser {
    id?: string;
    name: string;
    surname: string;
    telephone: string;
    email: string;
    password?: string
    role?: string
    avatar?: string
}
export interface INewUser {
    id?:string
    name: string;
    surname: string;
    telephone: string;
    email: string;
}

export interface IClient {
    id:string
    name: string;
    surname: string;
    telephone: string;
    email: string;
}

export interface IEvents {
    id?: number ;
    title: string;
    start: Date;
    end: Date;
    staff: string
}


