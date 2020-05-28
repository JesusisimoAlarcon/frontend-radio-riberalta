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
//import Image from 'material-ui-image';
import ReactPlayer from 'react-player';
import Swiper from './Componentes/Swiper';
class Noticias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noticias: [],
            seccion: this.props.match.url.length === 1 ? '' : this.props.match.url.split('/')[1],
            progreso: 0,
            open: true,
            masNoticias: false,
            page: 1,
            publicidades: '',
            publiimages: '',
            publivideos: ''
        }
        const anchor = document.querySelector('#back-to-top-anchor');
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        this.api = Axios.create({
            baseURL: this.props.API,
        })
    }

    componentDidMount() {
        this.getPublicidad();
        //this.leerNoticias();
    }

    getPublicidad() {
        this.api.get('publicidad').then(response => {
            let publicidades = response.data;
            publicidades = publicidades.filter(publi => publi.estado === 1);
            let publiimages = publicidades.filter(publi => publi.tipo === 'image');
            let publivideos = publicidades.filter(publi => publi.tipo === 'video');
            this.setState({ publicidades, publiimages, publivideos })
            /*
            console.log(this.state.publicidades)
            console.log(this.state.publiimages)
            console.log(this.state.publivideos)
            */
            this.leerNoticias();
        })
        /*
        let publicidades = await(await this.api.get('publicidad')).data;
        this.setState({ publicidades })
        console.log(this.state.publicidades)
        */
    }

    leerNoticias() {

        if (!this.state.publicidades) {
            this.api.get('publicidad').then(response => {
                let publicidades = response.data;
                this.setState({ publicidades })
                console.log(this.state.publicidades)
            })
        }

        this.api.get('noticia/detalle/seccion', {
            params: {
                seccion: this.state.seccion,
                limit: 10,
                page: this.state.page
            }
        }).then(response => {
            let data = response.data;
            if (data.length) {
                let indice = 1
                //console.log('inicio de la copia')
                let noticias = this.state.noticias;
                let publi = {};
                if (this.state.publicidades) {
                    publi.images = this.state.publiimages;
                    publi.video = this.state.publivideos[Math.floor(Math.random() * this.state.publivideos.length)];
                    //publi.image = this.state.publiimages[Math.floor(Math.random() * this.state.publiimages.length)];
                    /*
                    let item = Math.floor(Math.random() * this.state.publicidades.length)
                    publicidad = this.state.publicidades[item]
                    this.state.publicidades.splice(item, 1)
                    */
                }
                else {
                    publi.images =
                        [{
                            publicidad: 'portada.png',
                            paginaweb: 'radioriberalta.com.bo',
                        }]
                    publi.video = {
                        publicidad: 'https://youtu.be/5NPBIwQyPWE?list=RD5NPBIwQyPWE',
                        paginaweb: 'radioriberalta.com.bo',
                    }
                    /*
                    publi.image = {
                        publicidad: 'portada.png',
                        paginaweb: 'radioriberalta.com.bo',
                    }
                    */
                }
                console.log(publi)
                if (data.length >= 3)
                    data.splice(3, 0, publi)
                data.map(noticia =>
                    noticia.indice = indice++
                )
                noticias = noticias.concat(data)
                this.setState({
                    noticias: noticias,
                    masNoticias: true,
                    page: this.state.page + 1,
                    open: false
                })
                console.log(this.state.noticias)
                //console.log('fin de la copia')
            }
            else {
                this.setState({
                    masNoticias: false,
                })
            }
        })
        /*
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
            let publicidad;
            if (this.state.publicidades) {
                let item = Math.floor(Math.random() * this.state.publicidades.length)
                publicidad = this.state.publicidades[item]
                this.state.publicidades.splice(item, 1)
            }
            else {
                publicidad = {
                    publicidad: 'portada.png',
                    paginaweb: 'radioriberalta.com.bo',
                }
            }
            if (data.length >= 3)
                data.splice(3, 0, publicidad)
            data.map(noticia =>
                noticia.indice = indice++
            )
            noticias = noticias.concat(data)
            this.setState({
                noticias: noticias,
                masNoticias: true,
                page: this.state.page + 1,
                open: false
            })
            console.log(this.state.noticias)
            console.log('fin de la copia')
        }
        else {
            this.setState({
                masNoticias: false,
            })
        }
        */
    }
    render() {
        return (
            <Fragment>
                <div id="back-to-top-anchor"></div>
                <Row>
                    {/*}
                    <Col xl='1' lg='0' md='0' sm='0' className='p-0'>
                    </Col>
                    {*/}
                    <Col xl='12' lg='12' md='12' sm='12'>
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
                                        <CircularProgress className='mt-0 mb-3 ml-3 mr-3' thickness={2} size='16rem' variant="indeterminate" color="secondary" />
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
                                            <Col lg={4} key={(-1) * Math.floor(Math.random() * (this.state.noticias.length * 2))}>
                                                <Paper className='mb-3'>
                                                    <Swiper
                                                        API={this.props.API}
                                                        imagenes={noticia.images}
                                                    />
                                                </Paper>
                                                {/*}
                                                <CardActionArea
                                                    className='mb-3'
                                                    onClick={() =>
                                                        noticia.image.paginaweb &&
                                                        window.open(`https://${noticia.image.paginaweb}`, '_blank')
                                                    }
                                                >
                                                    <Image
                                                        className='border rounded'
                                                        //animationDuration={10000}
                                                        //loading={<CircularProgress size={48} />}
                                                        aspectRatio={(16 / 9)}
                                                        //src={portada}
                                                        src={this.props.API + 'static/publicidad/' +
                                                            noticia.image.publicidad}
                                                    />
                                                </CardActionArea>
                                                {*/}
                                                <Paper className='mb-3'>
                                                    <div
                                                        style={{
                                                            //position: 'relative',
                                                            //paddingTop: '56.25%'
                                                            height: 0,
                                                            overflow: 'hidden',
                                                            paddingBottom: '56.25%',
                                                            paddingTop: '30px',
                                                            position: 'relative'
                                                        }}>
                                                        <ReactPlayer
                                                            style={{
                                                                position: 'absolute',
                                                                top: 0,
                                                                left: 0,
                                                                width: '100%',
                                                                height: '100%'
                                                            }}
                                                            controls
                                                            light={false}
                                                            url={noticia.video.publicidad}
                                                            width='100%'
                                                            height='100%'
                                                        />
                                                    </div>
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
                    {/*}
                    <Col xl='1' lg='0' md='0' sm='0' className='p-0'>
                    </Col>
                    {*/}
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