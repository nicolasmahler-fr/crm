import Axios from 'axios';
import { USERS_API } from '../config';

function create(user) {
    return Axios.post(USERS_API, user);
}

export default {
    create
}