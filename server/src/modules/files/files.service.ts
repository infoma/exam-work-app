import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Attachment, BizType } from './entities/attachment.entity';
import { env } from '../../config/env';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>,
  ) {
    if (!fs.existsSync(env.file.uploadDir)) {
      fs.mkdirSync(env.file.uploadDir, { recursive: true });
    }
  }

  async upload(file: Express.Multer.File, bizType: BizType, bizId: string, userId: string) {
    const storageKey = `${uuidv4()}_${file.originalname}`;
    const filePath = path.join(env.file.uploadDir, storageKey);
    
    fs.writeFileSync(filePath, file.buffer);

    const attachment = this.attachmentRepository.create({
      id: uuidv4(),
      bizType,
      bizId,
      fileName: file.originalname,
      fileType: file.mimetype,
      fileSize: file.size,
      storageKey,
      uploaderId: userId,
    });

    return this.attachmentRepository.save(attachment);
  }

  async getByBiz(bizType: BizType, bizId: string) {
    return this.attachmentRepository.find({
      where: { bizType, bizId },
      order: { createdAt: 'DESC' },
    });
  }

  async delete(id: string) {
    const attachment = await this.attachmentRepository.findOne({ where: { id } });
    if (!attachment) return null;

    const filePath = path.join(env.file.uploadDir, attachment.storageKey);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return this.attachmentRepository.remove(attachment);
  }

  getFile(storageKey: string) {
    const filePath = path.join(env.file.uploadDir, storageKey);
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath);
  }
}