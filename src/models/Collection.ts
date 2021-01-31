import axios, { AxiosPromise, AxiosResponse } from 'axios';
import Eventing from './Eventing';

class Collection<T, K> {
    models: T[] = [];

    private eventing = new Eventing();
    constructor(private rootUrl: string, private createInstance: (obj: K) => T ) {
        this.fetch();
    };

    on = this.eventing.on;
    trigger = this.eventing.trigger;


    async fetch(): Promise<void> {
        const resp: AxiosResponse<K[]> = await axios.get(this.rootUrl);
        resp.data.forEach((value: K) => {
            this.models.push(this.createInstance(value))
        });
        this.trigger('change');
    };
}
export default Collection;