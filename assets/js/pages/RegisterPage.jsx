import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import UsersApi from '../services/UsersApi';

const RegisterPage = ({ history }) => {

    const [user, setUser] = useState({
        firstName:  '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    const [errors, setErrors] = useState({
        firstName:  '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    })

    // Gestion des changements des inputs dans le form
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setUser({...user, [name]: value})
    }

    //Gestion de la soumission
    const handleSubmit = async event => {

        event.preventDefault();

        const apiErrors = {};

        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Les mots de passe ne correspondent pas";
            setErrors(apiErrors);
            toast.error('Des erreurs dans votre formulaire.');
            return;
        }
        
        try {
            await UsersApi.create(user);

            setErrors({});
            //todo flash success
            toast.success('Vous êtes désormais inscrit. Vous pouvez vous connecter.');
            history.replace('/login');
            
        } catch (error) {
            const { violations } = error.response.data;
            if (violations) {
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
            //todo flash error
            toast.error('Des erreurs dans votre formulaire.');
        }
    }


    return (
        <>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>

                <Field
                    name='firstName'
                    label='prénom'
                    placeholder='Votre prénom'
                    error={errors.firstName}
                    value={user.firstName}
                    onChange={handleChange}
                />

                <Field
                    name='lastName'
                    label='nom'
                    placeholder='Votre nom'
                    error={errors.lastName}
                    value={user.lastName}
                    onChange={handleChange}
                />

                <Field
                    name='email'
                    label='email'
                    placeholder='Votre email'
                    error={errors.email}
                    value={user.email}
                    onChange={handleChange}
                    type="email"
                />

                <Field
                    name='password'
                    label='Mot de passe'
                    type='password'
                    placeholder='Votre Mot de passe'
                    error={errors.password}
                    value={user.password}
                    onChange={handleChange}
                />

                <Field
                    name='passwordConfirm'
                    label='Confirmation de votre mot de passe'
                    type='password'
                    placeholder='Resaisissez votre mot de passe'
                    error={errors.passwordConfirm}
                    value={user.passwordConfirm}
                    onChange={handleChange}
                />

                <div className="form-group mt-3">
                    <button type="submit" className='btn btn-success'>Créer mon compte</button>
                    <Link to='/login' className='btn btn-link'>J'ai déjà un compte</Link>
                </div>

            </form>
        </>);
}
 
export default RegisterPage;