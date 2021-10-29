import Axios from "axios";
import { COUNTDOWNS_API, COUNTDOWN_ROWS_API } from '../config';

function findAll() {
    return Axios
        .get(COUNTDOWNS_API)
        .then(response => response.data['hydra:member']);
}

function find(id) {
    return Axios
            .get(COUNTDOWNS_API + '/' + id)
            .then(response => response.data);
}

function update(id, countdown) {
    return Axios.put(
            COUNTDOWNS_API + '/' + id,
            {
                ...countdown, customer: `/api/customers/${countdown.customer}`
            });
}

function create(countdown) {
    Axios.post(
        COUNTDOWNS_API,
        {
            ...countdown, customer: `/api/customers/${countdown.customer}`
        });
}

function deleteOne (id){
    return Axios
        .delete(COUNTDOWNS_API + '/' + id)
}


/*
* Détail des countdowns
*/
function findAllRows(id) {
    return Axios
        .get(COUNTDOWNS_API + '/' + id + '/countdown_rows')
        .then(response => response.data['hydra:member']);
}

function findRow(id) {
    return Axios
            .get(COUNTDOWN_ROWS_API + '/' + id)
            .then(response => response.data);
}

function updateRow(id, countdownRow) {
    return Axios.put(COUNTDOWN_ROWS_API + '/' + id, countdownRow);
}

function createRow(row) {
    return Axios.post(COUNTDOWN_ROWS_API,
       { ...row, countdown: `/api/countdowns/${row.countdown}` }
    );
}

function deleteOneRow (id){
    return Axios
        .delete(COUNTDOWN_ROWS_API + '/' + id)
}


export default {
    findAll,
    find,
    update,
    create,
    delete: deleteOne,
    findAllRows,
    findRow,
    updateRow,
    createRow,
    deleteRow: deleteOneRow
}