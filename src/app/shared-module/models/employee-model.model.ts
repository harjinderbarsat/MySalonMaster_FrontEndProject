export class EmployeeModel {
    id: number
    adminId: number
    name: string;
    firstname: string;
    lastname: string;
    branchId: number;
    branchName: string;
    planStartDate: string;
    planEndDate: string;
    employeeUniqueId: string;
    email: string;
    designation: string;
    dateOfBirth: string;
    dateOfJoining: string;
    gender: string;
    address: string;
    mobile: string;
    status: string;
    isSelected: boolean;
    createdAt: string;
    updatedAt: string;
    username: string;
    password: string;
    passcode: string;
}

export class EmployeeAttendance {
    id: number;
    employeeCode: string;
    checkIn: string;
    checkOut: string;
    date: string;
    appointmentCashCollection: number;
    appointmentCardCollection: number;
    cardCollection: number;
    difference: number;
    productCashCollection: number;
    productCardCollection: number;

    isPosotiveDifference: boolean;
    isNegtiveDifference: boolean;
    reasonMessage: string;
}
