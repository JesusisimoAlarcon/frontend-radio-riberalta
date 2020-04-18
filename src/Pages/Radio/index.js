import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import Programacion from './Programacion';

import Politica from '../Noticias/Politica'
const Radio = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    {/* Radio Riberalta informacion */}

                    {/* Quienes somos, nuestro servicios, programacion radial */}
                    <Route path={`${match.url}/quienes-somos`} component={Programacion}/>
                    <Route path={`${match.url}/nuestros-servicios`} component={Politica}/>
                    <Route path={`${match.url}/nuestra-programacion`} component={Programacion}/>


                    
           
                </div>
            </div>
        </div>
    </Fragment>
);

export default Radio;