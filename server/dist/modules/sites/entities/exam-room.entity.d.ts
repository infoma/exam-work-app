export type RoomStatus = 'ready' | 'occupied' | 'abnormal' | 'closed';
export declare class ExamRoom {
    id: string;
    siteId: string;
    roomNo: string;
    capacity: number;
    floor: string;
    status: RoomStatus;
    checkResult: string;
    createdAt: Date;
    updatedAt: Date;
}
