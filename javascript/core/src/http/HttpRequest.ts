import LiminalMarketCore from "../index";
import EventSource from 'eventsource';

export default class HttpRequest {

    public async postAuth(path: string, data?: any) {
        if (!LiminalMarketCore.Bearer) {
            await LiminalMarketCore.Instance.login();
        }
        return await this.post(path, data)
    }

    public async post(path: string, data?: any) {
        if (!data) {
            data = {}
        }
        data.chainId = LiminalMarketCore.Network?.ChainId;
        data.address = LiminalMarketCore.WalletAddress;
        let url = this.getUrl(path);
        let response = await fetch(url,
            {
                method: 'POST',
                headers: {
                    'Authentication': 'Bearer: ' + LiminalMarketCore.Bearer,
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(data),
            })
        let obj = await response.json();
        if (obj.success) return obj.result;

        throw new Error(obj.error);
    }

    public async getAuth(path: string, data?: any): Promise<any> {
        if (!LiminalMarketCore.Bearer) {
            await LiminalMarketCore.Instance.login();
        }
        return this.get(path, data);
    }

    public async get(path: string, data?: any): Promise<any> {
        if (!LiminalMarketCore.Bearer) {
            await LiminalMarketCore.Instance.login();
        }

        let params = new URLSearchParams(data);
        if (!params.has('chainId')) {
            params.set('chainId', LiminalMarketCore.Network.ChainId.toString());
        }
        if (!params.has('address')) {
            params.set('address', LiminalMarketCore.WalletAddress);
        }

        let response = await fetch(this.getUrl(path) + '?' + params.toString(),
            {
                method: 'GET',
                headers: {'Authentication': 'Bearer: ' + LiminalMarketCore.Bearer, 'Content-Type': 'application/json'}
            })
        let obj = await response.json();
        return (obj.result) ? obj.result : undefined;
    }


    private getUrl(path: string) {
        if (!LiminalMarketCore.Network) {
            throw new Error('No network available. User connected to unsupported network')
        }
        if (!path.startsWith('/')) path = '/' + path;
        return LiminalMarketCore.Network.ServerUrl + path
    }


    public async listen(action: (e: any) => Promise<void>) {
        if (!LiminalMarketCore.Bearer) {
            await LiminalMarketCore.Instance.login();
        }

        let eventSource = new EventSource(this.getUrl('/listenForChanges?jwt=' + LiminalMarketCore.Bearer));
        eventSource.onmessage = async (e: any) => {
            if (e.data == 'ok') return;

            let obj = this.getEventSourceObject(e);
            await action(obj);
        };
    }

    private getEventSourceObject(e: any) {
        let data = e.data;
        console.log(e);
        if (!data || data == 'ok') return;

        try {
            return JSON.parse(data);
        } catch (error : any) {
            throw new Error('Error parsing event source object:' + e)
        }
    }
}