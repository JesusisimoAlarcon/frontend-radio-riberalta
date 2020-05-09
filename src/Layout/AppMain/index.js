import { Route } from 'react-router-dom';
import React, { Suspense, lazy, Fragment } from 'react';

import {
    ToastContainer,
} from 'react-toastify';
import { CircularProgress } from '@material-ui/core';
import logo from '../../assets/utils/images/logo-inverse.png'
import { connect } from 'react-redux';
const RR = lazy(() => import('../../Pages/RR'));
//const Admin = lazy(() => import('../../Pages/Admin'));



const AppMain = ({ TOKEN }) => {

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

const mapStateToProps = state => ({
    TOKEN: state.ThemeOptions.token
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AppMain);