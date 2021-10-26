import Axios from 'axios';
import Cache from './Cache';
import { CUSTOMERS_API } from '../config';

async function findAllCached() {

    const cachedCustomers = await Cache.get('customers');    

    if (cachedCustomers) {
        return cachedCustomers;
    } 

    return Axios
        .get(CUSTOMERS_API)
        .then(response => {
            const Customers = response.data['hydra:member'];
            Cache.set("customers", Customers);
            return Customers;
        });
}

function findAll(){
    return Axios
        .get(CUSTOMERS_API)
        .then(result => result.data["hydra:member"]); // On récup la liste des customers
}

function find(id) {
    return Axios
        .get(CUSTOMERS_API + '/' + id)
        .then(response => response.data);
}

async function findCached(id) {
    const cachedCustomer = await Cache.get("customers." + id);

    if (cachedCustomer) return cachedCustomer;

    return Axios
        .get(CUSTOMERS_API + '/' + id)
        .then(response => {
            const customer = response.data;

            Cache.set("customers." + id, customer);
            
            return customer;
        });
}

function update(id, customer) {
   return Axios.put(CUSTOMERS_API + '/' + id, customer);
}


function updateCached(id, customer) {
    return Axios
        .put(CUSTOMERS_API + '/' + id, customer)
        .then(async response => {

            const cachedCustomers = await Cache.get("customers");
            const cachedCustomer = await Cache.get("customers." + id);

            if (cachedCustomer) {
                Cache.set('customers.' + id, response.data);
            }
            
            if (cachedCustomers) {
                const index = cachedCustomers.findIndex(c => c.id === +id);
    
                cachedCustomers[index] = response.data;
            }
            
            return response;
    })
}

function create(customer) {
    return Axios.post(CUSTOMERS_API, customer);
}

function createCached(customer) {
    return Axios
        .post(CUSTOMERS_API, customer)
        .then(async response => {
            const cachedCustomers = await Cache.get("customers");
        
            if (cachedCustomers) {
                Cache.set("customers", [...cachedCustomers, response.data]);
            }
            
            return response;
        });
}

function deleteOneCached(id) {
    
    return Axios
        .delete(CUSTOMERS_API + "/" + id)
        .then(async response => {
            const cachedCustomers = await Cache.get("customers");
        
            if (cachedCustomers) {
                Cache.set("customers", cachedCustomers.filter(c => c.id !== id));
            }
            
            return response;
        })
}

function deleteOne (id){
    return Axios
        .delete(CUSTOMERS_API + "/" + id)
}

export default {
    findAll,
    findAllCached,
    find,
    findCached,
    update,
    updateCached,
    create,
    createCached,
    delete: deleteOne,
    deleteCached: deleteOneCached
}