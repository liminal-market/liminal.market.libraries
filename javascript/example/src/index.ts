import LiminalMarket from "liminal.market";
import {Wallet} from "ethers";


async function run() {
    // @ts-ignore
    let ethereum = window.ethereum;
console.log(ethereum)

    let wallet = new Wallet(ethereum.getsigner(), ethereum.provider);
    // @ts-ignore
    let liminalMarket = await LiminalMarket.getInstance(wallet);
    let hasAccount = liminalMarket.hasAccount();
    console.log('hasAccount', hasAccount);
}
run();