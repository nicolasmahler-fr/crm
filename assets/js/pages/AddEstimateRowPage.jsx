import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import EstimatesAPI from '../services/EstimatesAPI';

const AddrowPage = ({history, match}) => {

    const { estimate } = match.params;

    const [row, setRow] = useState({
        description: '',
        quantity: '',
        unitPrice: 50,
        estimate: estimate
    });

    const [errors, setErrors] = useState({
        description: '',
        quantity: '',
        unitPrice: '',
        estimate: ''
    })

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setRow({ ...row, [name]: value });
    }

     //soumission du form
    const handleSubmit = async event => {
        event.preventDefault();
        
        try {
            console.log(row)
            await EstimatesAPI.createRow(row);
            toast.success('L\'entrée du devis a bien été ajoutée.');
            history.replace('/estimates/' + row.estimate);
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
            <h1>Créer une entrée pour le devis n° : {estimate}</h1>
            <form onSubmit={handleSubmit}>
               <Field
                    name="description"
                    type="text"
                    placeholder="Description de la tâche"
                    label="Description de la tâche"
                    onChange={handleChange}
                    value={row.description}
                    error={errors.description}
                />
                <Field
                    name="quantity"
                    type="number"
                    placeholder="Quantité"
                    label="Quantité"
                    onChange={handleChange}
                    value={row.quantity}
                    error={errors.quantity}
                />
                <Field
                    name="unitPrice"
                    type="number"
                    placeholder="Prix unitaire"
                    label="Prix unitaire"
                    onChange={handleChange}
                    value={row.unitPrice}
                    error={errors.unitPrice}
                />

                <div className="form-group mt-3">
                    <button type="submit" className='btn btn-success'>Enregistrer</button>
                </div>
            </form>
        </>
     );
}
 
export default AddrowPage   ;