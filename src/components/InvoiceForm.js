import React, { useState } from 'react';

function InvoiceForm({ onFormSubmit }) {
    const [invoiceData, setInvoiceData] = useState({
        InvoiceNumber: '',
        InvoiceDate: getCurrentDate(),
        ClientName: '',
        ClientAddress: '',
        ClientPhone: '',
        ItemDescriptions: [
            {
                Description: '',
                Quantity: 0,
                Amount: 0,
                UnitPrice: 0,
                TaxAmount: 0,
                SGST: 0,
                CGST: 0,
                IGST: 0,
            },
        ],
        TotalAmount: 0,
    });

    // const [invoiceData, setInvoiceData] = useState({
    //     InvoiceNumber: 'INV-1',
    //     InvoiceDate: getCurrentDate(),
    //     ClientName: 'Lavina Mall',
    //     ClientAddress: 'Mahima Kunj, 4th Lane Shakti Nagar Paota C Road, Jodhpur, Rajasthan',
    //     ClientPhone: '+91-9769883785',
    //     ItemDescriptions: [
    //         {
    //             Description: 'Product',
    //             Quantity: 10,
    //             Amount: 0,
    //             UnitPrice: 100,
    //             TaxAmount: 0,
    //             SGST: 9,
    //             CGST: 9,
    //             IGST: 0,
    //         },
    //     ],
    //     TotalAmount: 0,
    // });

    function getCurrentDate() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString(undefined, options);
    }

    const handleInputChange = (event, itemIndex) => {
        const { name, value } = event.target;
        const updatedInvoiceData = { ...invoiceData };

        if (itemIndex !== undefined) {
            updatedInvoiceData.ItemDescriptions[itemIndex][name] = value;

            // Calculate the Amount for the current item
            if (name === 'Quantity' || name === 'UnitPrice') {
                const quantity = parseFloat(updatedInvoiceData.ItemDescriptions[itemIndex].Quantity);
                const unitPrice = parseFloat(updatedInvoiceData.ItemDescriptions[itemIndex].UnitPrice);
                const amount = quantity * unitPrice;
                updatedInvoiceData.ItemDescriptions[itemIndex].Amount = amount;
            }

            // Calculate IGST
            const sgst = parseFloat(updatedInvoiceData.ItemDescriptions[itemIndex].SGST);
            const cgst = parseFloat(updatedInvoiceData.ItemDescriptions[itemIndex].CGST);
            const igst = sgst + cgst;
            updatedInvoiceData.ItemDescriptions[itemIndex].IGST = igst;

            // Calculate TaxAmount
            const amount = parseFloat(updatedInvoiceData.ItemDescriptions[itemIndex].Amount);
            const taxAmount = (igst / 100) * amount;
            updatedInvoiceData.ItemDescriptions[itemIndex].TaxAmount = taxAmount;
        } else {
            updatedInvoiceData[name] = value;
        }

        // Calculate the TotalAmount
        const totalAmount = updatedInvoiceData.ItemDescriptions.reduce((total, item) => {
            return total + parseFloat(item.Amount) + parseFloat(item.TaxAmount);
        }, 0);

        updatedInvoiceData.TotalAmount = totalAmount.toFixed(2); // Limit totalAmount to 2 decimal places

        setInvoiceData(updatedInvoiceData);
    };

    const addItem = () => {
        const updatedInvoiceData = { ...invoiceData };
        updatedInvoiceData.ItemDescriptions.push({
            Description: '',
            Amount: 0,
            UnitPrice: 0,
            TaxAmount: 0,
            SGST: 0,
            CGST: 0,
            IGST: 0,
        });
        setInvoiceData(updatedInvoiceData);
    };

    const removeItem = (itemIndex) => {
        const updatedInvoiceData = { ...invoiceData };
        updatedInvoiceData.ItemDescriptions.splice(itemIndex, 1);
        setInvoiceData(updatedInvoiceData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onFormSubmit(invoiceData);
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-lg-4 border rounded'>
                        <strong className='text-center m-1'>Client Details</strong>
                        <hr />
                        <div className="col mb-3">
                            <label htmlFor="InvoiceNumber" className="form-label">
                                Invoice Number:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="InvoiceNumber"
                                name="InvoiceNumber"
                                value={invoiceData.InvoiceNumber}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="col mb-3">
                            <label htmlFor="InvoiceDate" className="form-label">
                                Invoice Date:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="InvoiceDate"
                                name="InvoiceDate"
                                value={invoiceData.InvoiceDate}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="col mb-3">
                            <label htmlFor="ClientName" className="form-label">
                                Client Name:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="ClientName"
                                name="ClientName"
                                value={invoiceData.ClientName}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="col mb-3">
                            <label htmlFor="ClientPhone" className="form-label">
                                Client Phone:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="ClientPhone"
                                name="ClientPhone"
                                value={invoiceData.ClientPhone}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ClientAddress" className="form-label">
                                Client Address:
                            </label>
                            <textarea
                                rows={5}
                                className="form-control"
                                id="ClientAddress"
                                name="ClientAddress"
                                value={invoiceData.ClientAddress}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    </div>

                    <div className='col-lg-6 border rounded ms-md-4'>
                        <strong>Items</strong>
                        {invoiceData.ItemDescriptions.map((item, index) => (
                            <div key={index}>
                                <div className="mb-3">
                                    <label htmlFor={`ItemDescription-${index}`} className="form-label">
                                        Item Description:
                                    </label>
                                    <textarea
                                        rows={5}
                                        className="form-control"
                                        id={`ItemDescription-${index}`}
                                        name="Description"
                                        value={item.Description}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                </div>
                                <div className='row'>
                                    <div className="col-4 mb-3">
                                        <label htmlFor={`Quantity-${index}`} className="form-label">
                                            Quantity:
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id={`Quantity-${index}`}
                                            name="Quantity"
                                            value={item.Quantity}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    </div>
                                    <div className="col-4 mb-3">
                                        <label htmlFor={`UnitPrice-${index}`} className="form-label">
                                            Unit Price:
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id={`UnitPrice-${index}`}
                                            name="UnitPrice"
                                            value={item.UnitPrice}
                                            onChange={(e) => handleInputChange(e, index)}
                                            onWheel={(e) => e.preventDefault()}
                                        />
                                    </div>
                                    <div className="col-4 mb-3">
                                        <label htmlFor={`Amount-${index}`} className="form-label">
                                            Amount:
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id={`Amount-${index}`}
                                            name="Amount"
                                            value={item.Amount}
                                            onChange={(e) => handleInputChange(e, index)}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-3 mb-3">
                                        <label htmlFor={`SGST-${index}`} className="form-label">
                                            SGST (%):
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id={`SGST-${index}`}
                                            name="SGST"
                                            value={item.SGST}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    </div>
                                    <div className="col-3 mb-3">
                                        <label htmlFor={`CGST-${index}`} className="form-label">
                                            CGST (%):
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id={`CGST-${index}`}
                                            name="CGST"
                                            value={item.CGST}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    </div>
                                    <div className="col-3 mb-3">
                                        <label htmlFor={`IGST-${index}`} className="form-label">
                                            IGST (%):
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id={`IGST-${index}`}
                                            name="IGST"
                                            value={item.IGST}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    </div>
                                    <div className="col-3 mb-3">
                                        <label htmlFor={`TaxAmount-${index}`} className="form-label">
                                            Tax Amount:
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id={`TaxAmount-${index}`}
                                            name="TaxAmount"
                                            value={item.TaxAmount}
                                            onChange={(e) => handleInputChange(e, index)}
                                        />
                                    </div>
                                </div>
                                {index > 0 && (
                                    <button type="button" className="btn btn-danger" onClick={() => removeItem(index)}>
                                        Remove Item
                                    </button>
                                )}
                                <hr />
                            </div>
                        ))}
                        <button type="button" className="btn btn-primary" onClick={addItem}>
                            Add Item
                        </button>
                        <button type="submit" className="btn btn-primary ms-md-3">
                            Submit
                        </button>

                        <div className="offset-md-7 mb-3">
                            <label htmlFor="TotalAmount" className="form-label">
                                <strong>Total Amount</strong>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="TotalAmount"
                                name="TotalAmount"
                                value={invoiceData.TotalAmount}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
}

export default InvoiceForm;
