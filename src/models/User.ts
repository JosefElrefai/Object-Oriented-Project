import Model from './Model';


interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

class User extends Model<UserProps>{
    // Own Methods
}

export default User;