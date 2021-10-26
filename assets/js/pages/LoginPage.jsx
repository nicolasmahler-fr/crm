import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Field from '../components/forms/Field';
import AuthContext from '../contexts/AuthContext';
import AuthApi from '../services/AuthApi';

const LoginPage = ({ history }) => {

    const { setIsAuthenticated } = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    //Gestion des champs
    const handleChange = ({currentTarget}) => {
        const { value, name } = currentTarget;
        setCredentials({ ...credentials, [name]: value });
    }

    //Gestion du submit
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await AuthApi.Authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            toast.success('Vous êtes connecté.')
            history.replace("/customers");

        } catch (error) {
            setError("Aucun compte ne possède ce mail ou mot de passe");
            toast.error('Une erreur est survenue')
        }
    }

    return (<>
        <h1>Connexion à l'application</h1>

        <form onSubmit={handleSubmit}>

            <Field
                label='Adresse e-mail'
                name='username'
                value={credentials.username}
                onChange={handleChange}
                placeholder="adresse email"
                error={error}
            />
            
            <Field
                label='Mot de passe'
                name='password'
                value={credentials.password}
                type="password"
                onChange={handleChange}
                error=''
            />

            <div className="form-group p-2">
                <button
                    type="submit"
                    className="btn btn-primary">
                    connexion
                </button>
            </div>
            
        </form>
    </>
    );
}
 
export default LoginPage;