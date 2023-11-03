export class LoginModel {
    username: string;
    password: string;
}

export class LoginResponse {
    access_token: string;
    expires_in: string;
    refresh_token: string;
    token_type: string;
    message: string;
}

export class ResetPassword {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}

export enum user_type {
    admin,
    branch,
    employee
}
export class User {
    admin: string;
    username: string;
    userType: string;
    name: string;
    id: number;
    email: string;
    employeeId: number;
    createdAt: string;
    branchId: number;
}