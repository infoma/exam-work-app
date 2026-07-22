export type ScopeType = 'global' | 'exam' | 'site';
export declare class Role {
    id: string;
    code: string;
    name: string;
    scopeType: ScopeType;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}
