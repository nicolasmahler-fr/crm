import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import FormContentLoader from '../components/loaders/FormContentLoader';
import EstimatesAPI from '../services/EstimatesAPI';

const EstimateRowPage = ({ history, match }) => { //On extrait history et match des props

    const { id = "new" } = match.params;

    //Id du devis
    const [estimate, setEstimate] = useState([]);

    //Données du devis (rows)
    const [estimateRow, setEstimateRow] = useState({
        description: '',
        quantity: '',
        unitPrice: ''
    });

    //Définir si mode édition (ou création)
    const [editing, setEditing] = useState(false);

    //Gestion des erreurs des champs du form
    const [errors, setErrors] = useState({
        description: '',
        quantity: '',
        unitPrice: ''
    });

    //Chargement (etat)
    const [loading, setLoading] = useState(true);


    //recup d'une facture row
    const fetchEstimateRow = async (id) => {
        try {

            const { description, quantity, amount, unitPrice} = await EstimatesAPI.findRow(id);
            setEstimateRow({ description, quantity, amount, unitPrice});
            setLoading(false);

        } catch (error) {
            console.log(error.response);
            toast.error('Impossible de charger le détail du devis.');
            history.replace('/estimates');
        }
    }

    //recup de l'id du devis
    const fetchEstimate = async (id) => {
        try {

            const {estimate} = await EstimatesAPI.findRow(id);
            setEstimate({ id: estimate.id });
            //setLoading(false);

        } catch (error) {
            console.log(error.response);
            toast.error('Impossible de récupérer l\'ID du devis.');
            history.replace('/estimates');
        }
    }

    //Récupération du bon devis quand l'id de l'url change
    useEffect(() => {
        if (id !== 'new') {
            setEditing(true);
            fetchEstimateRow(id);
            fetchEstimate(id);
        }
    }, [id]);

   // Gestion des changements des inputs dans le form
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setEstimateRow({...estimateRow, [name]: value})
    }

    //soumission du form
    const handleSubmit = async event => {
        event.preventDefault();
        
        try {
            if (editing) {
                await EstimatesAPI.updateRow(id, estimateRow);

                toast.success('L\'entrée du devis a bien été modifié.');
                history.replace("/estimates/" + estimate.id);
            } else {
                
               await EstimatesAPI.createRow(estimateRow);
                toast.success('L\'entrée du devis a bien été enregistré.');
                history.replace("/estimates/" + estimate.id);
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
            {!editing && <h1>Création d'une entrée dans le devis</h1> || <h1>Modification d'une entrée du devis</h1>}
            
            {loading && <FormContentLoader />}
            {!loading && <form onSubmit={handleSubmit}>
                <Field
                    name="description"
                    type="text"
                    placeholder="Description de la tâche"
                    label="Description de la tâche"
                    onChange={handleChange}
                    value={estimateRow.description}
                    error={errors.description}
                />
                <Field
                    name="quantity"
                    type="number"
                    placeholder="Quantité"
                    label="Quantité"
                    onChange={handleChange}
                    value={estimateRow.quantity}
                    error={errors.quantity}
                />
                <Field
                    name="unitPrice"
                    type="number"
                    placeholder="Prix unitaire"
                    label="Prix unitaire (€)"
                    onChange={handleChange}
                    value={estimateRow.unitPrice}
                    error={errors.unitPrice}
                />
                
                <div className="form-group mt-3">
                    <button type="submit" className='btn btn-success'>Enregistrer</button>
                    <Link to={"/estimates/" + estimate.id} className='btn btn-link'>Retour</Link>
                </div>
            </form>}
        </>
    );
}
 
export default EstimateRowPage;