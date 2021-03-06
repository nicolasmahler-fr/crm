import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import Textarea from '../components/forms/Textarea';
import Select from '../components/forms/Select';
import FormContentLoader from '../components/loaders/FormContentLoader';
import CustomersAPI from '../services/CustomersAPI';
import EstimatesAPI from '../services/EstimatesAPI';
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import fr from 'date-fns/locale/fr';
import moment from 'moment';

const EstimatePage = ({ history, match }) => { //On extrait history et match des props

    const { id = "new" } = match.params;

    registerLocale('fr', fr)

    const [estimate, setEstimate] = useState({
        amount: '',
        customer: '',
        status: 'DRAFT',
        year: '',
        chrono: '',
        validateAt: '',
        object: '',
        definition: ''
    });

    const [customers, setCustomers] = useState([]);

    const [rows, setRows] = useState([]);

    const [editing, setEditing] = useState(false);

    const [errors, setErrors] = useState({
        amount: '',
        customer: '',
        status: '',
        year: '',
        chrono: '',
        validateAt: '',
        object: '',
        definition: ''
    });

    const [loading, setLoading] = useState(true);

    //recup des clients
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll();
            setCustomers(data);
            setLoading(false);

            if (!estimate.customer) setEstimate({ ...estimate, customer: data[0].id });
        } catch (error) {
            console.log(error.response)
            toast.error('Impossible de charger les clients.');
            history.replace('/estimates');
        }
    }

    const fetchEstimateRows = async () => {
        try {
            const data = await EstimatesAPI.findAllRows(id);
            setRows(data);
            setLoading(false);

        } catch (error) {
            console.log(error.response)
            toast.error('Impossible de charger les d??tails de la facture.');
            history.replace('/estimates');
        }
    }

    //recup d'une facture
    const fetchEstimate = async (id) => {
        try {

            const { amount, status, customer, year, chrono, validateAt, object, definition} = await EstimatesAPI.find(id);
            setEstimate({ amount, status, customer: customer.id, year, chrono, validateAt, object, definition});
            setLoading(false);

        } catch (error) {
            console.log(error.response);
            toast.error('Impossible de charger la facture demand??e.');
            history.replace('/estimates');
        }
    }

    //recup de la liste des clients ?? chaque chargement du composant
    useEffect(() => {
        fetchCustomers();
    }, []);

    //recup de la liste des d??tails de facture ?? chaque chargement du composant
    useEffect(() => {
        fetchEstimateRows();
    }, []);

    //R??cup??ration de la bonne facture quand l'id de l'url change
    useEffect(() => {
        if (id !== 'new') {
            setEditing(true);
            fetchEstimate(id);
        }
    }, [id]);

   // Gestion des changements des inputs dans le form
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setEstimate({...estimate, [name]: value})
    }

    // Supprimer une row
    const handleDelete = async id => {
        const originalEstimateRows = [...rows];

        setRows(rows.filter(row => row.id !== id));

        
        
        try {
            await EstimatesAPI.deleteRow(id);

            const { amount } = await EstimatesAPI.find(match.params.id);
            setEstimate({ amount });

            toast.success('L\'entr???? a bien ??t?? supprim??e');
        } catch (error) {
            setRows(originalEstimateRows);
            toast.error('Une erreur est survenue.');
        }
    };


    //soumission du form
    const handleSubmit = async event => {
        event.preventDefault();
        
        try {
            if (editing) {
               await EstimatesAPI.update(id, estimate)

                toast.success('Le devis a bien ??t?? modifi??.');

            } else {
                
               await EstimatesAPI.create(estimate);
                toast.success('La facture a bien ??t?? enregistr??e.');
                history.replace('/estimates');
            }
        } catch ({ response }) {
            const { violations } = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach( ({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });

                setErrors(apiErrors);

                toast.error('Des erreurs dans votre formulaire.');
            }
        }
    }

    return (
        <>
            {!editing && <h1>Cr??ation d'un devis</h1> || <h1>Devis {estimate.year}{estimate.chrono} <Link to={'/pdf/estimate/' + match.params.id} className='btn btn-secondary ms-lg-auto'>PDF</Link></h1>}
            
            {loading && <FormContentLoader />}
            {!loading && <form onSubmit={handleSubmit}>
                <Field
                    name="amount"
                    type="number"
                    placeholder="Montant du devis"
                    label="montant"
                    onChange={handleChange}
                    value={estimate.amount}
                    error={errors.amount}
                />

                <Select
                    name='customer'
                    label='client'
                    onChange={handleChange}
                    value={estimate.customer}
                    error={errors.customer}
                >
                    {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.company}</option>)}
                </Select>

                <Select
                    name='status'
                    label='statut'
                    onChange={handleChange}
                    value={estimate.status}
                    error={errors.status}
                >
                    <option value="DRAFT">Brouillon</option>
                    <option value="SENT">Envoy??</option>
                    <option value="VALIDATE">Valid??</option>
                    <option value="CANCELLED">Annul??e</option>
                </Select>

                <Field
                    name="object"
                    type="text"
                    placeholder="Objet du devis"
                    label="objet"
                    onChange={handleChange}
                    value={estimate.object}
                    error={errors.object}
                />

                <Textarea
                    name="definition"
                    placeholder="D??finition du devis"
                    label="D??finition"
                    onChange={handleChange}
                    value={estimate.definition}
                    error={errors.definition}
                />

                <label htmlFor="validateAt">Pay?? le </label>
                <DatePicker 
                    utcOffset={0} 
                    locale="fr" 
                    timeFormat="HH:mm"
                    dateFormat="yyyy-MM-dd HH:mm" 
                    /* selected={moment("2019-07-08").toDate()} */
                    value={estimate.validateAt} 
                    error={errors.validateAt} 
                    name="validateAt" 
                    id="validateAt" 
                    onChange={(value) => setEstimate({ ...estimate, validateAt: value})}
                />              

                <div className="form-group mt-3">
                    <button type="submit" className='btn btn-success'>Enregistrer</button>
                    <Link to='/estimates' className='btn btn-link'>Retour aux devis</Link>
                </div>
            </form>}

            <div className='m-4 text-center'>
                <Link to={'/estimateRows/' + match.params.id + '/add'} className='btn btn-primary'>Cr??er une entr??e</Link>&nbsp;
            </div>
            {rows.length >0 && <div>
            <h3 className="mt-5">D??tails du devis</h3>
            <table className="table table-hover">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantit??</th>
                    <th>Co??t unitaire</th>
                    <th className="text-center">Sous-total</th>
                    <th></th>
                </tr>
            </thead>
                <tbody>
                    {rows.map(row => <tr key={row.id}>
                    <td>{row.description}</td>
                    <td>{row.quantity}</td>
                    <td>{row.unitPrice} ???</td>
                    <td className="text-center">
                       {row.amount} ???
                    </td>
                    <td>
                        <Link to={'/estimate_rows/' + row.id} className="btn btn-sm btn-primary">Editer</Link>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row.id)}>Supprimer</button>
                    </td>
                </tr>
                )}
                    
                </tbody>
            </table></div>}
        </>
    );
}
 
export default EstimatePage;