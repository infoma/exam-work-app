"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const env_1 = require("../../config/env");
let AiService = AiService_1 = class AiService {
    constructor() {
        this.logger = new common_1.Logger(AiService_1.name);
    }
    async generateSummary(prompt, context) {
        if (env_1.env.ai.provider === 'mock' || !env_1.env.ai.apiKey) {
            return this.mockSummary(prompt, context);
        }
        try {
            return await this.callOpenAiCompatible(prompt, context);
        }
        catch (error) {
            this.logger.error('AI 调用失败，使用 mock 模式', error.message);
            return this.mockSummary(prompt, context);
        }
    }
    async callOpenAiCompatible(prompt, context) {
        const baseUrl = env_1.env.ai.baseUrl.replace(/\/$/, '');
        const url = `${baseUrl}/chat/completions`;
        const messages = [
            {
                role: 'system',
                content: '你是一个专业的考试工作分析助手，善于从复杂的考务数据中提炼关键信息，生成条理清晰、重点突出的总结报告。',
            },
            {
                role: 'user',
                content: `${prompt}\n\n以下是相关数据：\n${context}`,
            },
        ];
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env_1.env.ai.apiKey}`,
            },
            body: JSON.stringify({
                model: env_1.env.ai.model,
                messages,
                temperature: 0.7,
                max_tokens: 2000,
            }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new common_1.InternalServerErrorException(`AI API 调用失败: ${response.status} ${errorText}`);
        }
        const data = await response.json();
        return data.choices?.[0]?.message?.content || '';
    }
    mockSummary(prompt, context) {
        try {
            const data = JSON.parse(context);
            const exam = data.exam || {};
            const sites = data.sites || [];
            const tasks = data.tasks || { total: 0, completed: 0, inProgress: 0, pending: 0, overdue: 0 };
            const incidents = data.incidents || { total: 0, normal: 0, important: 0, major: 0, closed: 0, open: 0, list: [] };
            const completionRate = tasks.total > 0 ? Math.round(tasks.completed / tasks.total * 100) : 0;
            let summary = `# AI 智能总结 - ${exam.name || '考试工作'}\n\n`;
            summary += `## 📊 整体评估\n\n`;
            if (completionRate >= 90 && incidents.open === 0) {
                summary += `本次考试组织工作**整体优秀**，任务完成率达到 ${completionRate}%，所有异常均已闭环处理，各项工作推进顺利。\n\n`;
            }
            else if (completionRate >= 70) {
                summary += `本次考试组织工作**整体良好**，任务完成率为 ${completionRate}%，大部分工作已按计划推进，仍有部分事项需跟进。\n\n`;
            }
            else {
                summary += `本次考试组织工作**需加强推进**，当前任务完成率为 ${completionRate}%，建议重点关注未完成事项的进度管控。\n\n`;
            }
            summary += `## 🎯 关键指标\n\n`;
            summary += `- **考点数量**：${sites.length} 个\n`;
            summary += `- **任务总数**：${tasks.total} 项\n`;
            summary += `- **完成率**：${completionRate}%\n`;
            summary += `- **异常总数**：${incidents.total} 起\n`;
            summary += `- **未闭环异常**：${incidents.open} 起\n\n`;
            if (incidents.major > 0) {
                summary += `## ⚠️ 重点关注\n\n`;
                summary += `存在 **${incidents.major} 起重大异常**，需高度重视并尽快闭环：\n\n`;
                incidents.list?.filter((i) => i.level === 'major').forEach((i) => {
                    summary += `- 🔴 ${i.title}\n`;
                });
                summary += '\n';
            }
            if (tasks.overdue > 0) {
                summary += `## ⏰ 超期任务提醒\n\n`;
                summary += `当前有 **${tasks.overdue} 项任务已超期**，建议立即排查原因并制定赶工计划。\n\n`;
            }
            summary += `## 💡 改进建议\n\n`;
            if (incidents.open > 0) {
                summary += `1. **异常闭环**：优先处理未闭环的 ${incidents.open} 起异常，明确责任人和完成时限\n`;
            }
            else {
                summary += `1. **异常管理**：本次异常全部闭环，建议总结经验，形成标准化处理流程\n`;
            }
            if (tasks.pending > 0) {
                summary += `2. **任务推进**：加快 ${tasks.pending} 项待处理任务的启动进度，确保按期完成\n`;
            }
            summary += `3. **考点管理**：定期巡检各考点准备情况，及时发现并解决潜在问题\n`;
            summary += `4. **沟通协调**：加强考务人员之间的信息同步，确保指令传达顺畅\n\n`;
            summary += `---\n`;
            summary += `*本总结由 AI 智能生成，仅供参考，请结合实际情况判断。*\n`;
            return summary;
        }
        catch {
            return `# AI 智能总结\n\n基于提供的数据，本次考试工作整体运行平稳。建议关注任务进度和异常处理情况，确保各项工作按计划推进。\n\n---\n*（AI 功能未配置 API Key，当前为模拟模式。配置真实 API Key 后可获得更精准的智能分析。）*\n`;
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)()
], AiService);
//# sourceMappingURL=ai.service.js.map