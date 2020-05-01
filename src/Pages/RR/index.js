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
import Conductor from './Admin/Conductor';
import Programa from './Admin/Programa';
import Programacion2 from './Admin/Programacion';
import FormNoticia from './Admin/Noticia';
import ListNoticias from './Admin/NoticiasList';
//const DetailNotice = lazy(() => import('../../Components/Noticias/DetailNotice'));
import DetailNotice from '../../Components/Noticias/DetailNotice'


const RR = (props) => {
    console.log(props.match.url)
    return (
        <Fragment>

            <AppHeader />
            <div className="app-main">
                <AppSidebar />

                <div className="app-main__outer">
                    <div className="app-main__inner">
                        {/* Pagina principal */}
                        <Route exact path={`${props.match.url}`} component={Programacion} />

                        <Switch>
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



                            {/* Administracion */}

                            {/* Administracion noticias */}
                            <Route path={`/registrar-noticia`} component={FormNoticia} />
                            <Route path={`/listar-noticias`} component={ListNoticias} />


                            {/* Administracion programacion */}
                            <Route path={`/programa`} component={Programa} />
                            <Route path={`/conductor`} component={Conductor} />
                            <Route path={`/programacion`} component={Programacion2} />
                            <Route path={`/:id/:titulo`} component={DetailNotice} />

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