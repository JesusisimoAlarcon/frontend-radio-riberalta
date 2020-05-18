import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import CabeceraInfo from '../../../Layout/AppMain/CabeceraInfo';
import Axios from 'axios';
import NoticiaVertical from '../../../Components/Noticias/NoticiaVertical';
import MiniNoticiaVertical from '../../../Components/Noticias/MiniNoticiaVertical';
import { formatDistanceStrict } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import { Row, Col } from 'reactstrap';
import { Backdrop, CircularProgress, Paper } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroller';
import portada from '../../../assets/utils/images/portada.jpg';
import Image from 'material-ui-image';
class Noticias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noticias: [],
            seccion: this.props.match.url.length === 1 ? '' : this.props.match.url.split('/')[1],
            progreso: 0,
            open: true,
            masNoticias: true,
            page: 1
        }
        const anchor = document.querySelector('#back-to-top-anchor');
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        this.api = Axios.create({
            baseURL: this.props.API,
            /*
            onDownloadProgress: (e) => {
                if ((Math.round(e.loaded * 100) / e.total) === 100)
                    this.setState({ open: false })
            }
            */
        })
    }

    async leerNoticias() {
        let data = await (await this.api.get('noticia/detalle/seccion', {
            params: {
                seccion: this.state.seccion,
                limit: 10,
                page: this.state.page
            }
        })).data;
        if (data.length) {
            let indice = 1
            console.log('inicio de la copia')
            let noticias = this.state.noticias;
            const publicidad = {
                publicidad: portada,
                paginaweb: 'radioriberalta.com.bo'
            }
            if (data.length >= 3)
                data.splice(3, 0, publicidad)
            data.map(noticia =>
                noticia.indice = indice++
            )
            noticias = noticias.concat(data)


            //console.log(data)
            this.setState({
                noticias: noticias,
                masNoticias: true,
                page: this.state.page + 1,
                open: false
            })
            console.log('fin de la copia')
        }
        else {
            this.setState({
                masNoticias: false,
            })
        }

    }
    render() {
        return (
            <Fragment>
                <div id="back-to-top-anchor"></div>
                <Row>
                    <Col xl='1' lg='0' md='0' sm='0' className='p-0'>
                    </Col>
                    <Col xl='10' lg='12' md='12' sm='12'>
                        <CabeceraInfo />
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={this.leerNoticias.bind(this)}
                            hasMore={this.state.masNoticias}
                            loader={
                                this.state.open ?
                                    <Backdrop
                                        key={0}
                                        style={{
                                            zIndex: 1
                                        }}
                                        open={this.state.open}
                                    >
                                        <CircularProgress className='mt-0 mb-3 ml-3 mr-3' thickness={2} size='8rem' variant="indeterminate" color="secondary" />

                                    </Backdrop>
                                    :
                                    <div key={0} className='text-center'>
                                        <CircularProgress className='mt-0 mb-3 ml-3 mr-3' thickness={2} size='4rem' variant="indeterminate" color="secondary" />
                                    </div>
                            }
                        >
                            <Row>
                                {this.state.noticias && this.state.noticias.map((noticia) =>
                                    noticia.indice <= 3 ?
                                        <Col lg={(noticia.indice % 2 === 0) ? 4 : 8}
                                            key={noticia.idnoticia}>
                                            <NoticiaVertical
                                                idnoticia={noticia.idnoticia}
                                                key={noticia.idnoticia}
                                                portada={noticia.portada}
                                                titulo={noticia.titulo}
                                                seccion={noticia.seccion}
                                                tipo={noticia.tipo}
                                                tiempo={formatDistanceStrict(new Date(noticia.fecha), new Date(), { locale: esLocale, includeSeconds: true, addSuffix: true })}
                                            />
                                        </Col>
                                        :
                                        noticia.indice === 4 ?
                                            <Col lg={4}>
                                                <Paper className='mb-3'>
                                                    <Image
                                                        className='border rounded'
                                                        //animationDuration={10000}
                                                        //loading={<CircularProgress size={48} />}
                                                        aspectRatio={(16 / 9)}
                                                        //src={portada}
                                                        src={noticia.publicidad}
                                                    />
                                                </Paper>
                                                <Paper className='mb-3'>
                                                    <Image
                                                        className='border rounded'
                                                        //animationDuration={10000}
                                                        //loading={<CircularProgress size={48} />}
                                                        aspectRatio={(16 / 9)}
                                                        //src={portada}
                                                        src={noticia.publicidad}
                                                    />
                                                </Paper>
                                            </Col>
                                            :
                                            noticia.indice >= 5 && noticia.indice <= 7 ?
                                                <Col lg={4}
                                                    key={noticia.idnoticia}>
                                                    <NoticiaVertical
                                                        idnoticia={noticia.idnoticia}
                                                        key={noticia.idnoticia}
                                                        portada={noticia.portada}
                                                        titulo={noticia.titulo}
                                                        seccion={noticia.seccion}
                                                        tipo={noticia.tipo}
                                                        tiempo={formatDistanceStrict(new Date(noticia.fecha), new Date(), { locale: esLocale, includeSeconds: true, addSuffix: true })}
                                                    />
                                                </Col>
                                                :
                                                <Col lg={3}
                                                    key={noticia.idnoticia}>
                                                    <MiniNoticiaVertical
                                                        idnoticia={noticia.idnoticia}
                                                        key={noticia.idnoticia}
                                                        portada={noticia.portada}
                                                        titulo={noticia.titulo}
                                                        subtitulo={noticia.subtitulo}
                                                        seccion={noticia.seccion}
                                                        tipo={noticia.tipo}
                                                        tiempo={formatDistanceStrict(new Date(noticia.fecha), new Date(), { locale: esLocale, includeSeconds: true, addSuffix: true })}
                                                    />
                                                </Col>
                                )}
                            </Row>
                        </InfiniteScroll>
                    </Col>
                    <Col xl='1' lg='0' md='0' sm='0' className='p-0'>
                    </Col>
                </Row>
            </Fragment >
        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Noticias);