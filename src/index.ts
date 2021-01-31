import axios from 'axios';
import User from './models/User';
import Collection from './models/Collection';
import UserForm from './views/UserForm';



const user = new UserForm(document.getElementById('root'));
user.render();