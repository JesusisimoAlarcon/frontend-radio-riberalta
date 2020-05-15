
import { Route } from 'react-router-dom';
import React, { Fragment } from 'react';
import {
    ToastContainer,
} from 'react-toastify';
import { connect } from 'react-redux';
import RR from '../../Pages/RR'
import { withRouter } from 'react-router-dom';
const AppMain = ({ TOKEN }) => {
    return (
        <Fragment>
            {/* Noticias */}
            <Route path="/" component={withRouter(RR)} />
            <ToastContainer />
        </Fragment>
    )
};
const mapStateToProps = state => ({
    TOKEN: state.ThemeOptions.token
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AppMain);