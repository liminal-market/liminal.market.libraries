import LiminalMarket from "../index";
import EventSource from 'eventsource';
import AccountService from "../services/AccountService";

export default class HttpRequest {

    constructor() {

    }

    public async postAuth(path: string, data?: any) {
        if (!LiminalMarket.Bearer) {
            throw new Error('You are not logged in.')
        }
        return await this.post(path, data)
    }

    public async post(path: string, data?: any) {
        if (!data) {
            data = {}
        }
        data.chainId = LiminalMarket.Network?.ChainId;
        data.address = LiminalMarket.WalletAddress;
        let url = this.getUrl(path);
        let response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Authentication': 'Bearer: ' + LiminalMarket.Bearer,
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(data),
            })
        let obj = await response.json();
        if (obj.success) return obj.result;

        throw new Error(obj.error);
    }

    public async getAuth(path: string, data?: any): Promise<any> {
        if (!LiminalMarket.Bearer) {
            throw new Error('You are not logged in.')
        }
        return this.get(path, data);
    }

    public async get(path: string, data?: any): Promise<any> {
        if (!LiminalMarket.Bearer) {
            throw new Error('You are not logged in.')
        }

        let params = new URLSearchParams(data);
        if (!params.has('chainId')) {
            params.set('chainId', LiminalMarket.Network.ChainId.toString());
        }
        if (!params.has('address')) {
            params.set('address', LiminalMarket.WalletAddress);
        }

        let response = await fetch(this.getUrl(path) + '?' + params.toString(),
            {
                method: 'GET',
                headers: {'Authentication': 'Bearer: ' + LiminalMarket.Bearer, 'Content-Type': 'application/json'}
            })
        let obj = await response.json();
        return (obj.result) ? obj.result : undefined;
    }


    private getUrl(path: string) {
        if (path.startsWith('http')) return path;

        if (!LiminalMarket.Network) {
            throw new Error('No network available. User connected to unsupported network')
        }
        if (!path.startsWith('/')) path = '/' + path;
        return LiminalMarket.Network.ServerUrl + path
    }

    static eventSource?: EventSource;
    static actionMap: Map<string, (obj : any) => void>;

    public async listen(method: string, action: (event: any) => Promise<void>) {
        if (!LiminalMarket.Bearer) {
            throw new Error('You are not logged in.')
        }
        if (!HttpRequest.actionMap) {
            HttpRequest.actionMap = new Map<string, () => void>();
        }
        HttpRequest.actionMap.set(method, action);

        if (!HttpRequest.eventSource) {
            HttpRequest.eventSource = new EventSource(this.getUrl('/listenForChanges?jwt=' + LiminalMarket.Bearer));
            HttpRequest.eventSource.onmessage = async (event: any) => {
                if (event.data == 'ok') return;
                this.runActions(event);
            };
        }
    }

    private runActions(e: any) {
        let obj = this.getEventSourceObject(e);
        let action = HttpRequest.actionMap.get(obj.method)
        if (action) {
            action(obj);
        }
    }

    private getEventSourceObject(e: any) {
        let data = e.data;
        console.log(e);
        if (!data || data == 'ok') return;

        try {
            return JSON.parse(data);
        } catch (error: any) {
            throw new Error('Error parsing event source object:' + e)
        }
    }


}