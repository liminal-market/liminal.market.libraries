import LiminalMarket from "liminal.market";
export default class User {
    provider: any;
    chainId: number;
    ether: any;
    email: string;
    providerInfo: any;
    alpacaId?: string;
    address: string;
    magic: any | undefined;
    connector: any;
    _token: string;
    isLoggedIn: boolean;
    signer: any;
    LiminalMarket?: LiminalMarket;
    constructor(provider: any, address: string, chainId: number, ether: any);
    get token(): string;
    set token(value: string);
    setValidate(validate: any): void;
}
