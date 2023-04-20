import Network from "./Network";

export default  abstract class TestNetwork extends Network {

    protected constructor() {
        super();

        this.ServerUrl = "https://testnet.liminal.market";
        this.TestNetwork = true;
    }
}