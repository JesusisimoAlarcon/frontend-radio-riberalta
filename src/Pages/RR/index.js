import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

// COMPONENTS

// Tabs

//import TabExample from '../Components/Tabs/';

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

//import Riberalta from './Riberalta';
//import Politica from './Politica';
//import DetalleNoticia from '../../Components/Noticias/DetalleNoticia';
//import Economia from '../Noticias/Economia';
import Noticias from './Noticias'
import { connect } from 'react-redux';
//import DetalleNoticia from '../../Components/Noticias/DetalleNoticia'
import Programacion from './Radio/Programacion';
/*
import Conductor from './Admin/Conductor';
import Programa from './Admin/Programa';
import Programacion2 from './Admin/Programacion';
import FormNoticia from './Admin/Noticia';
import ListNoticias from './Admin/NoticiasList';
*/
//const DetailNotice = lazy(() => import('../../Components/Noticias/DetailNotice'));
import DetailNotice from '../../Components/Noticias/DetailNotice'
import Busqueda from '../RR/Busqueda'

const RR = (props) => {
    return (
        <Fragment>
            <AppHeader />
            <div className="app-main">
                <AppSidebar />

                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <Switch>


                            <Route exact path={`/search/:busqueda`} component={Busqueda} />
                            <Route exact path={`/:id/:titulo`} component={DetailNotice} />


                            {/* Pagina principal */}admin/
                            <Route exact path={`/`} component={Noticias} />


                            {/* Noticias */}
                            {props.SECCIONES.map(sec =>
                                <Route
                                    key={sec.label}
                                    path={`/${sec.label.toLowerCase()}`}
                                    component={Noticias}
                                />
                            )}


                            {/* Riberalta */}


                            {/* Radio Riberalta */}

                            <Route path={`/quienes-somos`} component={Programacion} />
                            <Route path={`/nuestros-servicios`} component={Programacion} />
                            <Route path={`/nuestra-programacion`} component={Programacion} />



                            {/* Administracion 

                            <Route exact path={`/admin`} component={FormNoticia} />
                            <Route exact path={`/admin/registrar-noticia`} component={FormNoticia} />
                            <Route exact path={`/admin/listar-noticias`} component={ListNoticias} />
                            <Route exact path={`/admin/programa`} component={Programa} />
                            <Route exact path={`/admin/conductor`} component={Conductor} />
                            <Route exact path={`/admin/programacion`} component={Programacion2} />
                        */}
                            {/*}<Route path="/noticia/:id/:titulo" component={DetailNotice} />{*/}
                        </Switch>
                    </div>

                    <AppFooter />
                </div>
            </div>

        </Fragment>
    )
};
const mapStateToProps = state => ({
    SECCIONES: state.ThemeOptions.secciones
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(RR);