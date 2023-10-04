import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import FormContentLoader from "../components/loaders/FormContentLoader";
import CustomersAPI from "../services/CustomersAPI";
import InvoicesAPI from "../services/InvoicesAPI";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import moment from "moment";

const InvoicePage = ({ history, match }) => {
  //On extrait history et match des props

  const { id = "new" } = match.params;

  registerLocale("fr", fr);

  const [invoice, setInvoice] = useState({
    vat: 0,
    amount: "",
    customer: "",
    status: "DRAFT",
    year: "",
    chrono: "",
    paidAt: "",
  });

  const [customers, setCustomers] = useState([]);

  const [rows, setRows] = useState([]);

  const [editing, setEditing] = useState(false);

  const [errors, setErrors] = useState({
    vat: "",
    amount: "",
    customer: "",
    status: "",
    year: "",
    chrono: "",
    paidAt: "",
  });

  const [loading, setLoading] = useState(true);

  //recup des clients
  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll();
      setCustomers(data);
      setLoading(false);

      if (!invoice.customer) setInvoice({ ...invoice, customer: data[0].id });
    } catch (error) {
      console.log(error.response);
      toast.error("Impossible de charger les clients.");
      history.replace("/invoices");
    }
  };

  const fetchInvoiceRows = async () => {
    try {
      const data = await InvoicesAPI.findAllRows(id);
      setRows(data);
      setLoading(false);

      //if (!invoice.customer) setInvoice({ ...invoice, customer: data[0].id });
    } catch (error) {
      console.log(error.response);
      toast.error("Impossible de charger les détails de la facture.");
      history.replace("/invoices");
    }
  };

  //recup d'une facture
  const fetchInvoice = async (id) => {
    try {
      const { vat, amount, status, customer, year, chrono, paidAt } =
        await InvoicesAPI.find(id);
      setInvoice({
        vat,
        amount,
        status,
        customer: customer.id,
        year,
        chrono,
        paidAt,
      });
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      toast.error("Impossible de charger la facture demandée.");
      history.replace("/invoices");
    }
  };

  //recup de la liste des clients à chaque chargement du composant
  useEffect(() => {
    fetchCustomers();
  }, []);

  //recup de la liste des détails de facture à chaque chargement du composant
  useEffect(() => {
    fetchInvoiceRows();
  }, []);

  //Récupération de la bonne facture quand l'id de l'url change
  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchInvoice(id);
    }
  }, [id]);

  // Gestion des changements des inputs dans le form
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setInvoice({ ...invoice, [name]: value });
  };

  // Supprimer une row
  const handleDelete = async (id) => {
    const originalInvoiceRows = [...rows];

    setRows(rows.filter((row) => row.id !== id));
    //setInvoice({ ...invoice, [amount]: 666 })

    try {
      await InvoicesAPI.deleteRow(id);

      const { amount } = await InvoicesAPI.find(match.params.id);
      setInvoice({ amount });

      toast.success("L'entréé a bien été supprimée");
    } catch (error) {
      setRows(originalInvoiceRows);
      toast.error("Une erreur est survenue.");
    }
  };

  //soumission du form
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editing) {
        await InvoicesAPI.update(id, invoice);

        toast.success("La facture a bien été modifiée.");
      } else {
        await InvoicesAPI.create(invoice);
        toast.success("La facture a bien été enregistrée.");
        history.replace("/invoices");
      }
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });

        setErrors(apiErrors);

        toast.error("Des erreurs dans votre formulaire.");
      }
    }
  };

  return (
    <>
      {(!editing && <h1>Création d'une facture</h1>) || (
        <h1>
          Facture {invoice.year}
          {invoice.chrono}{" "}
          <Link
            to={"/pdf/invoice/" + match.params.id}
            className="btn btn-secondary ms-lg-auto"
          >
            PDF
          </Link>
        </h1>
      )}

      {loading && <FormContentLoader />}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <Select
            name="vat"
            label="TVA applicable"
            onChange={handleChange}
            value={invoice.vat}
            error={errors.vat}
          >
            <option value="1">Oui</option>
            <option value="0">Non</option>
          </Select>

          <Field
            name="amount"
            type="number"
            placeholder="Montant de la facture"
            label="montant"
            onChange={handleChange}
            value={invoice.amount}
            error={errors.amount}
          />

          <Select
            name="customer"
            label="client"
            onChange={handleChange}
            value={invoice.customer}
            error={errors.customer}
          >
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.company}
              </option>
            ))}
          </Select>

          <Select
            name="status"
            label="statut"
            onChange={handleChange}
            value={invoice.status}
            error={errors.status}
          >
            <option value="DRAFT">Brouillon</option>
            <option value="SENT">Envoyée</option>
            <option value="PAID">Payée</option>
            <option value="CANCELLED">Annulée</option>
          </Select>

          <label htmlFor="paidAt">Payée le </label>
          <DatePicker
            utcOffset={0}
            locale="fr"
            timeFormat="HH:mm"
            dateFormat="yyyy-MM-dd HH:mm"
            /* selected={moment("2019-07-08").toDate()} */
            value={invoice.paidAt}
            error={errors.paidAt}
            name="paidAt"
            id="paidAt"
            onChange={(value) => setInvoice({ ...invoice, paidAt: value })}
          />

          <div className="form-group mt-3">
            <button type="submit" className="btn btn-success">
              Enregistrer
            </button>
            <Link to="/invoices" className="btn btn-link">
              Retour aux factures
            </Link>
          </div>
        </form>
      )}

      <div className="m-4 text-center">
        <Link
          to={"/invoiceRows/" + match.params.id + "/add"}
          className="btn btn-primary"
        >
          Créer une entrée
        </Link>
        &nbsp;
      </div>
      {rows.length > 0 && (
        <div>
          <h3 className="mt-5">Détails de la facture</h3>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantité</th>
                <th>Coût unitaire</th>
                <th className="text-center">Sous-total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.description}</td>
                  <td>{row.quantity}</td>
                  <td>{row.unitPrice} €</td>
                  <td className="text-center">{row.amount} €</td>
                  <td>
                    <Link
                      to={"/invoice_rows/" + row.id}
                      className="btn btn-sm btn-primary"
                    >
                      Editer
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(row.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default InvoicePage;
