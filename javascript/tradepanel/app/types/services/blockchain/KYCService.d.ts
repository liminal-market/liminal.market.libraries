import KycStatus from "../../dto/KycStatus";
import BlockchainService from "./BlockchainService";
export default class KYCService extends BlockchainService {
    private static KYCInfo;
    private static KycResponse;
    constructor();
    getKYCAbi(): Promise<any>;
    hasValidKYC(): Promise<KycStatus>;
    sandboxCreateAccount(firstName: string, lastName: string, email: string): Promise<any>;
    saveKYCInfo(data: any): Promise<string>;
    updateKYCInfo(data: any): Promise<string>;
    isValidAccountId(str: string): boolean;
    updateDocuments(params: any): Promise<any>;
}
