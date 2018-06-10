import { Role } from 'app/admin/_models';

export class UserInfo {
    userID: string;
    userName: string;
    registrationDate: any;
    email: string;
    avatar: string;
    score: number;
    status: number;
    address: string;
    phoneNumber: string;
    permission: Role[];
    lastPasswordResetDate: any;
}
