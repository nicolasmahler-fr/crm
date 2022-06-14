import React, { useEffect, useState } from 'react';
import EstimatesAPI from '../../services/EstimatesAPI';
import { Page, View, Text, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import logoPath from '../../../img/logo-nm.png';
import Roboto from "../../../../assets/fonts/Roboto/Roboto-Regular.ttf";
import RobotoItalic from "../../../../assets/fonts/Roboto/Roboto-Italic.ttf";
import RobotoBold from "../../../../assets/fonts/Roboto/Roboto-Bold.ttf";
import Moment from 'moment';

/*
* Implement tables
* https://github.com/Chagall/react-pdf-table-example
*/

const Estimate = ({ id }) => {

    const [estimate, setEstimate] = useState({
      chrono: '',
      year : '',
      amount: '',
      customer: '',
      sentAt: '',
      user: '',
      object: '',
      definition: '',
      estimateRows: []
    });

  const [rows, setRows] = useState([]);
  
    //recup du devis
    const fetchEstimate = async (id) => {
        try {
            const {chrono, year, amount, customer, sentAt, user, estimateRows, object, definition} = await EstimatesAPI.find(id);
          setEstimate({chrono, year, amount, customer, sentAt, user, estimateRows, object, definition});
        } catch (error) {
            console.log(error.response);
        }
    }
    
  //DEPRECATED
    //recup des entrées de la facture
   const fetchestimateRows = async () => {
        try {
            const data = await EstimatesAPI.findAllRows(id);
            setRows(data);
            setLoading(false);

        } catch (error) {
            console.log(error.response)
        }
    }


     useEffect(() => {
       fetchEstimate(id);

     }, []);
    
     //DEPRECATED
    useEffect(() => {
        fetchestimateRows();
    }, []);
 
  const formatDate = (str) => Moment(str).format('DD/MM/YYYY');
  

  const createHeaderLogo = () => {
    return (
      <Image
        style={Styles.image}
        src={logoPath}
      />
    )
  }

  const createClientAddress = () => {
    return (
      <View>
        <Text style={Styles.clientName}>
        {estimate.customer.company}
        </Text>
        {/* <Text style={Styles.clientAddress}>
          {estimate.customer.firstName} {estimate.customer.lastName}
        </Text> */}
        <Text style={Styles.clientAddress}>
          {estimate.customer.address1}
        </Text>
        <Text style={Styles.clientAddress}>
          {estimate.customer.address2}
        </Text>
        <Text style={Styles.clientAddress}>
          {estimate.customer.postcode} {estimate.customer.city}
        </Text>
        <Text style={Styles.clientAddress}>
          {estimate.customer.country}
        </Text>
      </View>
    )
  }

  const createUserAddress = () => {
    return (
      <View>
        <Text style={Styles.userName}>
          {estimate.user.firstName} {estimate.user.lastName}
        </Text>
        <Text style={Styles.userAddress}>
          Développeur Web
        </Text>
        <Text style={Styles.userAddress}>
         Tel : 07 81 71 87 55 - {estimate.user.email}
        </Text>
      </View>
    )
  }

  const createSendDate = () => {
    return (
      <Text style={Styles.date}>
        {estimate.user.city}, le {formatDate(estimate.sentAt)}
      </Text>
    )
  }

  const createEstimateNumber = () => {
    return (
      <View>
      <Text style={Styles.estimateNumber}>
        Devis - {estimate.year}{estimate.chrono}
      </Text>
      <Text style={Styles.estimateObject}>
      {estimate.object}
    </Text>
    </View>
    )
  }

  const createEstimateDef = () => {
    return (
      <View>
      <Text style={Styles.estimateDefTitle}>
        Définition de l'offre
      </Text>
      <Text style={Styles.estimateDef}>
      {estimate.definition}
    </Text>
    </View>
    )
  }

  const createTableHeader = () => {
    return (
      <View style={tableRowStyle} fixed>

        <View style={firstTableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}></Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Prix</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Qté</Text>
        </View>

        <View style={tableColHeaderStyle}>
          <Text style={tableCellHeaderStyle}>Total</Text>
        </View>

      </View>
    );
  };

  const createTableRow = () => {

    return (<>

      {estimate.estimateRows.map(row => <View style={tableRowStyle} key={row.id}>
        <View style={firstTableColStyle}>
          <Text style={firstTableCellStyle}>{row.description}</Text>
        </View>

        <View style={tableColStyle}>
          <Text style={tableCellStyle}>{row.unitPrice}€</Text>
        </View>

        <View style={tableColStyle}>
          <Text style={tableCellStyle}>{row.quantity}</Text>
        </View>

        <View style={tableColStyle}>
          <Text style={tableCellStyle}>{row.amount}€</Text>
        </View>
      </View>
        )}
    </>)

     
  };

  const createTableFooter = () => {
    return (
      <View style={tableRowFooterStyle}>

        <View style={firstTableColFooterStyle}>
          <Text style={tableCellFooterTotalStyle}>
            TOTAL (NET) :
          </Text>
          <Text style={tableCellFooterTvaStyle}>
            TVA non applicable, art 293 B du CGI
          </Text>
        </View>

        <View style={tableColFooterStyle}>
          <Text style={tableCellFooterStyle}>{estimate.amount} €</Text>
        </View>

      </View>
    );
  };

  const signature = () =>{
    return(
      <View style={signatureStyle}>
        <Text style={signatureTitre}>
          Signature précédée de la mention "bon pour accord"
        </Text>
        <Text style={signatureBloc}>
          &nbsp;
        </Text>
      </View>
    );
  };

  const cgv = () => {
    return (
      <View style={cgvStyle}>
        <Text style={cgvStyleTxt} >
          Ce devis est valable 1 mois à compter de la date d’émission. La facture correspondante sera payable sous 30 jours.
        </Text>
        <Text style={cgvStyleTxt} >
        Le présent devis prévoit l’intégralité des prestations que le prestataire s’engage à réaliser pour le Client.
        </Text>
        <Text style={cgvStyleTxt} >
        Toute prestation supplémentaire demandée par le Client donnera lieu à l’émission d’un nouveau devis ou avenant. Le présent devis est valable
        durant 30 jours à compter de sa date d’émission. Une fois validé par le Client, le présent devis a valeur de contrat. Dans l’hypothèse d’une rupture
        de contrat à l’initiative du Client, ce dernier s’engage à régler les prestations
        réalisées.
        </Text>
        <Text style={cgvStyleTxt} >
        En conformité de l’article L 441-6 du Code de commerce : La facture correspondante sera payable sous 30 jours.
        </Text>
      </View>
    );
  };

  const createOwnerContact = () => {
    return (
      <View>
        <Text style={contactOwnerStyle}>
          {estimate.user.firstName} {estimate.user.lastName} - Développeur Web - {estimate.user.address1} - {estimate.user.postcode} {estimate.user.city} - {estimate.user.email} - tel :(+33)07 81 71 87 55
        </Text>
        <Text style={contactOwnerStyle}>
          {estimate.user.website} - SIRET: {estimate.user.siret}
        </Text>
      </View>
    )
  }

  const createPagination = () => {
    return (
      <Text style={Styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
      )} fixed />
    )
  }

 
   // Create Document Component
  return (
    <Document>

      <Page
        style={Styles.body}
        size='A4'
        orientation='Portrait'
      >
         
        <View style=''>
          {createHeaderLogo()}
          {createClientAddress()}
          {createUserAddress()}
          {createSendDate()}
          {createEstimateNumber()}
          {createEstimateDef()}
        </View>

        <View style={tableStyle}>
          {createTableHeader()}
          {createTableRow()}
          {createTableFooter()}
        </View>

        <View>
          {signature()}
        </View>

        <View>
          {cgv()}
        </View>

        <View style={footerStyle} fixed>
          {createOwnerContact()}
          {createPagination()}
        </View>
                
      </Page>

    </Document>
  )

}; // const Invoice


