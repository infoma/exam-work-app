"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const attachment_entity_1 = require("./entities/attachment.entity");
const env_1 = require("../../config/env");
const fs = require("fs");
const path = require("path");
let FilesService = class FilesService {
    constructor(attachmentRepository) {
        this.attachmentRepository = attachmentRepository;
        if (!fs.existsSync(env_1.env.file.uploadDir)) {
            fs.mkdirSync(env_1.env.file.uploadDir, { recursive: true });
        }
    }
    async upload(file, bizType, bizId, userId) {
        const storageKey = `${(0, uuid_1.v4)()}_${file.originalname}`;
        const filePath = path.join(env_1.env.file.uploadDir, storageKey);
        fs.writeFileSync(filePath, file.buffer);
        const attachment = this.attachmentRepository.create({
            id: (0, uuid_1.v4)(),
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
    async getByBiz(bizType, bizId) {
        return this.attachmentRepository.find({
            where: { bizType, bizId },
            order: { createdAt: 'DESC' },
        });
    }
    async delete(id) {
        const attachment = await this.attachmentRepository.findOne({ where: { id } });
        if (!attachment)
            return null;
        const filePath = path.join(env_1.env.file.uploadDir, attachment.storageKey);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return this.attachmentRepository.remove(attachment);
    }
    getFile(storageKey) {
        const filePath = path.join(env_1.env.file.uploadDir, storageKey);
        if (!fs.existsSync(filePath))
            return null;
        return fs.readFileSync(filePath);
    }
};
exports.FilesService = FilesService;
exports.FilesService = FilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attachment_entity_1.Attachment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FilesService);
//# sourceMappingURL=files.service.js.map