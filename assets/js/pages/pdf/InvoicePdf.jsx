import React, {useState, useEffect} from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Invoice from '../../components/pdf/Invoice';
import InvoicesAPI from '../../services/InvoicesAPI';

const invoicePdf = ({history, match}) => {
    
    const id = match.params.id;

    const [invoice, setInvoice] = useState({
        chrono : '',
        amount : ''
    }
        
    );

    //recup d'une facture
    const fetchInvoice = async (id) => {
        try {
            const { chrono, amount } = await InvoicesAPI.find(id);
            setInvoice({ chrono, amount });
        } catch (error) {
            console.log(error.response);
            //history.replace('/invoices');
        }
    }

     useEffect(() => {
        fetchInvoice(id);
    }, [id]); 

    return (
        <div>
            <h2 className="mb-3">Facture n° : {invoice.chrono}</h2>
        <PDFViewer width='1024px' height='768px'>
                <Invoice id={id} customer=''/>
        </PDFViewer>
        </div>
    );
}
 
export default invoicePdf;