import React, {useState, useEffect} from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import Estimate from '../../components/pdf/Estimate';
import EstimatesAPI from '../../services/EstimatesAPI';

const estimatePdf = ({history, match}) => {
    
    const id = match.params.id;

    const [estimate, setEstimate] = useState({
        chrono : '',
        amount : '',
        year: '',
    }
        
    );

    //recup d'un devis
    const fetchEstimate = async (id) => {
        try {
            const { chrono, amount, year } = await EstimatesAPI.find(id);
            setEstimate({ chrono, amount, year });
        } catch (error) {
            console.log(error.response);
        }
    }

     useEffect(() => {
        fetchEstimate(id);
    }, [id]); 

    return (
        <div>
            <h2 className="mb-3">Devis n° : {estimate.year}{estimate.chrono}</h2>
        <PDFViewer width='1024px' height='768px'>
                <Estimate id={id} customer=''/>
        </PDFViewer>
        </div>
    );
}
 
export default estimatePdf;