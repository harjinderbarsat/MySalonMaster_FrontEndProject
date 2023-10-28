export class ResponseModel<T> { 
    public isSuccess: boolean;
    public token: string;
    public message: string;
    public count: number;
    public error: any; 
    public data: T;
}


 