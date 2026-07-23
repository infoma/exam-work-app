import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { StaffTraining } from './entities/staff-training.entity';
import { StaffAssignment } from './entities/staff-assignment.entity';
export declare class StaffsService {
    private staffRepository;
    private trainingRepository;
    private assignmentRepository;
    constructor(staffRepository: Repository<Staff>, trainingRepository: Repository<StaffTraining>, assignmentRepository: Repository<StaffAssignment>);
    create(dto: any, userId: string): Promise<Staff>;
    findAll(filters: {
        department?: string;
        status?: string;
        role?: string;
        isQualified?: string;
    }): Promise<Staff[]>;
    findOne(id: string): Promise<Staff>;
    update(id: string, dto: any): Promise<Staff>;
    remove(id: string): Promise<Staff>;
    createTraining(staffId: string, dto: any): Promise<StaffTraining>;
    findTrainings(staffId: string): Promise<StaffTraining[]>;
    findOneTraining(trainingId: string): Promise<StaffTraining>;
    updateTraining(trainingId: string, dto: any): Promise<StaffTraining>;
    removeTraining(trainingId: string): Promise<StaffTraining>;
    createAssignment(staffId: string, dto: any): Promise<StaffAssignment>;
    findAssignments(staffId: string): Promise<StaffAssignment[]>;
    findOneAssignment(assignmentId: string): Promise<StaffAssignment>;
    updateAssignment(assignmentId: string, dto: any): Promise<StaffAssignment>;
    removeAssignment(assignmentId: string): Promise<StaffAssignment>;
}
