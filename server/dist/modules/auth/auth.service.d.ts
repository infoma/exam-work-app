import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            username: string;
            realName: string;
            phone: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        user: {
            id: string;
            username: string;
            realName: string;
            phone: string;
        };
    }>;
    validateUser(userId: string): Promise<User>;
    getCurrentUser(userId: string): Promise<{
        id: string;
        username: string;
        realName: string;
        phone: string;
        orgId: string;
        status: import("../users/entities/user.entity").UserStatus;
    }>;
}
