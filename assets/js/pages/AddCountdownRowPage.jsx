import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import CountdownsApi from '../services/CountdownsApi';
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import fr from 'date-fns/locale/fr';


const AddCountdownRowPage = ({history, match}) => {

    const { countdown } = match.params;

    registerLocale('fr', fr)

    const [row, setRow] = useState({
        date: new Date(),
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
        console.log(name)
        const { name, value } = currentTarget;
        if (name === 'date') {
            console.log('toto date')
        }
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
                <DatePicker locale="fr" dateFormat="dd/MM/yyyy" selected={row.date} value={row.date} error={errors.date} name="date" id="date" onChange={(value) => setRow({ ...row, date: value })}/>
              {/*  <Field
                    name="date"
                    type="text"
                    placeholder="Date de la tâche"
                    label="Date de la tâche"
                    onChange={handleChange}
                    value={row.date}
                    error={errors.date}
                /> */}
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