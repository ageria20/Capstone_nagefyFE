
interface IUser {
    name: string;
    surname: string;
    telephone: string;
    email: string;
}

interface IEvents {
    title: string;
    allDay?: boolean;
    start: Date | null,
    end: Date | null
}


