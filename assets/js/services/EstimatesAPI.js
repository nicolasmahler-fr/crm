import Axios from 'axios';
import { ESTIMATES_API, ESTIMATE_ROWS_API } from '../config';

/*
* Données génériques
*/
function findAll() {
    return Axios
        .get(ESTIMATES_API)
        .then(response => response.data['hydra:member']);
}

function find(id) {
    return Axios
            .get(ESTIMATES_API + '/' + id)
            .then(response => response.data);
}

function update(id, estimate) {
    return Axios.put(
            ESTIMATES_API + '/' + id,
            {
                ...estimate, customer: `/api/customers/${estimate.customer}`
            });
}

function create(estimate) {
    Axios.post(
        ESTIMATES_API,
        {
            ...estimate, customer: `/api/customers/${estimate.customer}`
        });
}

function deleteOne (id){
    return Axios
        .delete(ESTIMATES_API + '/' + id)
}



/*
* Détail des factures
*/
function findAllRows(id) {
    return Axios
        .get(ESTIMATES_API + '/' + id + '/estimate_rows')
        .then(response => response.data['hydra:member']);
}

function findRow(id) {
    return Axios
            .get(ESTIMATE_ROWS_API + '/' + id)
            .then(response => response.data);
}

function updateRow(id, estimateRow) {
    return Axios.put(ESTIMATE_ROWS_API + '/' + id, estimateRow);
}

function createRow(row) {
    return Axios.post(ESTIMATE_ROWS_API,
       { ...row, estimate: `/api/estimates/${row.estimate}` }
    );
}

function deleteOneRow (id){
    return Axios
        .delete(ESTIMATE_ROWS_API + '/' + id)
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