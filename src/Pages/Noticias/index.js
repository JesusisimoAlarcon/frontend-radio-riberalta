import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

// COMPONENTS

// Tabs

//import TabExample from '../Components/Tabs/';

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

//import Riberalta from './Riberalta';
//import Politica from './Politica';
//import DetalleNoticia from '../../Components/Noticias/DetalleNoticia';
import Economia from './Economia';
import { connect } from 'react-redux';
//import DetalleNoticia from '../../Components/Noticias/DetalleNoticia'


const Noticias = (props) => {
    return (
        <Fragment>
            <AppHeader />
            <div className="app-main">
                <AppSidebar />

                <div className="app-main__outer">
                    <div className="app-main__inner">
                        {/* Noticias */}
                        {props.SECCIONES.map(sec =>
                            <Route
                                key={sec.label}
                                path={`${props.match.url}/${sec.label.toLowerCase()}`}
                                component={Economia}
                            />

                        )}

                    </div>
                </div>
            </div>
        </Fragment>
    )
};
const mapStateToProps = state => ({
    SECCIONES: state.ThemeOptions.secciones
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Noticias);