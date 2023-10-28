export class BranchModel {
    id: number;
    code: string;
    passcode: string;
    contact: string;
    email: string;
    slot_for_appointment: number;
    address: string;
    opened_on: string;
    number_of_employee: number;
    status: string;
    created_at: string;
    updatedAt: string;
    branch_name: string;
}
export class BranchPermissionModel {
    branchId: number;
    categories: Array<BranchPermissionCategoryModel>;
}
export class BranchPermissionCategoryModel {
    category_id: number;
    services: Array<number>
}
