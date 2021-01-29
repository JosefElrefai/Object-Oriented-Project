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

    get get(){
        return this.attributes.get;
    }

    get set(){
        return this.attributes.set;
    }
    
    get on(){
       return this.eventHandler.on;
    }

    get trigger(){
        return this.eventHandler.trigger;
    }

    save(): AxiosPromise{
        return this.syncer.save(this.attributes.allData);
    }
    
    fetch(): void{
        this.syncer.fetch(this.get('id')).then(resp => this.set(resp.data))
    }
}
export default User;