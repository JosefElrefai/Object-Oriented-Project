import { AxiosPromise } from 'axios';



interface EventHandler{
    on: (eventName: string, callback: Callback) => void;
    trigger: (eventName: string) => void;
}

interface Syncer<T>{
    fetch: (id: number) => AxiosPromise<T>;
    save: (data: T) => AxiosPromise;
}

interface AttributesINSF<T>{
    get<K extends keyof T>(key: K): T[K];
    set(update: T): void;
    getAll(): T;
}

interface HasId{
    id?: number;
}

type Callback = () => void;


class Model<T extends HasId> {

    constructor(
        private eventHandler: EventHandler,
        private syncer: Syncer<T>,
        private attributes: AttributesINSF<T>
    ) {}

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