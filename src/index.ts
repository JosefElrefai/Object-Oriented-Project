import axios from 'axios';
import User from './models/User';

const user = new User({name: 'Master Programmer', age: 555});
user.set({age: 777});
user.save();