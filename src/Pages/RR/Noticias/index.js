import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
//import PageTitle from '../../../Layout/AppMain/PageTitle';
import CabeceraInfo from '../../../Layout/AppMain/CabeceraInfo';
import Axios from 'axios';
//import NoticiaHorizontal from '../../../Components/Noticias/NoticiaHorizontal';
import NoticiaVertical from '../../../Components/Noticias/NoticiaVertical';
import MiniNoticiaVertical from '../../../Components/Noticias/MiniNoticiaVertical';
//import { Container } from 'reactstrap';
import { formatDistanceStrict } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { Row, Col } from 'reactstrap';
import { Divider } from '@material-ui/core';

class Noticias extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noticiasprincipales: '',
            noticiassecundarias: '',
            noticias: '',
            noticiasrestantes: '',
            noticiasmasvistas: '',
            seccion: this.props.match.url.split('/')[1]
        }
        console.log('url match', this.props.match.url.split('/')[1])
    }

    async componentDidMount() {

        let noticias, noticiasprincipales, noticiassecundarias, noticiasrestantes;
        const resp = await Axios.get(this.props.API + 'noticia/detalle/' + this.state.seccion);

        //Todas las noticias
        noticias = resp.data.filter((noti) =>
            new Date(noti.fecha).getDate() === new Date().getDate()
        );
        if (noticias.length === 0) {
            noticias = resp.data
            noticiasprincipales = noticias.slice(0, 3)
            noticiassecundarias = noticias.slice(3, 6)
        }
        else {
            //noticias prioridas principal => 5
            noticiasprincipales = noticias.filter((noti) =>
                noti.prioridad === 5
            ).slice(0, 3);

            //noticias prioridas principal => 4
            noticiassecundarias = noticias.filter((noti) =>
                noti.prioridad === 4
            ).slice(0, 3);
        }

        //ultimas noticias
        noticiasrestantes = noticias.filter(
            noti =>
                (!noticiasprincipales.includes(noti) && !noticiassecundarias.includes(noti))
        );
        this.setState({
            noticias,
            noticiasprincipales,
            noticiassecundarias,
            noticiasrestantes
        })

        console.log(this.state.noticiasprincipales);
        console.log(this.state.noticiassecundarias);
        console.log(this.state.noticiasrestantes)
        console.log(this.state.noticias);
    }
    render() {
        return (

            <Fragment>
                <Row>
                    <Col xl='1' lg='0' md='0' sm='0' className='p-0'>
                    </Col>

                    <Col xl='10' lg='12' md='12' sm='12'>

                        <CabeceraInfo />

                        {/* Noticas principales */}
                        <Row>
                            {this.state.noticiasprincipales && this.state.noticiasprincipales.map((noticia, indice) =>
                                indice % 2 === 0 ?
                                    <Col lg='8'
                                        key={noticia.idnoticia}>

                                        <NoticiaVertical
                                            //props={this.props}

                                            noticia={noticia}
                                            idnoticia={noticia.idnoticia}
                                            key={noticia.idnoticia}
                                            portada={noticia.portada}
                                            pieportada={noticia.pieportada}
                                            titulo={noticia.titulo}
                                            //subtitulo={this.state.noticiaprincipal.subtitulo}
                                            seccion={noticia.seccion}
                                            tipo={noticia.tipo}
                                            fecha={noticia.fecha}
                                            //tiempo={formatDistanceToNow(new Date(noticia.fecha), { locale: esLocale, includeSeconds: true, addSuffix: true })}
                                            tiempo={formatDistanceStrict(new Date(noticia.fecha), new Date(), { locale: esLocale, includeSeconds: true, addSuffix: true })}

                                        />




                                    </Col>
                                    :
                                    <Col lg='4'
                                        key={noticia.idnoticia}>
                                        <NoticiaVertical
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


                                    </Col>

                            )}
                            <Col lg='4'>

                                PUBLICIDAD


                            </Col>
                        </Row>


                        <Divider className='mb-3' />

                        {/* Noticas Secundarias */}

                        <Row>
                            {this.state.noticiassecundarias && this.state.noticiassecundarias.map((noticia) =>
                                <Col lg='4'
                                    key={noticia.idnoticia}>
                                    <NoticiaVertical
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
                                </Col>
                            )}
                        </Row>


                        <Divider className='mb-3' />

                        {/* Noticas restantes */}
                        <Row>

                            {this.state.noticiasrestantes && this.state.noticiasrestantes.map((noticia) =>
                                <Col lg='3'
                                    key={noticia.idnoticia}>
                                    <MiniNoticiaVertical
                                        //props={this.props}

                                        noticia={noticia}
                                        idnoticia={noticia.idnoticia}
                                        key={noticia.idnoticia}
                                        portada={noticia.portada}
                                        pieportada={noticia.pieportada}
                                        titulo={noticia.titulo}
                                        //subtitulo={noticia.subtitulo}
                                        seccion={noticia.seccion}
                                        tipo={noticia.tipo}
                                        fecha={noticia.fecha}
                                        //tiempo={formatDistanceToNow(new Date(noticia.fecha), { locale: esLocale, includeSeconds: true, addSuffix: true })}
                                        tiempo={formatDistanceStrict(new Date(noticia.fecha), new Date(), { locale: esLocale, includeSeconds: true, addSuffix: true })}

                                    />
                                </Col>
                            )}
                        </Row>

                    </Col>
                    <Col xl='1' lg='0' md='0' sm='0' className='p-0'>
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