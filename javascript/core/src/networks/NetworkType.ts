import localhostNetwork from "./localhostNetwork";
import mumbaiNetwork from "./mumbaiNetwork";
import Network from "./Network";

export default class NetworkType {
    static Networks : any = [localhostNetwork, mumbaiNetwork];

    public static getInstance(chainId : any) {
        let networkInfo: Network | undefined = undefined;

        NetworkType.Networks.forEach((networkInfoType : any) => {
            let tmp = new networkInfoType();
            if (tmp.ChainId == chainId) {
                networkInfo = tmp;
            }
        });
        return networkInfo;
    }

}