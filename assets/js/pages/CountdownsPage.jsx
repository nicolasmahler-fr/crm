import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import TableLoader from '../components/loaders/TableLoader';
import Pagination from '../components/Pagination';

const CountdownsPage = (props) => {

    const [countdowns, setCountdowns] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    //Récupération des Countdowns auprès de l'API
    const fetchCountdowns = async () => {
        try { 
            const data = await CountdownsAPI.findAll()
            setCountdowns(data);
            setLoading(false);
        } catch (error) {
            toast.error('Erreur lors du chargement des factures');
        }
    }

    //Afficher les countdowns au chargement
    useEffect(() => {
        fetchCountdowns();
    }, []);

     //Gestion du changement de page
    const handlePagechanged = page => setCurrentPage(page);

    const itemsPerPage = 20;

    //pagination des données
    const paginatedCountdowns = Pagination.getData(
        countdowns,
        currentPage,
        itemsPerPage
    );

    
    return (<>
        <div className=" mb-3 d-flex justify-content-between align-items-center">
            <h1>Liste des contrats de maintenance</h1>
            <Link to='/invoices/new' className='btn btn-primary'>Créer un contrat de maintenance</Link>
        </div>

        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Client</th>
                    <th>Reference</th>
                    <th className="text-center">Crédit disponible</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {paginatedCountdowns.map(countdown => <tr key={countdown.id}>
                    <td>{countdown.id}</td>
                    <td>
                        <Link to={"/customers/" + countdown.customer.id}>
                            {countdown.customer.firstName} {countdown.customer.lastName}
                        </Link>
                    </td>
                    <td>{formatDate(countdown.reference)}</td>
                    <td className="text-center">
                        <span>
                            {countdown.credit}
                        </span>
                    </td>
                    <td>
                        <Link to={'/countdowns/' + countdown.id} className="btn btn-sm btn-primary">Editer</Link>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(invoice.id)}>Supprimer</button>
                    </td>
                </tr>
                )}
                
            </tbody>
        </table>

        <TableLoader/>
    </>);
}

export default CountdownsPage;