import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InvoiceForm from './components/InvoiceForm';
import InvoiceDetails from './components/InvoiceDetails';

function App() {
  const [showInvoice, setShowInvoice] = useState(false);

  const [invoiceData, setInvoiceData] = useState();

  const CompanyName = 'The Heritage Divine';
  const CompanyAddress = 'D 702 Marwar Appartments Sector 14, Chopasani Housing Board \n Jodhpur, Rajasthan 342008 \nGSTIN:08AATFT8421D1ZV';

  const handleFormSubmit = (formData) => {
    setInvoiceData(formData);
    setShowInvoice(true);
  };

  const handleGoBack = () => {
    setShowInvoice(false);
  };

  return (
    <div className='container'>
      {showInvoice ? (
        <div>
          <InvoiceDetails invoiceData={invoiceData} CompanyName={CompanyName} CompanyAddress={CompanyAddress} />
        </div>
      ) : (
        <InvoiceForm onFormSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

export default App;
