import { Route } from 'react-router-dom';
import React, { Suspense, lazy, Fragment } from 'react';

import {
    ToastContainer,
} from 'react-toastify';
import { CircularProgress } from '@material-ui/core';
import logo from '../../assets/utils/images/logo-inverse.png'
const RR = lazy(() => import('../../Pages/RR'));

const AppMain = () => {

    return (
        <Fragment>



            {/* Noticias */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <img src={logo} alt='RADIO RIBERALTA' className='m-3' />
                        <CircularProgress size='10rem' variant='indeterminate' color='secondary' />
                    </div>
                </div>
            }>


                <Route path="/" component={RR} />
            </Suspense>

            <ToastContainer />
        </Fragment>
    )
};

export default AppMain;