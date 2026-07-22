import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RbacService } from '../rbac/rbac.service';
export declare class DataInitModule implements OnModuleInit {
    private userRepository;
    private rbacService;
    constructor(userRepository: Repository<User>, rbacService: RbacService);
    onModuleInit(): Promise<void>;
}
