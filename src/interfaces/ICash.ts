import { IAppointments } from "./IAppointment";

export interface ICash{
    paymentMethod: string;
    appointment: string | undefined;
    total: number | undefined
}

export interface ICashed{
    paymentMethod: string;
    appointment: IAppointments | null;
    total: number,
    createdAt?: Date | null
}