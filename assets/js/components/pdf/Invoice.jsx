import React, { useEffect, useState } from "react";
import InvoicesAPI from "../../services/InvoicesAPI";
import {
  Page,
  View,
  Text,
  Document,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import logoPath from "../../../img/logo-nm.png";
import Roboto from "../../../../assets/fonts/Roboto/Roboto-Regular.ttf";
import RobotoItalic from "../../../../assets/fonts/Roboto/Roboto-Italic.ttf";
import RobotoBold from "../../../../assets/fonts/Roboto/Roboto-Bold.ttf";
import Moment from "moment";

/*
 * Implement tables
 * https://github.com/Chagall/react-pdf-table-example
 */

const Invoice = ({ id }) => {
  const [invoice, setInvoice] = useState({
    chrono: "",
    year: "",
    amount: "",
    customer: "",
    sentAt: "",
    user: "",
    invoiceRows: [],
  });

  const [rows, setRows] = useState([]);

  //recup de la facture
  const fetchInvoice = async (id) => {
    try {
      const { chrono, year, amount, customer, sentAt, user, invoiceRows } =
        await InvoicesAPI.find(id);
      setInvoice({ chrono, year, amount, customer, sentAt, user, invoiceRows });
    } catch (error) {
      console.log(error.response);
      //history.replace('/invoices');
    }
  };

  //DEPRECATED
  //recup des entrées de la facture
  const fetchInvoiceRows = async () => {
    try {
      const data = await InvoicesAPI.findAllRows(id);
      setRows(data);
      setLoading(false);

      //if (!invoice.customer) setInvoice({ ...invoice, customer: data[0].id });
    } catch (error) {
      console.log(error.response);
      // toast.error('Impossible de charger les détails de la facture.');
      // history.replace('/invoices');
    }
  };

  useEffect(() => {
    fetchInvoice(id);
  }, []);

  //DEPRECATED
  useEffect(() => {
    fetchInvoiceRows();
  }, []);

  const formatDate = (str) => Moment(str).format("DD/MM/YYYY");

  const createHeaderLogo = () => {
    return <Image style={Styles.image} src={logoPath} />;
  };

  const createClientAddress = () => {
    return (
      <View>
        <Text style={Styles.clientName}>{invoice.customer.company}</Text>
        {/* <Text style={Styles.clientAddress}>
          {invoice.customer.firstName} {invoice.customer.lastName}
        </Text> */}
        <Text style={Styles.clientAddress}>{invoice.customer.address1}</Text>
        <Text style={Styles.clientAddress}>{invoice.customer.address2}</Text>
        <Text style={Styles.clientAddress}>
          {invoice.customer.postcode} {invoice.customer.city}
        </Text>
        <Text style={Styles.clientAddress}>{invoice.customer.country}</Text>
      </View>
    );
  };

  const createSendDate = () => {
    return (
      <Text style={Styles.date}>
        {invoice.user.city}, le {formatDate(invoice.sentAt)}
      </Text>
    );
  };

  const createInvoiceNumber = () => {
    return (
      <Text style={Styles.invoiceNumber}>
        Facture - {invoice.year}
        {invoice.chrono}
      </Text>
    );
  };

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
          <Text style={tableCellHeaderStyle}>Montant HT</Text>
        </View>
      </View>
    );
  };

  const createTableRow = () => {
    return (
      <>
        {invoice.invoiceRows.map((row) => (
          <View style={tableRowStyle} key={row.id}>
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
        ))}
      </>
    );

    //DEPRECATED
    /*  {rows.map(row => <View style={tableRowStyle} key={row.id}>
        <View style={firstTableColStyle}>
          <Text style={firstTableCellStyle}>{row.description}</Text>
        </View>

        <View style={tableColStyle}>
          <Text style={tableCellStyle}>{row.unitPrice}</Text>
        </View>

        <View style={tableColStyle}>
          <Text style={tableCellStyle}>{row.quantity}</Text>
        </View>

        <View style={tableColStyle}>
          <Text style={tableCellStyle}>{row.amount}</Text>
        </View>
      </View>
        )}
      </>) */
  };

  const createTableFooter = () => {
    return (
      <View style={tableRowFooterStyle}>
        <View style={firstTableColFooterStyle}>
          <Text style={tableCellFooterTotalStyle}>TOTAL (NET) :</Text>
          <Text style={tableCellFooterTvaStyle}>
            TVA non applicable, art 293 B du CGI
          </Text>
        </View>

        <View style={tableColFooterStyle}>
          <Text style={tableCellFooterStyle}>{invoice.amount} €</Text>
        </View>
      </View>
    );
  };

  const createOwnerAccount = () => {
    return (
      <View style={accountInfoStyle}>
        <Text style={regularTxtStyle}>
          Facture à régler à réception. Paiement par chèque, ou virement
          bancaire sur le compte :
        </Text>
        <Text style={boldCenteredTxtStyle}>
          {invoice.user.firstName} {invoice.user.lastName}
        </Text>
        <Text style={boldCenteredTxtStyle}>{invoice.user.address1}</Text>
        <Text style={boldCenteredTxtStyle}>
          {invoice.user.postCode} {invoice.user.city}
        </Text>
        <Text style={boldCenteredTxtStyle}>{invoice.user.country}</Text>
        <Text style={boldCenteredTxtStyle}>
          RIB : 10278 01650 00020453202 25
        </Text>
        <Text style={boldCenteredTxtStyle}>
          IBAN : FR76 1027 8016 5000 0204 5320 225
        </Text>
        <Text style={boldCenteredTxtStyle}>BIC : {invoice.user.bic}</Text>
      </View>
    );
  };

  const createOwnerContact = () => {
    return (
      <View>
        <Text style={contactOwnerStyle}>
          {invoice.user.firstName} {invoice.user.lastName} - Développeur Web -{" "}
          {invoice.user.address1} - {invoice.user.postcode} {invoice.user.city}{" "}
          - {invoice.user.email} - tel :(+33)07 81 71 87 55
        </Text>
        <Text style={contactOwnerStyle}>
          {invoice.user.website} - SIRET: {invoice.user.siret}
        </Text>
      </View>
    );
  };

  const createPagination = () => {
    return (
      <Text
        style={Styles.pageNumber}
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
        fixed
      />
    );
  };

  // Create Document Component
  return (
    <Document>
      <Page style={Styles.body} size="A4" orientation="Portrait">
        <View style="">
          {createHeaderLogo()}
          {createClientAddress()}
          {createSendDate()}
          {createInvoiceNumber()}
        </View>

        <View style={tableStyle}>
          {createTableHeader()}
          {createTableRow()}
          {createTableFooter()}
        </View>

        <View>{createOwnerAccount()}</View>

        <View style={footerStyle} fixed>
          {createOwnerContact()}
          {createPagination()}
        </View>
      </Page>
    </Document>
  );
}; // const Invoice

