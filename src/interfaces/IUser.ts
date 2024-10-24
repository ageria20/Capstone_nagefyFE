/* eslint-disable @typescript-eslint/no-unused-vars */

import { ITreatment } from "./ITreatment";

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
    id?: string ;
    title: string;
    start: Date;
    end: Date;
    staff: string,
    isPayed?: boolean;
    treatmentsList: ITreatment[]
}

export interface IEventParams{
    event: IEvents;
    start: string | Date;
    end: string | Date
}


