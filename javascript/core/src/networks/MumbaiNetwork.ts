import MumbaiNetworkDefaults from "./MumbaiNetworkDefaults";

export default class MumbaiNetwork extends MumbaiNetworkDefaults {

    override KYC_ADDRESS = "0x9e2B28D9F841300bE3B64e505dEcA36c35250609";
    override AUSD_ADDRESS = "0x38F2B1E9F11937dD276D64521535b15280A7F137";
    override LIMINAL_MARKET_ADDRESS = "0x6e9C29e416dc9F7A6A03ffebaB3f02Ef62a1baE4";
    override MARKET_CALENDAR_ADDRESS = "0xc6B29dfd4FD756EF94b3A3FF7a531F4467BDDA75";
    override LM_ADDRESS = '';
    override SERVICE_CONTRACT_ADDRESS = '';
    override EXTERNAL_SERVICE_CONTRACT_ADDRESS = '';

    constructor() {
        super();
    }
}