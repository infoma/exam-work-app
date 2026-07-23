import { StaffsService } from './staffs.service';
export declare class StaffsController {
    private readonly staffsService;
    constructor(staffsService: StaffsService);
    create(dto: any, req: any): Promise<import("./entities/staff.entity").Staff>;
    findAll(department?: string, status?: string, role?: string, isQualified?: string): Promise<import("./entities/staff.entity").Staff[]>;
    findOne(id: string): Promise<import("./entities/staff.entity").Staff>;
    update(id: string, dto: any): Promise<import("./entities/staff.entity").Staff>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
    createTraining(staffId: string, dto: any): Promise<import("./entities/staff-training.entity").StaffTraining>;
    findTrainings(staffId: string): Promise<import("./entities/staff-training.entity").StaffTraining[]>;
    findOneTraining(trainingId: string): Promise<import("./entities/staff-training.entity").StaffTraining>;
    updateTraining(trainingId: string, dto: any): Promise<import("./entities/staff-training.entity").StaffTraining>;
    removeTraining(trainingId: string): Promise<{
        success: boolean;
    }>;
    createAssignment(staffId: string, dto: any): Promise<import("./entities/staff-assignment.entity").StaffAssignment>;
    findAssignments(staffId: string): Promise<import("./entities/staff-assignment.entity").StaffAssignment[]>;
    findOneAssignment(assignmentId: string): Promise<import("./entities/staff-assignment.entity").StaffAssignment>;
    updateAssignment(assignmentId: string, dto: any): Promise<import("./entities/staff-assignment.entity").StaffAssignment>;
    removeAssignment(assignmentId: string): Promise<{
        success: boolean;
    }>;
}
