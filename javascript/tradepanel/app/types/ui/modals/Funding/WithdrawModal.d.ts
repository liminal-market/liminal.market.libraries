export default class WithdrawModal {
    private userService;
    private bankInfo?;
    private wireTransferCost;
    private achTransferCost;
    private transferCost;
    private currentBalance?;
    private transfersList;
    constructor();
    show(): Promise<void>;
    private bindEvents;
    private showWithdrawConfirmation;
}
