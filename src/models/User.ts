import { AxiosPromise } from 'axios';
import Eventing from './Eventing';
import Syncaa from './Sync';
import Attributes from './Attributes';


interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

type Callback = () => void;

interface EventHandler{
    on: (eventName: string, callback: Callback) => void;
    trigger: (eventName: string) => void;
}

interface Syncer{
    fetch: (id: number) => AxiosPromise<UserProps>;
    save: (data: UserProps) => AxiosPromise;
}

class User{
    private eventHandler: EventHandler = new Eventing();
    private syncer: Syncer = new Syncaa<UserProps>('http://localhost:3000/users');
    private attributes: Attributes<UserProps>;

    constructor(attr: UserProps){
        this.attributes = new Attributes<UserProps>(attr);
    }

    get<K extends keyof UserProps>(propName: K): UserProps[K]{
        return this.attributes.get(propName);
    }

    set(update: UserProps): void{
        this.attributes.set(update)
    }
    
    on(eventName: string, callback: Callback): void{
        this.eventHandler.on(eventName, callback);
    }

    trigger(eventName: string): void{
        this.eventHandler.trigger(eventName);
    }

    save(): AxiosPromise{
        return this.syncer.save(this.attributes.data);
    }
    
    fetch(){
        this.syncer.fetch(this.attributes.data.id).then(resp => this.set(resp.data))
    }
}
export default User;