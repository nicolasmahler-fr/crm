import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import Select from '../components/forms/Select';
import CustomersAPI from '../services/CustomersAPI';
import CountdownsApi from '../services/CountdownsApi';
import moment from 'moment';

const CountdownPage = ({ history, match }) => {
    
    //Check id param to determinate if new or update
    const { id = "new" } = match.params;

    const formatDate = (str) => moment(str).format('DD/MM/YYYY');

    //Date du moment
    const now = Date.now();
    console.log(formatDate(now))

    //init countdown states
    const [countdown, setCountdown] = useState({
        status : '',
        customer: '',
        credit: '00:00'
    });

    //init customers states
    const [customers, setCustomers] = useState([]);

    // init countdown rows
    const [rows, setRows] = useState([]);

    // init editing context
    const [editing, setEditing] = useState(false);

    // init errors
    const [errors, setErrors] = useState({
        status: '',
        customer: '',
        credit: ''
    });

    // init loading state
    const [loading, setLoading] = useState(true);

    //recup des clients
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll();
            setCustomers(data);
            setLoading(false);

            if (!countdown.customer) setCountdown({ ...countdown, customer: data[0].id });
        } catch (error) {
            console.log(error.response)
            toast.error('Impossible de charger les clients.');
            //history.replace('/countdowns');
        }
    }

    //recup d'une facture
    const fetchCountdown = async (id) => {
        try {

            const { reference, credit, customer} = await CountdownsApi.find(id);
            setCountdown({ reference, credit, customer: customer.id });
            setLoading(false);

        } catch (error) {
            console.log(error.response);
            toast.error('Impossible de charger le contrat demandé.');
            //history.replace('/countdowns');
        }
    }

    const fetchCountdownRows = async () => {
        try {
            const data = await CountdownsApi.findAllRows(id);
            setRows(data);
            setLoading(false);

            //if (!invoice.customer) setInvoice({ ...invoice, customer: data[0].id });
        } catch (error) {
            console.log(error.response)
            toast.error('Impossible de charger les détails du contrat.');
            //history.replace('/invoices');
        }
    }

    //recup de la liste des clients à chaque chargement du composant
    useEffect(() => {
        fetchCustomers();
    }, []);

     //recup de la liste des détails de facture à chaque chargement du composant
    useEffect(() => {
        fetchCountdownRows();
    }, []);

    //Récupération du bon contrat quand l'id de l'url change
    useEffect(() => {
        if (id !== 'new') {
            setEditing(true);
            fetchCountdown(id);
        }
    }, [id]);


     // Gestion des changements des inputs dans le form
    const handleChange = ({ currentTarget }) => {
        
        const { name, value } = currentTarget;

        if (name === 'credit'){
            if (!checkHourFormat(value)) {
                setErrors('Mauvais format')
                console.log('bad')
            } else {
                console.log('GOOD')
            };
        }

        setCountdown({...countdown, [name]: value})
    }

    //Validate hh:mm input format
    const checkHourFormat = (value) => {
        //Regex to validate formats : 00:00 to 99:59
        var re = /^([0-9]{1,2}:[0-5][0-9])$/
        if (re.test(value)) {
            return true;
        }
        return false;
        
    }

     //soumission du form
    const handleSubmit = async event => {
        event.preventDefault();

        const apiErrors = {};

        if (!checkHourFormat(countdown.credit)) {
            apiErrors.credit = "Mauvais format. Format attendu : hh:mm";
            setErrors(apiErrors);
            toast.error('Le champ crédit est mal renseigné. Format attendu : hh:mm');
            return;
        }
        
        try {
            if (editing) {
               await CountdownsApi.update(id, countdown)
               toast.success('Le contrat a bien été modifié.');
            } else {
               await CountdownsApi.create(countdown);
                toast.success('Le contrat a bien été enregistré.');
                history.replace('/countdowns');
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

     // Supprimer une row
    const handleDelete = async id => {
        const originalCountdownRows = [...rows];

        setRows(rows.filter(row => row.id !== id));
        //setInvoice({ ...invoice, [amount]: 666 })
        
        
        try {
            await CountdownsApi.deleteRow(id);

            /* const { amount } = await InvoicesAPI.find(match.params.id);
            setInvoice({ amount }); */

            toast.success('L\'entréé a bien été supprimée');
        } catch (error) {
            setRows(originalCountdownRows);
            toast.error('Une erreur est survenue.');
        }
    };

    //deprecated
   /*  const testHoraire = (value) => {
        const ref = countdown.reference.split(':')
        const output = (parseInt(ref[0]) * 60) + parseInt(ref[1])
        const calcul = output - value
        return calcul
    } */
    

    return (
        <>
            {!editing && <h1>Création d'un contrat de maintenance</h1> || <h1>Modification d'un contrat de maintenance</h1>}
            
            {/* <div>Test horaire : {testHoraire(10)} </div> */}
            <form onSubmit={handleSubmit}>
                <Select
                    name='customer'
                    label='client'
                    onChange={handleChange}
                    value={countdown.customer}
                    error={errors.customer}
                >
                    {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.company}</option>)}
                </Select>

                <Field
                    name="credit"
                    type="text"
                    placeholder="Temps alloué"
                    label="Temps alloué"
                    onChange={handleChange}
                    value={countdown.credit}
                    error={errors.credit}
                />

                <Select
                    name="status"
                    label="Status"
                    onChange={handleChange}
                    value={countdown.status}
                    error={errors.status}
                >
                    <option value="IN_PROGRESS">En cours</option>
                    <option value="CONSUMED">Consommé</option>
                    <option value="EXPIRED">Expiré</option>
                </Select>  

                <div className="form-group mt-3">
                    <button type="submit" className='btn btn-success'>Enregistrer</button>
                    <Link to='/countdowns' className='btn btn-link'>Retour aux contrats</Link>
                </div>
            </form>

            <div className='m-4 text-center'>
                <Link to={'/countdownRows/' + match.params.id + '/add'} className='btn btn-primary'>Créer une entrée</Link>&nbsp;
                <Link to={'/pdf/countdown/' + match.params.id} className='btn btn-secondary'>Contrat PDF</Link>&nbsp;
            </div>
            {rows.length >0 && <div>
            <h3 className="mt-5">Historique</h3>
            <table className="table table-hover">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th className="text-center">Temps consommé (hh:mm)</th>
                    <th></th>
                </tr>
            </thead>
                <tbody>
                    {rows.map(row => <tr key={row.id}>
                        <td>{formatDate(row.date)}</td>
                    <td>{row.task}</td>
                    <td className="text-center">
                       {row.elapsed}
                    </td>
                    <td>
                        <Link to={'/countdown_rows/' + row.id} className="btn btn-sm btn-primary">Editer</Link>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row.id)}>Supprimer</button>
                    </td>
                </tr>
                )}
                    
                </tbody>
            </table></div>}
        </>
    );
}

export default CountdownPage;