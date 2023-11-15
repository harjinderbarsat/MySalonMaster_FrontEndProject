export class BranchModel {
    id: number;
    code: string;
    passcode: string;
    contact: string;
    email: string;
    slotForAppointment: number;
    address: string;
    openedOn: string;
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
    categoryId: number;
    services: Array<number>
}
