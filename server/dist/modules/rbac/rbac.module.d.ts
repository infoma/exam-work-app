import { OnModuleInit } from '@nestjs/common';
import { RbacService } from './rbac.service';
export declare class RbacModule implements OnModuleInit {
    private rbacService;
    constructor(rbacService: RbacService);
    onModuleInit(): Promise<void>;
}
