import { BigNumber } from "ethers";
export declare const showContainer: (id: string) => void;
export declare const roundNumber: (number: number) => number;
export declare const roundNumberDecimal: (number: number, decimal: number) => number;
export declare const formatWeiAsCurrency: (number: BigNumber) => string;
export declare const formatWei: (number: BigNumber) => string;
export declare const roundBigNumber: (number: BigNumber) => BigNumber;
export declare const roundBigNumberDecimal: (number: BigNumber, decimal: number) => BigNumber;
export declare const AddressZero = "0x0000000000000000000000000000000000000000";
export declare const isJSON: (str: string) => any;
export declare const ethereumInstalled: () => boolean;
export declare const shortEth: (ethAddress: string) => string;
export declare const upperFirstLetter: (text: string) => string;
export declare const showBar: (text: string) => void;
