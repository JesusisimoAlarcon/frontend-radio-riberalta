import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
//import PageTitle from '../../../Layout/AppMain/PageTitle';
import CabeceraInfo from '../../../Layout/AppMain/CabeceraInfo';
import Axios from 'axios';
import NoticiaSecundaria from '../../../Components/Noticias/NoticiaSecundaria';
//import { Container } from 'reactstrap';
import { formatDistanceStrict } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { Row, Col } from 'reactstrap';

class Noticias extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noticias: [],
            seccion: this.props.match.url.split('/')[2]
        }
    }

    async componentDidMount() {
        const resp = await Axios.get(this.props.API + 'noticia/detalle/' + this.state.seccion)
        this.setState({
            noticias: resp.data
        })
    }

    render() {
        return (
            <Fragment>
                {/*}
                <PageTitle
                    heading={this.state.seccion}
                    subheading="Noticas de ultima hora sobre la ciudad de Riberalta."
                    icon="pe-7s-add-user text-primary"
                />
                {*/}
                <Row>
                    <Col lg='1'>
                    </Col>
                    <Col lg='10'>
                        <CabeceraInfo />
                    </Col>
                    <Col lg='1'>
                    </Col>
                </Row>
                <Row>
                    <Col lg='1'>
                    </Col>
                    <Col lg='10'>
                        {this.state.noticias.map(noticia =>
                            <NoticiaSecundaria
                                //props={this.props}
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
                        )}
                    </Col>
                    <Col lg='1'>
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
export default connect(mapStateToProps, mapDispatchToProps)(Noticias);