import Axios from 'axios';
import { INVOICES_API, INVOICE_ROWS_API } from '../config';

/*
* Données génériques
*/
function findAll() {
    return Axios
        .get(INVOICES_API)
        .then(response => response.data['hydra:member']);
}

function find(id) {
    return Axios
            .get(INVOICES_API + '/' + id)
            .then(response => response.data);
}

function update(id, invoice) {
    return Axios.put(
            INVOICES_API + '/' + id,
            {
                ...invoice, customer: `/api/customers/${invoice.customer}`
            });
}

function create(invoice) {
    Axios.post(
        INVOICES_API,
        {
            ...invoice, customer: `/api/customers/${invoice.customer}`
        });
}

function deleteOne (id){
    return Axios
        .delete(INVOICES_API + '/' + id)
}



/*
* Détail des factures
*/
function findAllRows(id) {
    return Axios
        .get(INVOICES_API + '/' + id + '/invoice_rows')
        .then(response => response.data['hydra:member']);
}

function findRow(id) {
    return Axios
            .get(INVOICE_ROWS_API + '/' + id)
            .then(response => response.data);
}

function updateRow(id, invoiceRow) {
    return Axios.put(INVOICE_ROWS_API + '/' + id, invoiceRow);
}

function createRow(row) {
    return Axios.post(INVOICE_ROWS_API,
       { ...row, invoice: `/api/invoices/${row.invoice}` }
    );
}

function deleteOneRow (id){
    return Axios
        .delete(INVOICE_ROWS_API + '/' + id)
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