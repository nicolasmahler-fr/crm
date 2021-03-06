import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './js/components/Navbar';
import HomePage from './js/pages/HomePage';
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import CustomersPage from './js/pages/CustomersPage';
import InvoicesPage from './js/pages/InvoicesPage';
import EstimatesPage from './js/pages/EstimatesPage';
import AuthApi from './js/services/AuthApi';
import AuthContext from './js/contexts/AuthContext';
import LoginPage from './js/pages/LoginPage';
import PrivateRoute from './js/components/PrivateRoute';
import CustomerPage from './js/pages/CustomerPage';
import InvoicePage from './js/pages/InvoicePage';
import InvoiceRowPage from './js/pages/InvoiceRowPage';
import EstimatePage from './js/pages/EstimatePage';
import EstimateRowPage from './js/pages/EstimateRowPage';
import RegisterPage from './js/pages/RegisterPage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import AddInvoiceRowPage from './js/pages/AddInvoiceRowPage';
import invoicePdf from './js/pages/pdf/InvoicePdf';
import AddEstimateRowPage from './js/pages/AddEstimateRowPage';
import estimatePdf from './js/pages/pdf/EstimatePdf';
import CountdownsPage from './js/pages/CountdownsPage';
import CountdownPage from './js/pages/CountdownPage';
import CountdownRowPage from './js/pages/CountdownRowPage';
import AddCountdownRowPage from './js/pages/AddCountdownRowPage';

import './styles/app.css';
AuthApi.setup();


const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(
        AuthApi.isAuthenticated()
    );

    const NavbarWithRouter = withRouter(Navbar);

    return (
        <AuthContext.Provider value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated
    }}>
            <HashRouter>
                <NavbarWithRouter/>
                <main className="container pt-5">
                    <Switch>
                        <Route
                            path="/login"
                            component = {LoginPage}
                        />
                        <Route
                            path="/register"
                            component = {RegisterPage}
                        />
                        <PrivateRoute path="/customers/:id" component={CustomerPage} />
                        <PrivateRoute path="/customers" component={CustomersPage} />
                        <PrivateRoute path="/invoices/:id" component={InvoicePage} />
                        <PrivateRoute path="/invoice_rows/:id" component={InvoiceRowPage} />
                        <PrivateRoute path="/invoiceRows/:invoice/add" component={AddInvoiceRowPage} />
                        <PrivateRoute path="/invoices" component={InvoicesPage} />
                        <PrivateRoute path="/pdf/invoice/:id" component={invoicePdf} />
                        <PrivateRoute path="/estimates/:id" component={EstimatePage} />
                        <PrivateRoute path="/estimate_rows/:id" component={EstimateRowPage} />
                        <PrivateRoute path="/estimateRows/:estimate/add" component={AddEstimateRowPage} />
                        <PrivateRoute path="/estimates" component={EstimatesPage} />
                        <PrivateRoute path="/pdf/estimate/:id" component={estimatePdf} />
                        <PrivateRoute path="/countdowns/:id" component={CountdownPage} />
                        <PrivateRoute path="/countdowns" component={CountdownsPage} />
                        <PrivateRoute path="/countdown_rows/:id" component={CountdownRowPage} />
                        <PrivateRoute path="/countdownRows/:countdown/add" component={AddCountdownRowPage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>

            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>
        </AuthContext.Provider>
    );
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);