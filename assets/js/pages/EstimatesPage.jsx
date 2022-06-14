import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';
import Pagination from '../components/Pagination';
import EstimatesAPI from '../services/EstimatesAPI';

const STATUS_CLASSES = {
    VALIDATE: "primary",
    SENT: "info",
    CANCELLED: "danger",
    DRAFT: "secondary"
};

const STATUS_LABELS = {
    SENT: "Envoyé",
    VALIDATE: "Validé",
    CANCELLED: "Annulé",
    DRAFT: "Brouillon"
};

const EstimatesPage = (props) => {

    const [estimates, setEstimates] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    //Récupération des devis auprès de l'API
    const fetchEstimates = async () => {
        try { 
            const data = await EstimatesAPI.findAll()
            setEstimates(data);
            setLoading(false);
        } catch (error) {
            toast.error('Erreur lors du chargement des factures');
        }
    }

    //Afficher les devis au chargement
    useEffect(() => {
        fetchEstimates();
    }, []);

    const formatDate = (str) => Moment(str).format('DD/MM/YYYY');

    // Supprimer les clients
    const handleDelete = async id => {
        const originalEstimates = [...estimates];

        setEstimates(estimates.filter(estimate => estimate.id !== id));
        
        try {
            await EstimatesAPI.delete(id);
            toast.success('Le devis a bien été supprimée');
        } catch (error) {
            setEstimates(originalEstimates);
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

    

    const itemsPerPage = 20;

    //filtrage des devis en fonction de la recherche
    const filteredEstimates = estimates.filter(
        e =>
            e.customer.firstName.toLowerCase().includes(search.toLowerCase())
            ||
            e.customer.lastName.toLowerCase().includes(search.toLowerCase())
            ||
            e.amount.toString().startsWith(search.toLowerCase())
            ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
            ||
            e.chrono.toString().startsWith(search.toLowerCase())
    );

    //pagination des données
    const paginatedEstimates = Pagination.getData(
        filteredEstimates,
        currentPage,
        itemsPerPage
    );


    return (<>
        <div className=" mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des devis</h1>
                <Link to='/estimates/new' className='btn btn-primary'>Créer un devis</Link>
            </div>

        <div className="form-group">
            <input type="text" className="form-control" placeholder="rechercher"
                onChange={handleSearch}
                value={search} />
         </div>

        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Client</th>
                    <th>Date d'envoi</th>
                    <th>Date de validation</th>
                    <th className="text-center">Statut</th>
                    <th className="text-center">Montant</th>
                    <th></th>
                </tr>
            </thead>
            {!loading && <tbody>
                {paginatedEstimates.map(estimate => <tr key={estimate.id}>
                    <td>{estimate.year}{estimate.chrono}</td>
                    <td>
                        <Link to={"/customers/" + estimate.customer.id}>
                            {estimate.customer.company}
                        </Link>
                    </td>
                    <td>{formatDate(estimate.sentAt)}</td>
                    <td>{formatDate(estimate.paidAt)}</td>
                    
                    <td className="text-center">
                        <span className={"badge badge-" + STATUS_CLASSES[estimate.status]}>
                            {STATUS_LABELS[estimate.status]}
                        </span>
                    </td>
                    <td className="text-center">{estimate.amount.toLocaleString()} €</td>
                    <td>
                        <Link to={'/estimates/' + estimate.id} className="btn btn-sm btn-primary">Voir / Editer</Link>
                        {/* <button className="btn btn-sm btn-danger" onClick={() => handleDelete(estimate.id)}>Supprimer</button> */}
                    </td>
                </tr>
                )}
                
            </tbody>}
        </table>

        {loading && <TableLoader/>}
        <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePagechanged} length={filteredEstimates.length}/>
    </>    );
}
 
export default EstimatesPage;