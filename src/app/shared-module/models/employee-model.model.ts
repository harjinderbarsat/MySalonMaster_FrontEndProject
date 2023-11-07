export class EmployeeModel {
    id: number
    adminId: number
    name: string;
    firstname: string;
    lastname: string;
    branch_name: string;
    planStartDate: string;
    planEndDate: string;
    employeeUniqueId: string;
    email: string;
    designation: string;
    date_of_birth: string;
    dateOfJoining: string;
    gender: string;
    address: string;
    mobile: string;
    status: string;
    isSelected: boolean;
    created_at: string;
    updated_at: string;
    username: string;
    password: string;
    admin_id: number;
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
