export class AppointmentsModel {
    id: number
    serialNo: number

    customerId: number
    customerName: string
    customerContact: string
    isOnlineAppointment: string

    servicesIds: Array<number>
    servicesName: Array<string>

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
    assignToName: string;

    startedAt: string;
    completedAt: string;
    isFeedBackDone: boolean;

    allServiceCost: number;
    addOnServiceCost: number;
    otherCharges: number;
    totalCost: number;
    tax: number;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;

    isSelected: boolean;
    branchId: number;
    adminId: number;
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