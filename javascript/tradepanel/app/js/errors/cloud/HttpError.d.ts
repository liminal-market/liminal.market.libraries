import ICloudError from "./ICloudError";
export default class HttpError implements ICloudError {
    method: string;
    url: string;
    body: string;
    serverError: any;
    constructor(obj: any);
    handle(): void;
}
