// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ITimeSlot {
    from: string;
    to: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface DaySchedule{
    day: string;
    open: boolean;
    hours: ITimeSlot[];
    pauses?: ITimeSlot[];
    closed?: boolean;
}


