import axios from 'axios';
import User from './models/User';

const user = new User({name: 'JJJ', age: 3});

user.on('change', () => console.log('CHANGED!!'));

user.set({name: 'aloha'});
console.log(user);
// (async () => {
//     await user.fetch();
//     user.set({name: 'GRANDIOS'});
//     user.save();
// })()


