import axios from 'axios';
import User from './models/User';

const user = new User({name: 'Master Programmer', age: 555});
console.log(user.get('name'));