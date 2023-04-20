import Network from "./Network";

export default abstract class MainNetwork extends Network {

    protected constructor() {
        super();

        this.ServerUrl = "https://mainnet.liminal.market";
        this.TestNetwork = false;
    }
}