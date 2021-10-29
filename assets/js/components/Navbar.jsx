import React, { useContext } from 'react';
import AuthApi from '../services/AuthApi';
import { NavLink } from "react-router-dom";
import AuthContext from '../contexts/AuthContext';
import { toast } from 'react-toastify';

const Navbar = ({ history }) => {

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    AuthApi.logout();
    setIsAuthenticated(false);
    toast.info('Vous êtes désormais déconnecté');
    history.push("/login");
  }

  return (
      

<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">fhl-crm</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarColor03">
      <ul className="navbar-nav me-auto">

        <li className="nav-item">
          <NavLink className="nav-link" to="/customers">Clients</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/invoices">Factures</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/countdowns">Contrats de maintenance</NavLink>
            </li>
      </ul>
          <ul className="navbar-nav mll-auto">
            {!isAuthenticated && <>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">inscription</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/login" className="btn btn-primary">connexion</NavLink>
              </li>
            </> || <li className="nav-item">
          <button onClick={handleLogout} className="btn btn-secondary">déconnexion</button>
        </li>}
              
        
      </ul>
    </div>
  </div>
</nav>

    )
}
 
export default Navbar;