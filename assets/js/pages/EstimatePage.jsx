import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
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
        status: 'SENT',
        year: '',
        chrono: '',
        validateAt: '',
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
            toast.error('Impossible de charger les détails de la facture.');
            history.replace('/estimates');
        }
    }

    //recup d'une facture
    const fetchEstimate = async (id) => {
        try {

            const { amount, status, customer, year, chrono, validateAt} = await EstimatesAPI.find(id);
            setEstimate({ amount, status, customer: customer.id, year, chrono, validateAt});
            setLoading(false);

        } catch (error) {
            console.log(error.response);
            toast.error('Impossible de charger la facture demandée.');
            history.replace('/estimates');
        }
    }

    //recup de la liste des clients à chaque chargement du composant
    useEffect(() => {
        fetchCustomers();
    }, []);

    //recup de la liste des détails de facture à chaque chargement du composant
    useEffect(() => {
        fetchEstimateRows();
    }, []);

    //Récupération de la bonne facture quand l'id de l'url change
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

            toast.success('L\'entréé a bien été supprimée');
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

                toast.success('Le devis a bien été modifié.');

            } else {
                
               await EstimatesAPI.create(estimate);
                toast.success('La facture a bien été enregistrée.');
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
            {!editing && <h1>Création d'un devis</h1> || <h1>Devis {estimate.year}{estimate.chrono} <Link to={'/pdf/estimate/' + match.params.id} className='btn btn-secondary ms-lg-auto'>PDF</Link></h1>}
            
            {loading && <FormContentLoader />}
            {!loading && <form onSubmit={handleSubmit}>
                <Field
                    name="amount"
                    type="number"
                    placeholder="Montant de la facture"
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
                    <option value="SENT">Envoyé</option>
                    <option value="VALIDATE">Validé</option>
                    <option value="CANCELLED">Annulée</option>
                </Select>

                <label htmlFor="validateAt">Payé le </label>
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
                <Link to={'/estimateRows/' + match.params.id + '/add'} className='btn btn-primary'>Créer une entrée</Link>&nbsp;
            </div>
            {rows.length >0 && <div>
            <h3 className="mt-5">Détails du devis</h3>
            <table className="table table-hover">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Quantité</th>
                    <th>Coût unitaire</th>
                    <th className="text-center">Sous-total</th>
                    <th></th>
                </tr>
            </thead>
                <tbody>
                    {rows.map(row => <tr key={row.id}>
                    <td>{row.description}</td>
                    <td>{row.quantity}</td>
                    <td>{row.unitPrice} €</td>
                    <td className="text-center">
                       {row.amount} €
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