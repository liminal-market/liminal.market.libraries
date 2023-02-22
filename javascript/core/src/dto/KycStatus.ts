export default interface KycStatus {
    isValidKyc : boolean;
    brokerId : string;
    status : string;
    hasBuyingPower : boolean;
    message : string;
}