import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TableLoader from '../components/loaders/TableLoader';
import Pagination from '../components/Pagination';
import InvoicesAPI from '../services/InvoicesAPI';

const STATUS_CLASSES = {
    DRAFT: "secondary",
    PAID: "primary",
    SENT: "info",
    CANCELLED: "danger"
};

const STATUS_LABELS = {
    DRAFT: "Brouillon",
    SENT: "Envoyée",
    PAID: "Payée",
    CANCELLED: "Annulée"
};

const InvoicesPage = (props) => {

    const [invoices, setInvoices] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    //Récupération des Invoices auprès de l'API
    const fetchInvoices = async () => {
        try { 
            const data = await InvoicesAPI.findAll()
            setInvoices(data);
            setLoading(false);
        } catch (error) {
            toast.error('Erreur lors du chargement des factures');
        }
    }

    //Afficher les invoices au chargement
    useEffect(() => {
        fetchInvoices();
    }, []);

    const formatDate = (str) => Moment(str).format('DD/MM/YYYY');

    // Supprimer les clients
    const handleDelete = async id => {
        const originalInvoices = [...invoices];

        setInvoices(invoices.filter(invoice => invoice.id !== id));
        
        try {
            await InvoicesAPI.delete(id);
            toast.success('La facture a bien été supprimée');
        } catch (error) {
            setInvoices(originalInvoices);
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

    //filtrage des factures en fonction de la recherche
    const filteredInvoices = invoices.filter(
        i =>
            i.customer.firstName.toLowerCase().includes(search.toLowerCase())
            ||
            i.customer.lastName.toLowerCase().includes(search.toLowerCase())
            ||
            i.amount.toString().startsWith(search.toLowerCase())
            ||
            STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase())
            ||
            i.chrono.toString().startsWith(search.toLowerCase())
    );

    //pagination des données
    const paginatedInvoices = Pagination.getData(
        filteredInvoices,
        currentPage,
        itemsPerPage
    );


    return (<>
        <div className=" mb-3 d-flex justify-content-between align-items-center">
                <h1>Liste des factures</h1>
                <Link to='/invoices/new' className='btn btn-primary'>Créer une facture</Link>
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
                    <th>Date de paiement</th>
                    <th className="text-center">Statut</th>
                    <th className="text-center">Montant</th>
                    <th></th>
                </tr>
            </thead>
            {!loading && <tbody>
                {paginatedInvoices.map(invoice => <tr key={invoice.id}>
                    <td>{invoice.year}{invoice.chrono}</td>
                    <td>
                        <Link to={"/customers/" + invoice.customer.id}>
                            {invoice.customer.company}
                        </Link>
                    </td>
                    <td>{formatDate(invoice.sentAt)}</td>
                    <td>{formatDate(invoice.paidAt)}</td>
                    
                    <td className="text-center">
                        <span className={"badge badge-" + STATUS_CLASSES[invoice.status]}>
                            {STATUS_LABELS[invoice.status]}
                        </span>
                    </td>
                    <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                    <td>
                        <Link to={'/invoices/' + invoice.id} className="btn btn-sm btn-primary">Voir / Editer</Link>
                        {/* <button className="btn btn-sm btn-danger" onClick={() => handleDelete(invoice.id)}>Supprimer</button> */}
                    </td>
                </tr>
                )}
                
            </tbody>}
        </table>

        {loading && <TableLoader/>}
        <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChanged={handlePagechanged} length={filteredInvoices.length}/>
    </>    );
}
 
export default InvoicesPage;