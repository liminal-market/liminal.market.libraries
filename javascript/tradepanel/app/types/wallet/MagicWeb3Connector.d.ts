import { ethers } from "ethers";
import AbstractWeb3Connector from "./AbstractWeb3Connector";
export default class MagicWeb3Connector extends AbstractWeb3Connector {
    type: string;
    magic: any | undefined;
    ether: ethers.providers.Web3Provider | null;
    activate(): Promise<{
        provider: ethers.providers.ExternalProvider;
        account: string;
        chainId: number;
        ether: ethers.providers.Web3Provider;
        magic: any;
        signer: ethers.providers.JsonRpcSigner;
    }>;
    deactivate: () => Promise<void>;
}
