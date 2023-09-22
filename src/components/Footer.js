import React from 'react'

export const Footer = () => {
    return (
        <>
            <div className='mt-3 rounded p-1 pt-2 m-auto bg-dark text-light align-content-center d-flex justify-content-between'>
                <h6>Developed by &nbsp;
                    <strong>
                        <a href="mailto:lavinamall94@gmail.com" className='text-warning'>
                            Lavina Mall
                        </a>
                    </strong>
                </h6>
                {/* <h6>
                        <a href="mailto:lavinamall94@gmail.com" className='text-light text-decoration-none'>
                            Email
                            lavinamall94@gmail.com
                        </a>
                    </h6> */}
                <span>
                    <a href='https://www.instagram.com/ms.lavina_' target='_blank' className='text-light'>
                        <i className='fa fa-instagram me-2'></i>
                    </a>
                    <a href='https://www.facebook.com/LAVINA.MALL/' target='_blank' className='text-light'>
                        <i className='fa fa-facebook me-2'></i>
                    </a>
                </span>
            </div>
        </>
    )
}
