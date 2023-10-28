export class AppointmentsModel {
    id: number
    serialNo: number

    customerId: number
    customer_name: string
    customerContact: string
    isOnlineAppointment: string

    servicesIds: Array<number>
    services_name: Array<string>

    addtionalServiceIds: Array<number>
    addtionalServiceNames: Array<string>

    startDate: string;
    endDate: string;

    dateAndTime: string;
    hours: string;
    mintues: string;
    amPM: string;

    status: string;

    payment: string;
    paymentType: string;

    assignToId: number;
    employeeUniqueId: string;
    assign_to_name: string;

    startedAt: string;
    completedAt: string;
    isFeedBackDone: boolean;

    allServiceCost: number;
    addOnServiceCost: number;
    otherCharges: number;
    totalCost: number;
    tax: number;
    totalAmount: number;
    created_at: string;
    updated_at: string;

    isSelected: boolean;
    branch_id: number;
    admin_id: number;
}


export enum AppointmentStatus {
    upcoming = 'upcoming',
    InProgress = 'in-Progress',
    Completed = 'historic',
    Online = 'online'
}

export enum paymentStatus {
    Pending = 1,
    Done = 2,
}