/**
 *
 *
 *  CUSTOM FONTS
 *
 */
Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

Font.register({
  family: "Roboto",
  format: "truetype",
  fonts: [
    { src: Roboto },
    { src: RobotoItalic, fontStyle: "italic" },
    { src: RobotoBold, fontWeight: "bold" },
  ],
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
    fontSize: "10px",
    fontFamily: "Roboto",
  },

  header: {
    textAlign: "center",
    color: "#999666",
  },

  title: {
    margin: 15,
    textAlign: "center",
    fontSize: "20px",
  },

  image: {
    width: "55px",
    height: "auto",
  },

  clientName: {
    textAlign: "right",
    fontWeight: "bold",
  },

  clientAddress: {
    textAlign: "right",
  },

  date: {
    marginTop: 20,
    fontStyle: "italic",
  },

  invoiceNumber: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: "12px",
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: "#FF5335",
  },

  pageNumber: {
    position: "absolute",
    bottom: 40,
    left: "50%",
    fontSize: "7px",
    color: "#999666",
  },

  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const tableStyle = {
  display: "table",
  width: "auto",
};

const tableRowStyle = {
  flexDirection: "row",
};

const firstTableColHeaderStyle = {
  width: "70%",
  borderStyle: "solid",
  borderColor: "#999",
  borderBottomColor: "#999",
  borderWidth: 1,
  backgroundColor: "#e4e4e4",
};

const tableColHeaderStyle = {
  width: "10%",
  borderStyle: "solid",
  borderColor: "#999",
  borderBottomColor: "#999",
  borderWidth: 1,
  borderLeftWidth: 0,
  backgroundColor: "#e4e4e4",
};

const firstTableColStyle = {
  width: "70%",
  borderStyle: "solid",
  borderColor: "#999",
  borderWidth: 1,
  borderTopWidth: 0,
};

const tableColStyle = {
  width: "10%",
  borderStyle: "solid",
  borderColor: "#999",
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopWidth: 0,
};

const tableCellHeaderStyle = {
  textAlign: "center",
  margin: 4,
  fontSize: 8,
  fontStyle: "italic",
};

const firstTableCellStyle = {
  textAlign: "left",
  margin: 5,
  fontSize: 8,
};

const tableCellStyle = {
  textAlign: "center",
  margin: 5,
  fontSize: 8,
};

// FOOTER

//Global container
const tableRowFooterStyle = {
  flexDirection: "row",
  marginTop: 20,
};

//Col with title container
const firstTableColFooterStyle = {
  width: "88%",
  borderStyle: "solid",
  borderColor: "#999",
  borderBottomColor: "#999",
  borderWidth: 0,
  borderTopWidth: 1,
  backgroundColor: "#e4e4e4",
};

// Total label cell
const tableCellFooterTotalStyle = {
  textAlign: "right",
  margin: 5,
  marginBottom: 0,
  fontSize: 10,
  fontWeight: "bold",
};

// TVA label cell
const tableCellFooterTvaStyle = {
  textAlign: "right",
  margin: 5,
  marginTop: 0,
  fontSize: 8,
};

// Price container
const tableColFooterStyle = {
  width: "12%",
  borderStyle: "solid",
  borderColor: "#999",
  borderBottomColor: "#999",
  borderWidth: 0,
  borderTopWidth: 1,
  backgroundColor: "#e4e4e4",
};

// Price Cell
const tableCellFooterStyle = {
  textAlign: "center",
  marginTop: 5,
  fontSize: 12,
  fontWeight: "bold",
};

/*
 *
 * ACCOUNT INFOS
 *
 */
const accountInfoStyle = {
  marginTop: 40,
  textAlign: "center",
};

const regularTxtStyle = {
  fontSize: 8,
  marginBottom: 10,
};

const boldCenteredTxtStyle = {
  fontSize: 8,
  fontWeight: "bold",
};

/*
 *
 * FOOTER
 *
 */
const footerStyle = {
  position: "absolute",
  bottom: 30,
  left: 40,
};

const contactOwnerStyle = {
  textAlign: "center",
  fontSize: 8,
  color: "#999",
};

export default Invoice;
