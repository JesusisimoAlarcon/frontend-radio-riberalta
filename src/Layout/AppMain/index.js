import { Route } from 'react-router-dom';
import React, { Fragment } from 'react';
import {
    ToastContainer,
} from 'react-toastify';
import RR from '../../Pages/RR';
const AppMain = () => {
    return (
        <Fragment>
            {/* Noticias */}
            <Route path="/" component={RR} />
            <ToastContainer />
        </Fragment>
    )
};
export default AppMain;