import { AxiosPromise } from 'axios';
import Eventing from './Eventing';
import Syncaa from './Sync';
import Attributes from './Attributes';


interface EventHandler{
    on: (eventName: string, callback: Callback) => void;
    trigger: (eventName: string) => void;
}

interface Syncer<T>{
    fetch: (id: number) => AxiosPromise<T>;
    save: (data: T) => AxiosPromise;
}

interface HasId{
    id?: number;
}

type Callback = () => void;


abstract class Model<T extends HasId> {
    private eventHandler: EventHandler = new Eventing();
    private syncer: Syncer<T> = new Syncaa<T>('http://localhost:3000/users');
    private attributes: Attributes<T>;

    constructor(attr: T){
        this.attributes = new Attributes<T>(attr);
    }

    get get(){
        return this.attributes.get;
    }

    set(update: T){
        this.attributes.set(update);
        this.trigger('change');
    }
    
    get on(){
       return this.eventHandler.on;
    }

    get trigger(){
        return this.eventHandler.trigger;
    }

    save(): void{
        this.syncer.save(this.attributes.getAll())
        .then(() => this.trigger('save'))
        .catch(() => this.trigger('saveError'))
    }
    
    async fetch(): Promise<void>{
        const id = this.get('id');
        if(typeof id !== 'number') throw new Error('Cannot fetch without correct id');

        const resp = await this.syncer.fetch(this.get('id'));
        return this.set(resp.data);
    }
}
export default Model;