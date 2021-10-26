import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import FormContentLoader from '../components/loaders/FormContentLoader';
import InvoicesAPI from '../services/InvoicesAPI';

const InvoiceRowPage = ({ history, match }) => { //On extrait history et match des props

    const { id = "new" } = match.params;

    //Id de la facture
    const [invoice, setInvoice] = useState([]);

    //Données de la facture (rows)
    const [invoiceRow, setInvoiceRow] = useState({
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
    const fetchInvoiceRow = async (id) => {
        try {

            const { description, quantity, amount, unitPrice} = await InvoicesAPI.findRow(id);
            setInvoiceRow({ description, quantity, amount, unitPrice});
            setLoading(false);

        } catch (error) {
            console.log(error.response);
            toast.error('Impossible de charger le détail de la facture demandée.');
            history.replace('/invoices');
        }
    }

    //recup de l'id de la facture
    const fetchInvoice = async (id) => {
        try {

            const {invoice} = await InvoicesAPI.findRow(id);
            setInvoice({ id: invoice.id });
            //setLoading(false);

        } catch (error) {
            console.log(error.response);
            toast.error('Impossible de récupérer l\'ID de la facture.');
            history.replace('/invoices');
        }
    }

    //Récupération de la bonne facture quand l'id de l'url change
    useEffect(() => {
        if (id !== 'new') {
            setEditing(true);
            fetchInvoiceRow(id);
            fetchInvoice(id);
        }
    }, [id]);

   // Gestion des changements des inputs dans le form
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setInvoiceRow({...invoiceRow, [name]: value})
    }

    //soumission du form
    const handleSubmit = async event => {
        event.preventDefault();
        
        try {
            if (editing) {
                await InvoicesAPI.updateRow(id, invoiceRow);

                toast.success('L\'entrée de la facture a bien été modifiée.');
                history.replace("/invoices/" + invoice.id);
            } else {
                
               await InvoicesAPI.createRow(invoiceRow);
                toast.success('L\'entrée de la facture a bien été enregistrée.');
                history.replace("/invoices/" + invoice.id);
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
            {!editing && <h1>Création d'une entrée dans la facture</h1> || <h1>Modification d'une entrée de la facture</h1>}
            
            {loading && <FormContentLoader />}
            {!loading && <form onSubmit={handleSubmit}>
                <Field
                    name="description"
                    type="text"
                    placeholder="Description de la tâche"
                    label="Description de la tâche"
                    onChange={handleChange}
                    value={invoiceRow.description}
                    error={errors.description}
                />
                <Field
                    name="quantity"
                    type="number"
                    placeholder="Quantité"
                    label="Quantité"
                    onChange={handleChange}
                    value={invoiceRow.quantity}
                    error={errors.quantity}
                />
                <Field
                    name="unitPrice"
                    type="number"
                    placeholder="Prix unitaire"
                    label="Prix unitaire (€)"
                    onChange={handleChange}
                    value={invoiceRow.unitPrice}
                    error={errors.unitPrice}
                />
                
                <div className="form-group mt-3">
                    <button type="submit" className='btn btn-success'>Enregistrer</button>
                    <Link to={"/invoices/" + invoice.id} className='btn btn-link'>Retour</Link>
                </div>
            </form>}
        </>
    );
}
 
export default InvoiceRowPage;