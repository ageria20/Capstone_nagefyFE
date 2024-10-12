

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IAppointment {
    id?: string
    user: string;
    treatments: ITreatment[];
    staffMember: string | undefined;
    startDateTime: string;
    ednDateTime?: string
}


