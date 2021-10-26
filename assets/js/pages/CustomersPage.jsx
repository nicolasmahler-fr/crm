import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import CustomersAPI from '../services/CustomersAPI';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';

const CustomersPage = (props) => {

    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    //Récupérer les clients
    //methode async try catch
    const fetchCustomers = async () => {
         try {
            const data = await CustomersAPI.findAllCached()
             setCustomers(data);
             setLoading(false);
        } catch (error) {
             toast.error('Impossible de charger les clients.');
        }
    }

    // au cahrgement chercher les customers
    useEffect(() => {
        fetchCustomers()
    }, [])

    // Methode .get -> .then
    /* useEffect(() => {
        CustomersAPI.findAll()
            .then(data => setCustomers(data))
            .catch(error => console.log(error.response));
    }, []) */

    // Supprimer les clients
    const handleDelete = async id => {
        const originalCustomers = [...customers];

        setCustomers(customers.filter(customer => customer.id !== id));
        
        try {
            await CustomersAPI.deleteCached(id)
            toast.success('Le client a bien été supprimé.');
        } catch (error) {
            setCustomers(originalCustomers);
            toast.error('La suppression du client ne fonctionne pas');
        }
        /* CustomersAPI.delete(id)
            .then(response => console.log('ok'))
            .catch(error => {
                setCustomers(originalCustomers)
            console.log(error.response)
        }); */
    };

    //Gestion du changement de page
    const handlePagechange = page => setCurrentPage(page);

    //Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    const itemsPerPage = 10;

    //filtrage des clients en fonction de la recherche
    const filteredCustomers = customers.filter(
        c =>
            c.firstName.toLowerCase().includes(search.toLowerCase())
            ||
            c.lastName.toLowerCase().includes(search.toLowerCase())
            ||
            c.email.toLowerCase().includes(search.toLowerCase())
            ||
            c.company.toLowerCase().includes(search.toLowerCase())
    );
    
    //pagination des données
    const paginatedCustomers = Pagination.getData(
        filteredCustomers,
        currentPage,
        itemsPerPage
    );

    return (
        <>
            <div className=" mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des clients</h1>
                <Link to='/customers/new' className='btn btn-primary'>Créer un client</Link>
            </div>

            <div className="form-group">
                <input type="text" className="form-control" placeholder="rechercher" onChange={handleSearch} value={search}/>
            </div>

            <table className="table table-active">
                <thead>
                    <tr>
                        <th>Id.</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className="text-center">Factures</th>
                        <th className="text-center">Montant total</th>
                        <th></th>
                    </tr>
                </thead>
                {!loading && (<tbody>
                    {paginatedCustomers.map(customer => <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>
                            <Link to={"/customers/" + customer.id}>
                                {customer.firstName} {customer.lastName}
                            </Link>
                        </td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center"><span className="badge rounded-pill bg-primary">{customer.invoices.length}</span></td>
                        <td className="text-center">{customer.totalAmount.toLocaleString()} €</td>
                        <td>
                            <button
                                onClick={() => handleDelete(customer.id)}
                                disabled={customer.invoices.length > 0}
                                className="btn btn-sm btn-secondary"
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                    )}
                </tbody>)}
            </table>
            {loading && <TableLoader />}
            {/* <TableLoader /> */}
            {itemsPerPage < filteredCustomers.length &&
                <Pagination
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    length={filteredCustomers.length}
                    onPageChanged={handlePagechange}
                />
            }
        </>
            );
}
 
export default CustomersPage;
