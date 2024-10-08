/* eslint-disable @typescript-eslint/no-unused-vars */

interface IUser {
    id?: string;
    name: string;
    surname: string;
    telephone: string;
    email: string;
    password?: string
}

interface IEvents {
    id?: string
    title: string;
    allDay?: boolean;
    start: Date | null,
    end: Date | null
}