/**
 * 
 * 
 *  CUSTOM FONTS
 * 
 */
Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

Font.register({
  family: 'Roboto',
  format: "truetype",
  fonts: [
    { src: Roboto },
    { src: RobotoItalic, fontStyle: 'italic' },
    { src: RobotoBold, fontWeight: 'bold' },
  ]
});


/**
 * 
 * 
 * CSS
 * 
 */
const Styles = StyleSheet.create({

  body: {
    paddingTop: 40,
    paddingHorizontal: 40,
    paddingBottom: 56,
    fontSize: '10px',
    fontFamily: 'Roboto'
  },

  header: {
    textAlign: 'center',
    color: '#999666',
  },

  title: {
    margin: 15,
    textAlign: 'center',
    fontSize: '20px'
  },

  image: {
    width: '55px',
    height: 'auto'
  },

  clientName: {
    textAlign: 'right',
    fontWeight: 'bold'
  },

  clientAddress: {
    textAlign: 'right'
  },

  userName: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '8px'
  },

  userAddress: {
    textAlign: 'left',
    fontSize: '8px'
  },

  date: {
    marginTop: 20,
    fontSize: '8px',
    fontStyle: 'italic'
  },

  estimateNumber: {
    marginTop: 20,
    fontSize: '12px',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#FF5335'
  },

  estimateObject: {
    marginBottom: 20,
    fontSize: '10px',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#000000'
  },

  estimateDefTitle: {
    fontSize: '8px',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#333333'
  },

  estimateDef: {
    marginBottom: 20,
    fontSize: '8px',
    fontFamily: 'Roboto',
    color: '#333333'
  },

  pageNumber: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    fontSize: '7px',
    color: '#999666'
  },

  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const tableStyle = {
  display: "table",
  width: "auto"
};

