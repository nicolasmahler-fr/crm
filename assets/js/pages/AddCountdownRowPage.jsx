import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import CountdownsApi from '../services/CountdownsApi';

const AddCountdownRowPage = ({history, match}) => {

    const { countdown } = match.params;

    const [row, setRow] = useState({
        date: '',
        task: '',
        elapsed: '00:00',
        countdown: countdown
    });

    const [errors, setErrors] = useState({
       date: '',
       task: '',
       elapsed: '',
       countdown: ''
    })

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setRow({ ...row, [name]: value });
    }

     //soumission du form
    const handleSubmit = async event => {
        event.preventDefault();
        
        try {
            await CountdownsApi.createRow(row)
            toast.success('L\'entrée du contrat a bien été ajoutée.');
            history.replace('/countdowns/' + row.countdown);
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
            <h1>Créer une entrée pour le contrat n° : {countdown}</h1>
            <form onSubmit={handleSubmit}>
               <Field
                    name="date"
                    type="text"
                    placeholder="Date de la tâche"
                    label="Date de la tâche"
                    onChange={handleChange}
                    value={row.date}
                    error={errors.date}
                />
                <Field
                    name="task"
                    type="text"
                    placeholder="Description"
                    label="Description"
                    onChange={handleChange}
                    value={row.task}
                    error={errors.task}
                />
                <Field
                    name="elapsed"
                    type="text"
                    placeholder="Temps consommé"
                    label="Temps consommé (hh:mm)"
                    onChange={handleChange}
                    value={row.elapsed}
                    error={errors.elapsed}
                />

                <div className="form-group mt-3">
                    <button type="submit" className='btn btn-success'>Enregistrer</button>
                </div>
            </form>
        </>
     );
}
 
export default AddCountdownRowPage;