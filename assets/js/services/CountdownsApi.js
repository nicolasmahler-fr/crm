import Axios from "axios";
import { COUNTDOWNS_API } from '../config';

function findAll() {
    return Axios
        .get(COUNTDOWNS_API)
        .then(response => response.data['hydra:member']);
}

export default {
    findAll
}