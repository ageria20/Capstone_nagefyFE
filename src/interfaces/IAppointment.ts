import { IClient } from "./IUser";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IAppointment {
    id?: string
    user: IClient;
    treatments: ITreatment[];
    staff: ISelectedStaff;
    startDateTime: string;
    ednDateTime?: string
}


