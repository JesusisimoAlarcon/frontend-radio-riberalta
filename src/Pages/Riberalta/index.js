import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import FormNoticiaEditor from './FormNoticiaEditor'
import ListNoticias from './ListNoticias';
const Riberalta = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    {/* Riberalta informacion */}

                    {/* Cultura, sitios turisticos, nuestra gente */}
                    <Route path={`${match.url}/registrar-noticia`} component={FormNoticiaEditor}/>
                    <Route path={`${match.url}/listar-noticias`} component={ListNoticias}/>
           
                </div>
            </div>
        </div>
    </Fragment>
);

export default Riberalta;