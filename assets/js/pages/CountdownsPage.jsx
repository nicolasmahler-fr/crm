import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';
import Pagination from '../components/Pagination';
import CountdownsApi from '../services/CountdownsApi';
import Moment from 'moment';

const CountdownsPage = (props) => {

    const [countdowns, setCountdowns] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const STATUS_LABELS = {
        IN_PROGRESS: "En cours",
        CONSUMED: "Consommé",
        EXPIRED: "Expiré"
    };

    //Récupération des Countdowns auprès de l'API
    const fetchCountdowns = async () => {
        try { 
            const data = await CountdownsApi.findAll()
            setCountdowns(data);
            setLoading(false);
        } catch (error) {
            toast.error('Erreur lors du chargement des contrats');
        }
    }

    const formatDate = (str) => Moment(str).format('DD/MM/YYYY');

    // Supprimer les clients
    const handleDelete = async id => {
        const originalCountdowns = [...countdowns];

        setCountdowns(countdowns.filter(countdown => countdown.id !== id));
        
        try {
            await CountdownsApi.delete(id);
            toast.success('La facture a bien été supprimée');
        } catch (error) {
            setCountdowns(originalCountdowns);
            toast.error('Une erreur est survenue.');
        }
    };

    //Gestion du changement de page
    const handlePagechanged = page => setCurrentPage(page);

    //Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    //Afficher les countdowns au chargement
    useEffect(() => {
        fetchCountdowns();
    }, []);

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
            <Link to='/countdowns/new' className='btn btn-primary'>Créer un contrat de maintenance</Link>
        </div>

        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Date</th>
                    <th>Client</th>
                    <th>Reference</th>
                    <th className="text-center">Crédit initial</th>
                    <th className="text-center">Crédit disponible</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            {!loading && <tbody>
                {paginatedCountdowns.map(countdown => <tr key={countdown.id}>
                    <td>{countdown.id}</td>
                    <td>
                        <span>
                            {formatDate(countdown.date)}
                        </span>
                    </td>
                    <td>
                        <Link to={"/customers/" + countdown.customer.id}>
                            {countdown.customer.company}
                        </Link>
                    </td>
                    <td>{countdown.reference}</td>
                    <td className="text-center">
                        <span>
                            {countdown.credit}
                        </span>
                    </td>
                    <td className="text-center">
                        <span>
                            {countdown.currentCredit}
                        </span>
                    </td>
                    <td>{STATUS_LABELS[countdown.status]}</td>
                    <td>
                        <Link to={'/countdowns/' + countdown.id} className="btn btn-sm btn-primary">Editer</Link>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(countdown.id)}>Supprimer</button>
                    </td>
                </tr>
                )}
                
            </tbody>}
        </table>

        {loading && <TableLoader />}
    </>);
}

export default CountdownsPage;