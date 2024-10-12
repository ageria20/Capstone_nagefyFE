
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface IStaff{
    id?: string;
    name: string;
    surname: string;
    telephone: string;
    email: string;
    password?: string;
    role?: string
    avatar?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface INewStaff{
    id?: string
    name: string;
    surname: string;
    telephone: string;
    email: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ISelectedStaff{
    id: string
    name: string;
    surname: string;
    telephone: string;
    email: string;
}