export type UserStatus = 'active' | 'inactive';
export declare class User {
    id: string;
    phone: string;
    username: string;
    passwordHash: string;
    realName: string;
    orgId: string;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
