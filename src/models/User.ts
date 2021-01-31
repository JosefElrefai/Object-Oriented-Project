import Model from './Model';
import Eventing from './Eventing';
import Syncaa from './Sync';
import Attributes from './Attributes';
import Collection from './Collection';

interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

class User extends Model<UserProps>{
    static buildUser(props: UserProps): User {
        return new User(new Eventing(), new Syncaa('http://localhost:3000/users'), new Attributes(props));
    };

    static buildUserCollection(): Collection<User, UserProps> {
        return new Collection('http://localhost:3000/users', User.buildUser);
    }
}

export default User;