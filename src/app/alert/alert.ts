export enum AlertType {
    Success,
    Error,
    Info,
    Warning,
}

export class Alert {
    public id: string | undefined;
    public type: AlertType | undefined;
    public message: string | undefined;
    public duration: number | undefined;
    public date: Date | undefined;
    constructor(init?: Partial<Alert>) {
        Object.assign(this, init);
    }
}
