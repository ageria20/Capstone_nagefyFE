import { ITreatment } from "./ITreatment";
import { IClient } from "./IUser";



// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IAppointment {
    id?: string
    user: string;
    treatments: ITreatment[];
    staff?: string;
    startTime: Date | string;
    endTime?: Date | string;
}

export interface IAppointments {
    id?: string
    user: IClient;
    treatmentsList: ITreatment[];
    staff: ISelectedStaff;
    startTime: Date;
    endTime?: Date;
    payed?: boolean
}

export interface IUpdateAppointment {
    id: string
    treatments: ITreatment[];
    staff: string;
    startTime: Date | string;
}

