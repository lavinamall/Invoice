import React from 'react'

export const Footer = () => {
    return (
        <>
            <div className='p-1 m-auto bg-dark text-light align-content-center justify-content-around d-flex'>
                <h6>Developed by &nbsp;
                    <strong>
                        <a href="mailto:lavinamall94@gmail.com" className='text-warning'>
                            Lavina Mall
                        </a>
                    </strong>
                </h6>
                <h6>
                    <a href="mailto:lavinamall94@gmail.com" className='text-light text-decoration-none'>
                        lavinamall94@gmail.com
                    </a>
                </h6>
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
