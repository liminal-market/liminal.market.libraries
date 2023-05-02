import BlockchainService from "./BlockchainService";
export default class KYCService extends BlockchainService {
    constructor();
    saveKYCInfo(data: any): Promise<string>;
    updateDocuments(params: any): Promise<any>;
}
