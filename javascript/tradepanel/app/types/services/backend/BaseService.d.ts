export default class BaseService {
    constructor();
    get(path: string, data?: any, options?: any): Promise<any>;
    post<T>(path: string, data?: any): Promise<any>;
    private getUrl;
}
