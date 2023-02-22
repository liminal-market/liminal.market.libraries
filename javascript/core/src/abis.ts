export default class Abis {

    static LiminalMarketExternalServiceAbi = [
{"inputs":[{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buySecurityToken","outputs":[],"stateMutability":"nonpayable","type":"function"},
{"inputs":[{"internalType":"address","name":"walletAddress","type":"address"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"quantity","type":"uint256"}],"name":"sellSecurityToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]
    static LiminalMarketAbi = [
{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"orderId","type":"string"},{"indexed":false,"internalType":"address","name":"recipient","type":"address"},{"indexed":false,"internalType":"string","name":"symbol","type":"string"},{"indexed":false,"internalType":"uint256","name":"tsl","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"filledQty","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"filledAvgPrice","type":"uint256"},{"indexed":false,"internalType":"string","name":"side","type":"string"},{"indexed":false,"internalType":"uint256","name":"filledAt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"serviceFee","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"aUsdBalance","type":"uint256"},{"indexed":false,"internalType":"address","name":"spender","type":"address"}],"name":"OrderExecuted","type":"event"},
{"inputs":[{"internalType":"string","name":"symbol","type":"string"}],"name":"getSecurityToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]

    static BalanceOfAbi = [{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
    static TransferAbi = [{
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }]
}