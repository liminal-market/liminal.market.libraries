import ContractAddresses from "../../contracts/ContractAddresses";
export default class EventService {
    contracts: ContractAddresses;
    constructor();
    subscribeToBuy(hash: string): void;
    subscribeToSell(hash: string): void;
    private listen;
    private store;
    remove(hash: string): void;
    lmAbi: {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
    }[];
}
