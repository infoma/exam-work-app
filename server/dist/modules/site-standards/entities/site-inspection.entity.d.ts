export declare class SiteInspection {
    id: string;
    siteStandardId: string;
    inspectionDate: Date;
    inspectionType: string;
    inspector: string;
    facilityCheck: string;
    securityCheck: string;
    environmentCheck: string;
    managementCheck: string;
    facilityScore: number;
    securityScore: number;
    environmentScore: number;
    managementScore: number;
    overallScore: number;
    issuesFound: string;
    rectificationRequired: boolean;
    rectificationDeadline: string;
    rectificationStatus: string;
    remarks: string;
    createdAt: Date;
    updatedAt: Date;
}
