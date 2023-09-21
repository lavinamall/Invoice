import React from 'react'

export const Header = ({ CompanyName }) => {
    return (
        <header className='bg-light d-flex align-content-center justify-content-between p-2 rounded'>
            <h1 className='fw-bolder text-bg-warning px-2 text-light rounded' style={{ fontFamily: 'cursive' }}>
                I n v o i c e r
            </h1>

            <h4 className='text-primary my-auto'>{CompanyName}</h4>

        </header>
    )
}
