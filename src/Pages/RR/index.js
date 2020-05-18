import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
import Noticias from './Noticias'
import { connect } from 'react-redux';
import Programacion from './Radio/Programacion';
import DetailNotice from '../../Components/Noticias/DetailNotice'
import Busqueda from '../RR/Busqueda';
import Axios from 'axios';
import {
    setSecciones
} from '../../reducers/ThemeOptions';
import { withRouter } from 'react-router-dom';
class RR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secciones: ''
        }
    }
    componentDidMount() {
        this.getSecciones();
    }
    getSecciones = async () => {
        const secciones = await (await Axios.get(this.props.API + 'seccion/navs')).data;
        this.setState({ secciones })
        this.props.setSecciones(this.state.secciones)
    }
    render() {
        const { match, location } = this.props;
        //console.log(match)
        //console.log(location)
        //console.log(history)
        return (
            <Fragment>
                <AppHeader />
                <div className="app-main">
                    <AppSidebar />
                    <div className="app-main__outer">
                        <div className="app-main__inner">
                            <Switch>
                                {location.search &&
                                    console.log(location.search)
                                }
                                <Route exact path={`${match.url}search/:busqueda`} component={withRouter(Busqueda)} />
                                <Route exact path={`${match.url}:id/:titulo`} component={withRouter(DetailNotice)} />
                                {/* Pagina principal */}
                                <Route exact path={`${match.url}`} component={withRouter(Noticias)} />
                                {/* Noticias */}
                                {this.state.secciones && this.state.secciones.map(sec =>
                                    <Route
                                        exact
                                        key={sec.label}
                                        path={`${match.url}${sec.label.toLowerCase()}`}
                                        component={withRouter(Noticias)}
                                    />
                                )}
                                {/* Radio Riberalta */}
                                <Route exact path={`${match.url}nuestra-programacion`} component={withRouter(Programacion)} />
                            </Switch>
                        </div>
                        <AppFooter />
                    </div>
                </div>
            </Fragment >
        )
    }
};
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST,
    TOKEN: state.ThemeOptions.token
});
const mapDispatchToProps = dispatch => ({
    setSecciones: secciones => dispatch(setSecciones(secciones)),
});
export default connect(mapStateToProps, mapDispatchToProps)(RR);