const tableRowStyle = {
  flexDirection: "row"
};

const firstTableColHeaderStyle = {
  width: "70%",
  borderStyle: "solid",
  borderColor: "#999",
  borderBottomColor: "#999",
  borderWidth: 1,
  backgroundColor: "#e4e4e4"
};

const tableColHeaderStyle = {
  width: "10%",
  borderStyle: "solid",
  borderColor: "#999",
  borderBottomColor: "#999",
  borderWidth: 1,
  borderLeftWidth: 0,
  backgroundColor: "#e4e4e4"
};

const firstTableColStyle = {
  width: "70%",
  borderStyle: "solid",
  borderColor: "#999",
  borderWidth: 1,
  borderTopWidth: 0
};

const tableColStyle = {
  width: "10%",
  borderStyle: "solid",
  borderColor: "#999",
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopWidth: 0
};

const tableCellHeaderStyle = {
  textAlign: "center",
  margin: 4,
  fontSize: 8,
  fontStyle: 'italic'
};

const firstTableCellStyle = {
  textAlign: "left",
  margin: 5,
  fontSize: 8
};

const tableCellStyle = {
  textAlign: "center",
  margin: 5,
  fontSize: 8
};


// FOOTER

//Global container
const tableRowFooterStyle = {
  flexDirection: "row",
  marginTop: 20
}

//Col with title container
const firstTableColFooterStyle = {
  width: "88%",
  borderStyle: "solid",
  borderColor: "#999",
  borderBottomColor: "#999",
  borderWidth: 0,
  borderTopWidth: 1,
  backgroundColor: '#e4e4e4'
}

// Total label cell
const tableCellFooterTotalStyle = {
  textAlign: "right",
  margin: 5,
  marginBottom: 0,
  fontSize: 10,
  fontWeight: 'bold'
}

// TVA label cell
const tableCellFooterTvaStyle = {
  textAlign: "right",
  margin: 5,
  marginTop: 0,
  fontSize: 8
}

// Price container
const tableColFooterStyle = {
  width: "12%",
  borderStyle: "solid",
  borderColor: "#999",
  borderBottomColor: "#999",
  borderWidth: 0,
  borderTopWidth: 1,
  backgroundColor: '#e4e4e4'
}

// Price Cell
const tableCellFooterStyle = {
  textAlign: "center",
  marginTop: 5,
  fontSize: 12,
  fontWeight: 'bold'
}

/*
*
* ACCOUNT INFOS
*
*/
const accountInfoStyle = {
  marginTop: 40,
  textAlign: 'center'
}

const regularTxtStyle = {
  fontSize: 8,
  marginBottom: 10
}


const boldCenteredTxtStyle = {
  fontSize: 8,
  fontWeight: 'bold'
}

/*
*
* Signature
*
*/
const signatureStyle = {
  marginTop: 40,
  textAlign: 'left'
}

const signatureTitre = {
  fontSize: 8,
  marginBottom: 5,
  color: '#000000',
  fontStyle: 'italic'
}

const signatureBloc = {
  width: "40%",
  borderStyle: "none",
  borderColor: "transparent",
  borderBottomColor: "transparent",
  borderWidth: 0,
  borderTopWidth: 0,
  backgroundColor: '#e4e4e4',
  paddingTop: 60
}

/*
*
* CGV
*
*/
const cgvStyle = {
  marginTop: 40,
  textAlign: 'left'
}

const cgvStyleTxt = {
  fontSize: 7,
  marginBottom: 5,
  color: '#666666'
}

/*
*
* FOOTER
*
*/
const footerStyle = {
  position: 'absolute',
  bottom: 30,
  left: 40
}

const contactOwnerStyle = {
  textAlign: 'center',
  fontSize: 8,
  color: '#999'
}



export default Estimate
