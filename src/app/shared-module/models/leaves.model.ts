export class LeavesModel {
    id: number;
    employee_id: number;
    employeeName: string;
    branch_name: string;
    status: string;
    isSelected: boolean;
    days: number;
    type: string;
    leaveType: string;
    startFrom: string;
    endAt: string;
    applyDate: string;
    approvedDate: string;
    isHalfDay: boolean;
    isShortLeave: boolean;

    created_at: string;
}

export enum Leaves_Status {
    Pending = 1,
    Approved = 2,
    Rejected = 3
}

export enum Leaves_Type {
    Earned = 1,
    Casual = 2,
    Sick = 3,
    Maternity = 4,
    Marriage = 5,
    Paternity = 6,
    Bereavement = 7
}