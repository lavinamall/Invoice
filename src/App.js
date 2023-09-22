import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InvoiceForm from './components/InvoiceForm';
import InvoiceDetails from './components/InvoiceDetails';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
  const [showInvoice, setShowInvoice] = useState(false);

  const [invoiceData, setInvoiceData] = useState();

  const CompanyName = 'The Heritage Divine';
  const CompanyAddress = 'D 702 Marwar Appartments Sector 14, Chopasani Housing Board \n Jodhpur, Rajasthan 342008 \nGSTIN:08AATFT8421D1ZV';

  const handleFormSubmit = (formData) => {
    setInvoiceData(formData);
    setShowInvoice(true);
  };

  return (
    <div className='container-fluid'>
      {showInvoice ? (
        <div className='container-fluid'>
          <InvoiceDetails invoiceData={invoiceData} CompanyName={CompanyName} CompanyAddress={CompanyAddress} />
        </div>
      ) : (
        <>
          <Header CompanyName={CompanyName} />
          <InvoiceForm onFormSubmit={handleFormSubmit} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
