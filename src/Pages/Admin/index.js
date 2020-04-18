import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// COMPONENTS

// Tabs

//import TabExample from '../Components/Tabs/';

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import FormPrograma from './FormPrograma';
import FormConductor from './FormConductor';
//import FormNoticiaEditor from './FormNoticiaEditor';
import FormNoticiaEditor from './FormNoticiaEditor'
import ListNoticias from './ListNoticias';
import FormProgramacion from './FormProgramacion';
//import FormNoticia from './FornNoticia';

const Administracion = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    {/* Administracion */}

                    {/* Administracion noticias */}
                    <Route path={`${match.url}/registrar-noticia`} component={FormNoticiaEditor}/>
                    <Route path={`${match.url}/listar-noticias`} component={ListNoticias}/>


                    {/* Administracion programacion */}
                    <Route path={`${match.url}/programa`} component={FormPrograma}/>
                    <Route path={`${match.url}/conductor`} component={FormConductor}/>
                    <Route path={`${match.url}/programacion`} component={FormProgramacion}/>
           
                </div>
            </div>
        </div>
    </Fragment>
);

export default Administracion;