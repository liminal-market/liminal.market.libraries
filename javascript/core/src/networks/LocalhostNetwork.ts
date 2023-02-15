import LocalhostNetworkDefaults from "./LocalhostNetworkDefaults";

export default class LocalhostNetwork extends LocalhostNetworkDefaults {

    override KYC_ADDRESS = "0xA700528a2B9Bd3126c96378b76f2c99f5F0e0F76";
    override  AUSD_ADDRESS = "0x7ad1630b2E9F0e5401f220A33B473C7E5551dd3e";
    override  LIMINAL_MARKET_ADDRESS = "0x19d5ABE7854b01960D4911e6536b26F8A38C3a18";
    override MARKET_CALENDAR_ADDRESS = "0x12bA221061255c11EA4895C363633bD43F28F9c3";
    override  LM_ADDRESS = "0x012c686711d9532f7fD68fe6a40d86477288F1dc";
    override SERVICE_CONTRACT_ADDRESS = "0x9B946889657e8f2D943A3841282fBf5751241E85";

    constructor() {
        super();
    }
}