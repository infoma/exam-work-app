import { FilesService } from './files.service';
import { BizType } from './entities/attachment.entity';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    upload(file: Express.Multer.File, bizType: BizType, bizId: string, req: any): Promise<import("./entities/attachment.entity").Attachment>;
    getByBiz(bizType: BizType, bizId: string): Promise<import("./entities/attachment.entity").Attachment[]>;
    delete(id: string): Promise<{
        success: boolean;
    }>;
    download(storageKey: string): Promise<{
        file: NonSharedBuffer;
        storageKey: string;
    }>;
}
