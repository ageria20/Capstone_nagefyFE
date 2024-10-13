import { IClient } from "./IUser";



// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IAppointment {
    id?: string
    user: string;
    treatments: ITreatment[];
    staff?: string;
    startTime: Date;
    endTime?: Date
}

export interface IAppointments {
    id?: string
    user: IClient;
    treatments: ITreatment[];
    staff: ISelectedStaff;
    startTime: Date;
    endTime?: Date
}

