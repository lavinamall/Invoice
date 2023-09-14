import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './InvoiceDetails.css'; // Import your custom CSS file

function InvoiceDetails({ invoiceData, companyDetails }) {

    function formatCurrency(amount) {
        const formatter = new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        });
        return formatter.format(amount);
    }


    return (
        <div className='container invoice-details my-3 mx-0'>
            <div class="row text-center">
                <h2>{companyDetails.CompanyName}</h2>
                <small>
                    <address style={{ whiteSpace: 'pre-line' }}>
                        {companyDetails.CompanyAddress}
                    </address>
                </small>
                <small>Tax Invoice</small>
            </div>

            <hr />

            <div class="row">
                <div className="col">
                    <span><strong>Invoice Number:</strong> {invoiceData.InvoiceNumber}</span> <br />
                    <span><strong>Invoice Date:</strong> {invoiceData.InvoiceDate}</span>
                </div>

                <div className="col">
                    <strong>Billing To</strong><br />
                    <span><strong> {invoiceData.ClientName}</strong></span><br />
                    <span><strong>Address:</strong> {invoiceData.ClientAddress}</span><br />
                    <span><strong>Phone:</strong> {invoiceData.ClientPhone}</span><br />
                </div>
            </div>

            <hr />

            <table className="table table-bordered table-responsive">
                {/* <table className="table table-bordered table-hover fs-sm"> */}
                <thead>
                    <tr>
                        <th scope="col">Sr No</th>
                        <th scope="col">Product Description</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Tax</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceData.ItemDescriptions.map((item, index) => (
                        <tr key={index}>
                            <th scope="row" className='text-center'>{index + 1}</th>
                            <td>{item.Description}</td>
                            <td>{item.Quantity}</td>
                            <td>{formatCurrency(item.UnitPrice)}</td>
                            <td>{formatCurrency(item.Amount)}</td>
                            <td>
                                <ul className="list-unstyled">
                                    <li><strong>SGST:</strong> {item.SGST}%</li>
                                    <li><strong>CGST:</strong> {item.CGST}%</li>
                                    <li><strong>IGST:</strong> {item.IGST}%</li>
                                    <li><strong>Tax Amount:</strong> {formatCurrency(item.TaxAmount)}</li>
                                </ul>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-3 bg-light offset-md-9 fs-4">
                <p><strong>Total Amount:</strong> {formatCurrency(invoiceData.TotalAmount)}</p>
            </div>
        </div>
    )
}

export default InvoiceDetails