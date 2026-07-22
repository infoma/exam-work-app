import { Repository } from 'typeorm';
import { Attachment, BizType } from './entities/attachment.entity';
export declare class FilesService {
    private attachmentRepository;
    constructor(attachmentRepository: Repository<Attachment>);
    upload(file: Express.Multer.File, bizType: BizType, bizId: string, userId: string): Promise<Attachment>;
    getByBiz(bizType: BizType, bizId: string): Promise<Attachment[]>;
    delete(id: string): Promise<Attachment>;
    getFile(storageKey: string): NonSharedBuffer;
}
