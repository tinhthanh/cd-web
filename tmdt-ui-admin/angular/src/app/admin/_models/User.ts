import { Role } from './Role';
export class User {
   userID: string;
    userName: string;
    registrationDate: any;
    email: string;
    avatar: string;
    password: string;
    score: number;
    status: number;
    address: string;
    phoneNumber: string;
    permission: any[];  // role[]
    lastPasswordResetDate: any;
}
