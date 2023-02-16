export default class GeneralError extends Error {
    code: number;
    message: string;
    headers: any;
    error: any;
    stack: string;
    callback?: () => void;
    constructor(e: any);
}
