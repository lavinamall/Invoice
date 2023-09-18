import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './InvoiceDetails.css'; // Import your custom CSS file

function InvoiceDetails({ invoiceData, CompanyName, CompanyAddress }) {

    function handlePrint() {
        window.print(); // Trigger the browser's print dialog
    }

    document.addEventListener("contextmenu", function (e) {
        e.preventDefault(); // Prevent the default right-click context menu
    });

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
            <div className="row text-center">
                <h2>{CompanyName}</h2>
                <small>
                    <address style={{ whiteSpace: 'pre-line', fontSize: '11px' }}>
                        {CompanyAddress}
                    </address>
                </small>

                <table class='table table-bordered table-responsive table-sm' style={{ fontSize: '12px' }}>
                    <thead>
                        <tr>
                            <th>Account Holder</th>
                            <th>Account Number</th>
                            <th>Bank Name</th>
                            <th>IFSC Code</th>
                            <th>Branch</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>The Heritage Divine</td>
                            <td>259929939374</td>
                            <td>IndusInd Bank</td>
                            <td>INDB0000453</td>
                            <td>Boronada, Jodhpur</td>
                        </tr>
                    </tbody>
                </table>

                <hr className='mb-1' />
            </div>

            <div className="row" style={{ fontSize: '12px' }}>
                <div className="col">
                    <span><strong>Invoice Number:</strong> {invoiceData.InvoiceNumber}</span> <br />
                    <span><strong>Invoice Date:</strong> {invoiceData.InvoiceDate}</span><br /><br />
                </div>

                <div className="col">
                    <strong>Billing To</strong><br />
                    <span><strong> {invoiceData.ClientName}</strong></span><br />
                    <span><strong>Address:</strong> {invoiceData.ClientAddress}</span><br />
                    <span><strong>Phone:</strong> {invoiceData.ClientPhone}</span><br />
                </div>

                <div className='col'>
                    <button className='btn btn-primary d-print-none rounded' onClick={handlePrint}>Print</button>
                </div>
            </div>

            <hr />

            <table className="table table-bordered table-sm table-responsive text-center" style={{ fontSize: '11px' }}>
                <thead>
                    <tr>
                        <th rowSpan={2} scope="col">Sr. No</th>
                        <th rowSpan={2} scope="col">Product</th>
                        <th rowSpan={2} scope="col">Quantity</th>
                        <th rowSpan={2} scope="col">Unit Price</th>
                        <th rowSpan={2} scope="col">Amount</th>
                        <th className='table-fit text-center' scope="col" colSpan={3}>Tax (%)</th>
                        <th rowSpan={2} scope="col">Tax Amount</th>
                        <th rowSpan={2} scope="col">Total Amount</th>

                    </tr>
                    <tr>
                        <th className='text-center'>CGST</th>
                        <th className='text-center'>GGST</th>
                        <th className='text-center'>IGST</th>
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
                            <td className='text-center'>{item.SGST}%</td>
                            <td className='text-center'>{item.CGST}%</td>
                            <td className='text-center'>{item.IGST}%</td>
                            <td>{formatCurrency(item.TaxAmount)}</td>
                            <td>{formatCurrency(item.ItemTotalAmount)}</td>

                        </tr>
                    ))}
                    <tr>
                        <td colSpan={9}></td>
                        <td colSpan={1} className='text-dark'>
                            <strong>Total Amount: {' ' + formatCurrency(invoiceData.TotalAmount)}</strong>
                        </td>
                    </tr>
                </tbody>
            </table>
            {/* <div className="mt-3 bg-light offset-md-9 fs-6 read-only" style={{ fontSize: '12px' }}>
                <p><strong>Total Amount:</strong> {formatCurrency(invoiceData.TotalAmount)}</p>
            </div> */}
        </div>
    )
}

export default InvoiceDetails