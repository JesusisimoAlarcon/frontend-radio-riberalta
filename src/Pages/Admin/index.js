import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AppHeader from './Layout/AppHeader'
import AppSidebar from '../../Layout/AppSidebar';
import { connect } from 'react-redux';
import Perfil from './Perfil';
import Conductor from './Conductor';
import Programa from './Programa';
import Programacion2 from './Programacion';
import FormNoticia from './Noticia';
import ListNoticias from './NoticiasList';
import Login from '../Login';

const PrivateRoute = ({ auth, component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }} />
    )} />
)
const Admin = ({ match, TOKEN }) => {
    return (
        <Fragment>
            <AppHeader />
            <div className="app-main">
                <AppSidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        <Switch>
                            <Route exact auth={TOKEN ? true : false} path={`${match.url}/`} component={Login} />
                            {/* Administracion */}
                            <PrivateRoute exact path={`${match.url}/perfil`} component={Perfil} />
                            {/* Administracion noticias */}
                            <PrivateRoute path={`${match.url}/registrar-noticia`} component={FormNoticia} />
                            <PrivateRoute path={`${match.url}/listar-noticias`} component={ListNoticias} />
                            {/* Administracion programacion */}
                            <PrivateRoute path={`${match.url}/programa`} component={Programa} />
                            <PrivateRoute path={`${match.url}/conductor`} component={Conductor} />
                            <PrivateRoute path={`${match.url}/programacion`} component={Programacion2} />
                        </Switch>
                    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
