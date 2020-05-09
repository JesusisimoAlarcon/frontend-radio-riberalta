import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import Noticias from './Noticias'
import { connect } from 'react-redux';
import Programacion from './Radio/Programacion';
import DetailNotice from '../../Components/Noticias/DetailNotice'
import Busqueda from '../RR/Busqueda';


import Perfil from '../Admin/Perfil';
import Conductor from '../Admin/Conductor';
import Programa from '../Admin/Programa';
import Programacion2 from '../Admin/Programacion';
import FormNoticia from '../Admin/Noticia';
import ListNoticias from '../Admin/NoticiasList';
import Login from '../Login';


const PrivateRoute = ({ auth, component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
            }} />
    )} />
)
const RR = ({ SECCIONES, match, TOKEN }) => {
    return (
        <Fragment>
            <AppHeader />
            <div className="app-main">
                <AppSidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <Switch>
                            <Route exact path={`${match.url}search/:busqueda`} component={Busqueda} />
                            <Route exact path={`${match.url}:id/:titulo`} component={DetailNotice} />
                            {/* Pagina principal */}
                            <Route exact path={`${match.url}`} component={Noticias} />
                            {/* Noticias */}
                            {SECCIONES.map(sec =>
                                <Route
                                    exact
                                    key={sec.label}
                                    path={`${match.url}${sec.label.toLowerCase()}`}
                                    component={Noticias}
                                />
                            )}
                            {/* Radio Riberalta */}
                            <Route exact path={`${match.url}quienes-somos`} component={Programacion} />
                            <Route exact path={`${match.url}nuestros-servicios`} component={Programacion} />
                            <Route exact path={`${match.url}nuestra-programacion`} component={Programacion} />



                            <Route exact path={`${match.url}signin`} component={Login} />


                            {/* Administracion */}
                            <PrivateRoute exact path={`${match.url}perfil`} component={Perfil} />
                            {/* Administracion noticias */}
                            <PrivateRoute path={`${match.url}registrar-noticia`} component={FormNoticia} />
                            <PrivateRoute path={`${match.url}listar-noticias`} component={ListNoticias} />
                            {/* Administracion programacion */}
                            <PrivateRoute path={`${match.url}programa`} component={Programa} />
                            <PrivateRoute path={`${match.url}conductor`} component={Conductor} />
                            <PrivateRoute path={`${match.url}programacion`} component={Programacion2} />
                        </Switch>
                    </div>
                    <AppFooter />
                </div>
            </div>
        </Fragment>
    )
};
const mapStateToProps = state => ({
    SECCIONES: state.ThemeOptions.secciones,
    TOKEN: state.ThemeOptions.token
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(RR);