import GeneralError from "./GeneralError";
import ICloudError from "./cloud/ICloudError";
import HttpError from "./cloud/HttpError";
export default class CloudError extends GeneralError {
    constructor(e: any);
    static getActionInstance(action: string, obj: any): ICloudError;
    static Errors: (typeof HttpError)[];
}
