

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IAppointment {
    id?: string
    user: IClient | null;
    treatments: ITreatment[];
    staffMember: string | undefined;
    startDateTime: string;
    ednDateTime?: Date
}

interface IAppointmentGet{
    id?: string
    user: IClient | null;
    treatments: ITreatment[];
    staffMember: string | undefined;
    startDateTime: string;
    ednDateTime: Date
}


