import { UsersService } from './users.service';
import { User } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<{
        id: string;
        username: string;
        realName: string;
        phone: string;
        orgId: string;
        status: import("./entities/user.entity").UserStatus;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        username: string;
        realName: string;
        phone: string;
        orgId: string;
        status: import("./entities/user.entity").UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(data: Partial<User>): Promise<{
        id: string;
        username: string;
        realName: string;
        phone: string;
    }>;
    update(id: string, data: Partial<User>): Promise<{
        id: string;
        username: string;
        realName: string;
        phone: string;
    }>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
}
