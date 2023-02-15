export default interface KycStatus {
    isValidKyc : boolean;
    brokerId : string;
    status : string;
    hasBuyPower : boolean;
    message : string;
}