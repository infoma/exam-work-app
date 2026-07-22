export declare class AiService {
    private readonly logger;
    generateSummary(prompt: string, context: string): Promise<string>;
    private callOpenAiCompatible;
    private mockSummary;
}
