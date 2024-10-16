import { IAppointments } from "./IAppointment";

export interface ICash{
    paymentMethod: string;
    appointment: string;
}

export interface ICashed{
    paymentMethod: string;
    appointment: IAppointments;
    total: number
}