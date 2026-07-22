import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            username: string;
            realName: string;
            phone: string;
        };
    }>;
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            username: string;
            realName: string;
            phone: string;
        };
    }>;
    getCurrentUser(req: any): Promise<{
        id: string;
        username: string;
        realName: string;
        phone: string;
        orgId: string;
        status: import("../users/entities/user.entity").UserStatus;
    }>;
}
