import BlockchainService from "./BlockchainService";

export default class KYCService extends BlockchainService {
  constructor() {
    super();
  }

  public async saveKYCInfo(data: any): Promise<string> {
    return await this.post("kycRegistration", data);
  }

  async updateDocuments(params: any) {
    return await this.post("kycActionRequiredUpdate", params);
  }
}
