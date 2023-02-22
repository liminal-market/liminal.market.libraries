import Network from "./Network";
import LocalhostNetwork from "./LocalhostNetwork";
import MumbaiNetwork from "./MumbaiNetwork";

export default class NetworkType {
    static Networks : any = [LocalhostNetwork, MumbaiNetwork];

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