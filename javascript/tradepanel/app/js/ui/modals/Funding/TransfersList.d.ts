import { TransferDirectionEnum } from "../../../enums/TransferDirectionEnum";
import { Transfer } from "../../../dto/alpaca/Transfer";
export default class TransfersList {
    private userService;
    constructor();
    render(direction: TransferDirectionEnum, transfers: Transfer[]): Promise<string>;
    bindEvents(): void;
}
