import { Route } from 'react-router-dom';
import React, { Fragment } from 'react';

import {
    ToastContainer,
} from 'react-toastify';
//import { CircularProgress } from '@material-ui/core';
//import logo from '../../assets/utils/images/logo-inverse.png'
import { connect } from 'react-redux';
import RR from '../../Pages/RR'
//const RR = lazy(() => import('../../Pages/RR'));
//const Admin = lazy(() => import('../../Pages/Admin'));
const AppMain = ({ TOKEN }) => {

    return (
        <Fragment>
            {/* Noticias */}
            
            <Route path="/" component={RR} />
            <ToastContainer />
        </Fragment>
    )
};

const mapStateToProps = state => ({
    TOKEN: state.ThemeOptions.token
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AppMain);