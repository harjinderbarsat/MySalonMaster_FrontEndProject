export class BranchModel {
    id: number;
    code: string;
    passcode: string;
    contact: string;
    email: string;
    slotForAppointment: number;
    address: string;
    opened_on: string;
    numberOfEmployee: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    branchName: string;
}
export class BranchPermissionModel {
    branchId: number;
    categories: Array<BranchPermissionCategoryModel>;
}
export class BranchPermissionCategoryModel {
    category_id: number;
    services: Array<number>
}
