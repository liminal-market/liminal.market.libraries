
export default class BlockchainError extends Error {

    innerError : any;
    constructor(e : any) {
        super();

        this.name = 'BlockchainError'
        this.stack = e.stack;
        this.message = e.message;
        if (e.error && e.error.reason) {
            this.message = e.error.reason;
        }
        if (this.message.indexOf('reverted with reason') != -1) {
            this.message = this.message.slice(this.message.indexOf("'")).substring(1);
            this.message = this.message.slice(0, this.message.length-1);
        }
        this.innerError = e;
    }

}