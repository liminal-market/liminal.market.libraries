import Modal from "./Modal";
export default class NativeTokenNeeded {
    onNativeTokenArrived: () => void;
    timeOut?: any;
    modal: Modal;
    constructor(onNativeTokenArrived: () => void);
    show(): void;
    cancelTimer(): void;
    checkForNativeTokens(): Promise<void>;
}
