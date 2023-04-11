import KycResult from "../../dto/KycResult";
import { BankRelationship } from "../../dto/alpaca/BankRelationship";
import { Transfer } from "../../dto/alpaca/Transfer";
import { TransferDirectionEnum } from "../../enums/TransferDirectionEnum";
import CookieHelper from "../../util/CookieHelper";
import User from "../../dto/User";
import { ethers } from "ethers";
import BaseService from "./BaseService";
import WidgetGlobals from "../../WidgetGlobals";

export default class UserService extends BaseService {
  static readonly signedMessage = "signedMessage";

  constructor() {
    super();
  }

  public async isMarketOpenOrUserOffHours(): Promise<boolean> {
    return await WidgetGlobals.LiminalMarket.isMarketOpen();
  }

  public getUser() {
    let cookieHelper = new CookieHelper(document);
    let signedMessage = cookieHelper.getCookieValue("signedMessage");

    if (!signedMessage) {
      WidgetGlobals.User = new User(
        null,
        "",
        WidgetGlobals.Network.ChainId,
        null
      );
      return WidgetGlobals.User;
    }
    const signingAddress = ethers.utils.recoverAddress("", signedMessage);
    WidgetGlobals.User = new User(
      null,
      signingAddress,
      WidgetGlobals.Network.ChainId,
      null
    );
    return WidgetGlobals.User;
  }

  public async load(address: string) {
    let response = await fetch("https://app.liminal.market/user", {
      body: address,
    });
    let json = await response.json();
  }

  public async getAlpacaId(): Promise<string> {
    let user = await this.getUser();
    if (user.alpacaId) return user.alpacaId;

    let result = (await fetch("https://app.liminal.market/")) as any;
    user.alpacaId = result.alpacaId;
    return user.alpacaId!;
  }

  public async getAccount() {
    return await this.get("account");
  }

  getEthAddress(): string | undefined {
    return WidgetGlobals.User.address;
  }

  public async kycActionRequired(): Promise<KycResult> {
    let kycResults = (await this.get("kycActionRequired")) as KycResult;
    return kycResults;
  }

  public async updateName(
    given_name: string,
    middle_name: string,
    family_name: string
  ) {
    return await this.post("updateName", {
      given_name: given_name,
      middle_name: middle_name,
      family_name: family_name,
    });
  }

  public async updateContact(data: any) {
    return await this.post("updateContact", data);
  }

  public async updateTrustedContact(data: any) {
    return await this.post("updateTrustedContact", data);
  }

  public async createAchRelationship(
    account_owner_name: string,
    bank_account_type: string,
    bank_account_number: string,
    bank_routing_number: string
  ) {
    return await this.post<BankRelationship>("createAchRelationship", {
      account_owner_name,
      bank_account_type,
      bank_account_number,
      bank_routing_number,
    });
  }

  public async getBankRelationship(): Promise<BankRelationship> {
    return (await this.get("getBankRelationship")) as BankRelationship;
  }

  public async getLatestTransfers(direction: TransferDirectionEnum) {
    return (await this.get("getTransfers", {
      direction: direction,
    })) as Transfer[];
  }

  public async createTransfer(amount: string, direction: string) {
    return await this.post("createTransfer", {
      amount: amount,
      direction: direction,
    });
  }

  async deleteTransfer(id: string) {
    return await this.post("deleteTransfer", { id: id });
  }

  public async registerWireTransferRelationship(params: any) {
    return await this.post<BankRelationship>("createWireRelationship", params);
  }
}
