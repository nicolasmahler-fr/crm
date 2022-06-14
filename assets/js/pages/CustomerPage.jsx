import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import FormContentLoader from '../components/loaders/FormContentLoader';
import CustomersAPI from '../services/CustomersAPI';

const CustomerPage = ({match, history}) => {

    const { id = 'new' } = match.params;

    const [customer, setCustomer] = useState({
        lastName:   '',
        firstName:  '',
        email :     '',
        company :   '',
        address1 : '',
        address2 : '',
        postcode : '',
        city : '',
        country: '',
    });

    const [errors, setErrors] = useState({
        lastName:   '',
        firstName:  '',
        email :     "",
        company :   "",
        address1 : '',
        address2 : '',
        postcode : '',
        city : '',
        country: '',
    })

    const [loading, setLoading] = useState(false);

    const [editing, setEditing] = useState(false);

    // recuperation du customer en fonction de l'id
    const fetchCustomer = async id => {
        try {
            const { firstName, lastName, email, company, address1, address2, postcode, city, country } = await CustomersAPI.findCached(id);
            setCustomer({ firstName, lastName, email, company, address1, address2, postcode, city, country });
            setLoading(false);
        } catch (error) {
            toast.error("Le client n'a pas pu être chargé.");
            history.replace('/customers');
        }
    }

    //chargement du customer si besoin au chargement ou au changement de l'id
    useEffect(() => {
        if (id !== 'new') {
            setLoading(true);
            setEditing(true);
            fetchCustomer(id);
        };
    }, [id]);

    // Gestion des changements des inputs dans le form
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setCustomer({...customer, [name]: value})
    }

    //Gestion de la soumission du form
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            setErrors({});
            if (editing) {
                await CustomersAPI.updateCached(id, customer);

                toast.success('Le client a bien été modifié.');

            } else {
                await CustomersAPI.createCached(customer);

                toast.success('Le client a bien été créé.');
                history.replace("/customers");
            }
        } catch ({ response }) {
            const { violations } = response.data;
            if (violations) {
                const apiErrors = {};
                violations.forEach( ({ propertyPath, message }) => {
                    apiErrors[propertyPath] = message;
                });

                setErrors(apiErrors);
                toast.error("Des erreurs dans votre formulaire.");
            }
        }
    }

    return (
        <>
            {!editing && <h1>Création d'un client</h1> || <h1>Modification du client</h1>}
            {loading && <FormContentLoader/>}
            {!loading && <form onSubmit={handleSubmit}>

                <Field
                    name="lastName"
                    label='nom de famille'
                    placeholder='nom de famille du client'
                    value={customer.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                />

                <Field
                    name="firstName"
                    label='Prénom'
                    placeholder='Prénom du client'
                    value={customer.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                />

                <Field
                    name="email"
                    label='Addresse email'
                    placeholder='Addresse email du client'
                    type='email'
                    value={customer.email}
                    onChange={handleChange}
                    error={errors.email}
                />

                <Field
                    name="company"
                    label='Entreprise'
                    placeholder='Entreprise du client'
                    value={customer.company}
                    onChange={handleChange}
                    error={errors.company}
                />

                <Field
                    name="address1"
                    label='Adresse 1'
                    placeholder='n° et nom de la rue'
                    value={customer.address1}
                    onChange={handleChange}
                    error={errors.address1}
                />

                <Field
                    name="address2"
                    label='Adresse 2'
                    placeholder='Appartement, étage...'
                    value={customer.address2}
                    onChange={handleChange}
                    error={errors.address2}
                />

                <Field
                    name="postcode"
                    type="number"
                    placeholder="Code postal"
                    label="code postal"
                    onChange={handleChange}
                    value={customer.postcode}
                    error={errors.postcode}
                />

                <Field
                    name="city"
                    label='Ville'
                    placeholder='Ville'
                    value={customer.city}
                    onChange={handleChange}
                    error={errors.city}
                />

                <Field
                    name="country"
                    label='Pays'
                    placeholder='Pays'
                    value={customer.country}
                    onChange={handleChange}
                    error={errors.country}
                />


                <div className="form-group mt-3">
                    <button type="submit" className='btn btn-success'>Enregistrer</button>
                    <Link to='/customers' className='btn btn-link'>Retour</Link>
                </div>

            </form>}
        </>
    );
}
 
export default CustomerPage;