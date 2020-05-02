import React, { Component, Fragment } from 'react'
import Axios from 'axios';
import { connect } from 'react-redux';
import NoticiaHorizontal from '../../../Components/Noticias/NoticiaHorizontal'
import { formatDistanceStrict } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { Row, Col } from 'reactstrap';
import { Typography } from '@material-ui/core';
import cx from 'classnames';
import { Divider } from '@material-ui/core';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
class Busqueda extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noticias: '',
            busqueda: this.props.match.params.busqueda
        }
        console.log(this.props.match.params.busqueda)
    }
    componentDidMount = async () => {
        const noticias = await (await Axios.get(this.props.API + 'noticia/search/' + this.state.busqueda)).data;
        this.setState({ noticias })
    }
    render() {
        return (
            <Fragment>
                <Row>
                    <Col xl='1' lg='1'>
                    </Col>
                    <Col xl='10' lg='10'>

                        {this.state.noticias &&
                            <center>
                                <div className={
                                    cx("search-wrapper", {
                                        'active': true
                                    })}
                                >
                                    <div className="input-holder">
                                        <input
                                            placeholder='Buscar'
                                            type="text"
                                            className="search-input"
                                            onChange={(event) => this.setState({ busqueda: event.target.value })}
                                            value={this.state.busqueda}
                                        />
                                        <button
                                            className="search-icon"><span />
                                        </button>
                                    </div>
                                </div>
                                <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1rem' }} className='m-3' variant="caption" color='secondary' display="block" gutterBottom>
                                    Se han encontrado {this.state.noticias.length} resultados
                            </Typography>
                            </center>

                        }
                        {this.state.noticias && this.state.noticias.map(noticia =>
                            <ReactCSSTransitionGroup
                                key={noticia.idnoticia}
                                component="div"
                                transitionName="TabsAnimation"
                                transitionAppear={true}
                                transitionAppearTimeout={0}
                                transitionEnter={false}
                                transitionLeave={false}>
                                <NoticiaHorizontal
                                    noticia={noticia}
                                    idnoticia={noticia.idnoticia}
                                    key={noticia.idnoticia}
                                    portada={noticia.portada}
                                    pieportada={noticia.pieportada}
                                    titulo={noticia.titulo}
                                    subtitulo={noticia.subtitulo}
                                    seccion={noticia.seccion}
                                    tipo={noticia.tipo}
                                    fecha={noticia.fecha}
                                    //tiempo={formatDistanceToNow(new Date(noticia.fecha), { locale: esLocale, includeSeconds: true, addSuffix: true })}
                                    tiempo={formatDistanceStrict(new Date(noticia.fecha), new Date(), { locale: esLocale, includeSeconds: true, addSuffix: true })}
                                />
                                <Divider className='mb-2 mt-2' />
                            </ReactCSSTransitionGroup>
                        )}
                    </Col>
                    <Col xl='2' lg='1'>
                    </Col>
                </Row>

            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Busqueda);