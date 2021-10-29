import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import FormContentLoader from '../components/loaders/FormContentLoader';
import CountdownsApi from '../services/CountdownsApi';

const CountdownRowPage = ({ history, match }) => { //On extrait history et match des props

    const { id = "new" } = match.params;
    
    //Id de la facture
    const [countdown, setCountdown] = useState([]);

    //Données de la facture (rows)
    const [countdownRow, setcountdownRow] = useState({
        date: '',
        task: '',
        elapsed: ''
    });

    //Définir si mode édition (ou création)
    const [editing, setEditing] = useState(false);

    //Gestion des erreurs des champs du form
    const [errors, setErrors] = useState({
        date: '',
        task: '',
        elapsed: ''
    });

    //Chargement (etat)
    const [loading, setLoading] = useState(true);


    //recup d'une facture row
    const fetchCountdownRow = async (id) => {
        try {

            const { date, task, elapsed } = await CountdownsApi.findRow(id);
            setcountdownRow({ date, task, elapsed });
            setLoading(false);

        } catch (error) {
            console.log(error.response);
            toast.error('Impossible de charger le détail du contrat demandé.');
            //history.replace('/invoices');
        }
    }

    //recup de l'id du contrat
    const fetchCountdown = async (id) => {
        try {

            //const { countdown } = await CountdownsApi.findRow(id);
            console.log(Axios.get("http://127.0.0.1:8000/api/countdown_rows" + '/' + id))
            const { countdown } = await Axios.get("http://127.0.0.1:8000/api/countdown_rows" + '/' + id)
                .then(response => response.data);
            
            
            setCountdown({ id: countdown.id });
            setLoading(false);

        } catch (error) {
            console.log(error.response);
            toast.error('Impossible de récupérer l\'ID du contrat.');
            //history.replace('/invoices');
        }
    }

    //Récupération de la bonne facture quand l'id de l'url change
    useEffect(() => {
        if (id !== 'new') {
            setEditing(true);
            fetchCountdownRow(id);
            fetchCountdown(id);
        }
    }, [id]);

   // Gestion des changements des inputs dans le form
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setcountdownRow({...countdownRow, [name]: value})
    }

    //soumission du form
    const handleSubmit = async event => {
        event.preventDefault();
        
        try {
            if (editing) {
                await CountdownsApi.updateRow(id, countdownRow);

                toast.success('L\'entrée de la facture a bien été modifiée.');
                history.replace("/countdowns/" + countdown.id);
            } else {
                
               await CountdownsApi.createRow(countdownRow);
                toast.success('L\'entrée de la facture a bien été enregistrée.');
                history.replace("/countdowns/" + countdown.id);
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
            {!editing && <h1>Création d'une entrée du contrat</h1> || <h1>Modification d'une entrée du contrat</h1>}
            
            {loading && <FormContentLoader />}
            {!loading && <form onSubmit={handleSubmit}>
                <Field
                    name="date"
                    type="text"
                    placeholder="Date de la tâche"
                    label="Date de la tâche"
                    onChange={handleChange}
                    value={countdownRow.date}
                    error={errors.date}
                />
                <Field
                    name="task"
                    type="text"
                    placeholder="Description"
                    label="Description"
                    onChange={handleChange}
                    value={countdownRow.task}
                    error={errors.task}
                />
                <Field
                    name="elapsed"
                    type="text"
                    placeholder="Temps consommé"
                    label="Temps consommé (hh:mm)"
                    onChange={handleChange}
                    value={countdownRow.elapsed}
                    error={errors.elapsed}
                />
                
                <div className="form-group mt-3">
                    <button type="submit" className='btn btn-success'>Enregistrer</button>
                    <Link to={"/countdowns/" + countdown.id} className='btn btn-link'>Retour</Link>
                </div>
            </form>}
        </>
    );
}
 
export default CountdownRowPage;