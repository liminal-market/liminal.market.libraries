import Security from "./Security";
import BaseService from "../backend/BaseService";
export default class SecuritiesService extends BaseService {
    securities: Map<string, Security>;
    securitiesArray: any;
    private static instance;
    page: number;
    symbols: string[];
    private constructor();
    static getInstance(): Promise<SecuritiesService>;
    getSecurities(): Promise<Map<string, Security>>;
    getSecurityBySymbol(symbol: string): Promise<Security>;
    getTopSecurities(): Promise<Security[]>;
    getPaginatingSecurities(page: number): Promise<Security[]>;
    find(search: string): Promise<Array<Security>>;
}
