import GeneralError from "./GeneralError";
export default class BlockchainError extends GeneralError {
    static ErrorFromContract: number;
    static UserCancelled: number;
    static AddressIsNotValidKYC: number;
    static MarketIsClosed: number;
    constructor(e: any);
    userDeniedTransactionSignature(): boolean;
    addressIsNotValidKYC(): boolean;
    isMarketClosed(): boolean;
    marketIsClosedModal(): void;
}
