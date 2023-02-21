import KycResult from "../../dto/KycResult";
import { BankRelationship } from "../../dto/alpaca/BankRelationship";
import { Transfer } from "../../dto/alpaca/Transfer";
import { TransferDirectionEnum } from "../../enums/TransferDirectionEnum";
import User from "../../dto/User";
import BaseService from "./BaseService";
export default class UserService extends BaseService {
    static readonly signedMessage = "signedMessage";
    constructor();
    isMarketOpenOrUserOffHours(): Promise<boolean>;
    getUser(): User;
    load(address: string): Promise<void>;
    getAlpacaId(): Promise<string>;
    getAccount(): Promise<any>;
    getEthAddress(): string | undefined;
    kycActionRequired(): Promise<KycResult>;
    updateName(given_name: string, middle_name: string, family_name: string): Promise<any>;
    updateContact(data: any): Promise<any>;
    updateTrustedContact(data: any): Promise<any>;
    createAchRelationship(account_owner_name: string, bank_account_type: string, bank_account_number: string, bank_routing_number: string): Promise<any>;
    getBankRelationship(): Promise<BankRelationship>;
    getLatestTransfers(direction: TransferDirectionEnum): Promise<Transfer[]>;
    createTransfer(amount: string, direction: string): Promise<any>;
    deleteTransfer(id: string): Promise<any>;
    registerWireTransferRelationship(params: any): Promise<any>;
}
