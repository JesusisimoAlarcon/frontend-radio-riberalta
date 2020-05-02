import React, { Component } from 'react'
import PropTypes from 'prop-types';
import esLocale from 'date-fns/locale/es';
import { Link } from "react-router-dom";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsappIcon from '@material-ui/icons/WhatsApp';

import Zoom from '@material-ui/core/Zoom';
//import { Badge } from 'reactstrap'
import { Paper, Divider, Tooltip, Typography } from '@material-ui/core';
import { Row, Col } from 'reactstrap';
//import portada from '../../assets/utils/images/dropdown-header/abstract1.jpg'
import portada from '../../assets/test/test07.jpg'
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import VideocamIcon from '@material-ui/icons/Videocam';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import { connect } from 'react-redux';
import foto from '../../assets/test/test04.jpg'

//import AppHeader from '../../Layout/AppHeader/';
//import AppSidebar from '../../Layout/AppSidebar/';
import Axios from 'axios';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DescriptionIcon from '@material-ui/icons/Description';
import { format } from 'date-fns';
//import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ReactHtmlParser from 'react-html-parser';
import ReactPlayer from 'react-player';
//import video from '../../assets/test/angular.mp4'

import Image from 'material-ui-image'
import Swiper from './Componentes/Swiper'

import AudioPlayer from 'react-h5-audio-player';
import './Componentes/styleControlAudio.css'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import LoopIcon from '@material-ui/icons/Loop';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import moment from 'moment';
//import NoticiaVertical from './NoticiaVertical';
import MiniNoticiaVertical from './MiniNoticiaVertical';

import { formatDistanceStrict } from 'date-fns';

//import moduleName from 'date-fns/parseJSON'
function ScrollTop(props) {
    const { children, window } = props;
    //const classes = useStyles();
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" style={{
                position: 'fixed',
                bottom: '1%',
                right: '45%'
            }}>
                {children}
            </div>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
class DetailNotice extends Component {
    constructor(props) {
        super(props)
        //const { noticia } = props.location.state
        //console.log(noticia)
        //console.log(props.match.params.id)
        //console.log(props.match.params.titulo)
        //console.log(props.location.state)

        //console.log(this.props)

        this.state = {
            id: props.match.params.id,
            noticia: '',
            infografias: [],
            imagenes: [],
            contenido: '',
            audio: '',
            titleaudio: '',
            video: '',
            video_url: '',
            tipovideo: false,
            noticiasrelacionadas: ''
        }
        //console.log(this.props)
    }

    componentDidMount = async () => {

        //window.iframely && iframely.load();
        const resp = await Axios.get(this.props.API + 'noticia/' + this.state.id);
        const respnoti = resp.data;
        this.setState({
            noticia: respnoti[0]
        })
        const respinfo = await Axios.get(this.props.API + 'infografia/noticia/' + this.state.noticia.idnoticia);
        this.setState({
            infografias: respinfo.data
        })
        this.setState({
            imagenes: [...this.state.infografias]
        })
        if (this.state.noticia.tipo === 'audio') {
            this.setState({
                audio: this.props.API + 'static/audios/' + respinfo.data[0].infografia,
                titleaudio: respinfo.data[0].infotitulo
            })
        }
        if (this.state.noticia.tipo === 'video') {
            if (this.state.infografias[0].tipo === 'video_archivo') {
                this.setState({
                    tipovideo: false,
                    video: this.props.API + 'static/videos/' + respinfo.data[0].infografia,
                })
            }
            else {
                this.setState({
                    tipovideo: true,
                    video_url: respinfo.data[0].infografia,
                })
            }

        }

        //console.log(this.state.noticia)
        //console.log(respinfo)
        //console.log(this.state.infografias)
        //console.log(this.state.imagenes)

        //console.log(this.state.noticia)
        //console.log(this.state.noticia.contenido)
        let contenido_original = this.state.noticia.contenido;
        //console.log(contenido_original);



        let contenido_modificado_inicio = contenido_original.replace(/<figure class="media"><oembed url=/gi, `<div class="embed-responsive embed-responsive-16by9 mb-4"><iframe class="embed-responsive-item" allowfullscreen src=`);
        //console.log(contenido_modificado_inicio)
        let contenido_modificado_intermedio = contenido_modificado_inicio.replace(/oembed/gi, "iframe");
        //console.log(contenido_modificado_intermedio)
        let contenido_modificado_fin = contenido_modificado_intermedio.replace(/figure/gi, "div").replace(/youtu.be/gi, "www.youtube.com/embed");
        //console.log(contenido_modificado_fin)


        ///let contenido_modificado_fin = contenido_original;
        //replace(/[ ]/gi, '-')

        this.setState({
            contenido: contenido_modificado_fin
        })
        /*
        this.setState({
            contenido: contenido_original
        })
        */


        const anchor = document.querySelector('#back-to-top-anchor');
        //console.log(anchor)
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        /*
                //obteniendo noticias relacionadas con la actual
                const resp2 = await Axios.get(this.props.API + 'noticia/detalle/' + this.state.noticia.seccion);
                const noticiasall = resp2.data;
                
                const noticiasrelacionadas = noticiasall.filter(noti =>
                    (this.state.noticia.idnoticia !== noti.idnoticia
                        && noti.contenido.toLowerCase().indexOf(this.state.noticia.etiquetas.toLowerCase()) > -1
                        //&& this.state.noticia.etiquetas.split(',').map(eti => { return eti })
                    )
                )
        */
        const noticiasrelacionadas = await (await Axios.get(this.props.API + 'noticia/relacionadas/' + this.state.noticia.idnoticia + '/' + this.state.noticia.etiquetas)).data;
        this.setState({
            noticiasrelacionadas
        })
    }
    render() {
        return (

            <React.Fragment>

                <div id="back-to-top-anchor"></div>
                {/*}<Container fluid={false}>{*/}
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Row>
                        <Col xl='1' className='p-0'>
                        </Col>
                        <Col xl='10'>
                            {this.state.noticia &&
                                <Paper my={0} elevation={1} style={{ background: '#ffffff' }} className='pl-4 pr-4 pt-3 pb-3'>
                                    <Row>
                                        <Col lg='1' className='p-0'>
                                            <aside style={{
                                                position: 'sticky',
                                                top: '70px'
                                            }}>
                                                <small style={{
                                                    color: '#f50057',
                                                    fontWeight: 'bold'
                                                }}>Compartir</small>
                                                <Divider className='mt-1 mb-1 mr-4' />
                                                <div className='m-1'>
                                                    <Tooltip title='Compartir por Facebook' placement='right-start'>
                                                        <Fab size='small' className='m-1' color='secondary'>
                                                            <FacebookIcon fontSize='small' />
                                                        </Fab>
                                                    </Tooltip>
                                                    <Tooltip title='Compartir por Facebook' placement='right-start'>
                                                        <Fab size='small' className='m-1' color='secondary'>
                                                            <TwitterIcon fontSize='small' />
                                                        </Fab>
                                                    </Tooltip>
                                                    <Tooltip title='Compartir por Facebook' placement='right-start'>
                                                        <Fab size='small' className='m-1' color='secondary'>
                                                            <WhatsappIcon fontSize='small' />
                                                        </Fab>
                                                    </Tooltip>
                                                </div>
                                            </aside>
                                        </Col>

                                        <Col lg='11' className='p-0'>
                                            <Row>
                                                <Col lg='8' className='p-1 mb-2'>

                                                    <Image
                                                        className='border rounded'
                                                        //animationDuration={10000}
                                                        //loading={<CircularProgress size={48} />}
                                                        aspectRatio={(16 / 9)}
                                                        //src={portada}
                                                        src={
                                                            this.state.noticia.portada === undefined ? portada :
                                                                this.props.API + 'static/portadas/' + this.state.noticia.portada}
                                                    />
                                                    <div className='pl-2'>
                                                        <small style={{

                                                            color: '#f50057',
                                                            lineHeight: '0.002rem'
                                                        }}>
                                                            {this.state.noticia.pieportada}
                                                        </small>
                                                    </div>
                                                </Col>
                                                <Col lg='4'>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="space-between"
                                                        alignItems="flex-end"
                                                    >
                                                        <div >
                                                            <Chip size="small" label='' color='secondary' className='mr-1' avatar={
                                                                this.state.noticia.tipo === 'audio' ?
                                                                    <VolumeUpIcon style={{
                                                                        background: '#f50057',
                                                                        padding: '0'
                                                                    }} /> : this.state.noticia.tipo === 'video' ?
                                                                        <VideocamIcon style={{
                                                                            background: '#f50057',
                                                                            padding: '0'
                                                                        }} /> : this.state.noticia.tipo === 'image' ?
                                                                            <PhotoLibraryIcon style={{
                                                                                background: '#f50057',
                                                                                padding: '0'
                                                                            }} /> :
                                                                            <DescriptionIcon style={{
                                                                                background: '#f50057',
                                                                                padding: '0'
                                                                            }} />
                                                            } />

                                                            <Chip
                                                                size='small'
                                                                color='secondary'
                                                                label={
                                                                    <Link to={'/' + (this.state.noticia.seccion + '').toLowerCase()} style={{
                                                                        color: 'white'
                                                                    }}>{this.state.noticia.seccion}</Link>
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <Typography style={{ fontWeight: 'bold' }} variant="caption" color='secondary' display="block" gutterBottom>
                                                                <AccessTimeIcon color='secondary' fontSize='small' />
                                                                {format(new Date(moment(this.state.noticia.fecha)), 'dd MMMM yyyy - ', { locale: esLocale })}
                                                                {this.state.noticia.hora}
                                                            </Typography>
                                                        </div>
                                                    </Grid>

                                                    <Typography variant='h1' style={{
                                                        fontSize: '2.2rem',
                                                        fontFamily: 'PlayfairDisplay-Bold',
                                                        lineHeight: '2.4rem',
                                                        fontWeight: 'bold'
                                                    }}>
                                                        {this.state.noticia.titulo}
                                                    </Typography>
                                                    <Typography variant='subtitle1' style={{
                                                        marginTop: '10px',
                                                        color: '#4a4a4a',
                                                        fontFamily: 'LatoBold',
                                                        fontSize: '1rem',
                                                        lineHeight: '1.2rem',
                                                    }}>
                                                        {this.state.noticia.subtitulo}
                                                    </Typography>

                                                    <div className='mt-2'>
                                                        <ListItem
                                                            className='p-0'
                                                        >
                                                            <ListItemAvatar>
                                                                <Avatar src={foto} variant="rounded" fontSize='small' />
                                                            </ListItemAvatar>
                                                            <ListItemText

                                                                primary="Radio Riberalta"
                                                                secondary='@alarconcito'
                                                            />
                                                        </ListItem>
                                                    </div>
                                                </Col>

                                            </Row>
                                            <Divider className='mt-2 mb-3' />
                                            <Row>
                                                <Col lg='8'>
                                                    <div>{ReactHtmlParser(this.state.noticia.infocontenido)}</div>

                                                    {this.state.noticia.tipo === 'image' ?
                                                        this.state.imagenes.length > 0 &&
                                                        <Swiper
                                                            API={this.props.API}
                                                            imagenes={this.state.imagenes}
                                                        />
                                                        :
                                                        this.state.noticia.tipo === 'audio' ?
                                                            this.state.infografias.length > 0 &&

                                                            <AudioPlayer
                                                                //autoPlay
                                                                className='mb-3'
                                                                autoPlay={false}
                                                                autoPlayAfterSrcChange={false}
                                                                style={{
                                                                    background: 'white',
                                                                    color: '#e91e63',
                                                                    fontSize: '20px',
                                                                    borderColor: '#e91e63'
                                                                }}
                                                                //className=''
                                                                src={this.state.audio}
                                                                //onPlay={e => console.log("onPlay")}
                                                                header={this.state.titleaudio}
                                                                //footer="This is a footer"
                                                                showJumpControls={false}
                                                                //layout="horizontal"
                                                                // other props here
                                                                defaultCurrentTime="Cargando" defaultDuration="Cargando" customIcons={{
                                                                    play: <PlayCircleOutlineIcon color='secondary' style={{
                                                                        fontSize: '80px'
                                                                    }} />,
                                                                    pause: <PauseCircleOutlineIcon color='secondary' style={{
                                                                        fontSize: '80px'
                                                                    }} />,
                                                                    volume: <VolumeUpIcon color='secondary' fontSize='default' />,
                                                                    volumeMute: <VolumeOffIcon color='secondary' fontSize='default' />,
                                                                    loop: <LinkOffIcon color='secondary' fontSize='default' />,
                                                                    loopOff: <LoopIcon color='secondary' fontSize='default' />,

                                                                }}
                                                            /*
                                                            customProgressBarSection={
                                                                [
                                                                    RHAP_UI.PROGRESS_BAR,
                                                                    RHAP_UI.CURRENT_TIME,
                                                                    <div>/</div>,
                                                                    RHAP_UI.DURATION
                                                                ]
                                                            }
                                                            */
                                                            />
                                                            :
                                                            this.state.infografias.length > 0 &&
                                                            <div style={{
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
                                                                    className='mb-3'
                                                                    controls
                                                                    light={false}
                                                                    url={
                                                                        this.state.tipovideo === true ?
                                                                            this.state.video_url
                                                                            :
                                                                            this.state.video
                                                                    }
                                                                    width='100%'
                                                                    height='100%'
                                                                //url={video}
                                                                //width='100'
                                                                //height='auto'
                                                                />
                                                            </div>
                                                    }




                                                    <div>{ReactHtmlParser(this.state.contenido)}</div>


                                                    <Typography style={{ fontWeight: 'bold' }} variant="h6" color='secondary' display="block" gutterBottom>
                                                        En esta nota
                                                    </Typography>
                                                    <Divider className='mb-2' />
                                                    {this.state.noticia.etiquetas && this.state.noticia.etiquetas.split(',').map(etiqueta =>
                                                        <Chip
                                                            key={etiqueta}
                                                            className='mr-2'
                                                            color='secondary'
                                                            size='small'
                                                            variant='outlined'
                                                            label={<b>{etiqueta.charAt(0).toUpperCase() + etiqueta.slice(1)}</b>}
                                                        />
                                                    )}
                                                </Col>

                                                <Col lg='4'>
                                                    <aside style={{
                                                        position: 'sticky',
                                                        top: '70px'
                                                    }}>



                                                    </aside>
                                                </Col>

                                            </Row>
                                        </Col>
                                    </Row>
                                </Paper>
                            }
                            <Typography className='mt-4' style={{ fontWeight: 'bold' }} variant="h6" color='secondary' display="block" gutterBottom>
                                Le puede interesar
                            </Typography>
                            <Divider className='mt-2 mb-3' />


                            <Row className='p-2 mb-3'>

                                {this.state.noticiasrelacionadas && this.state.noticiasrelacionadas.map(noticia =>
                                    <Col lg='3'
                                        key={noticia.idnoticia}>
                                        {this.state.noticia &&
                                            <MiniNoticiaVertical
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
                                        }
                                    </Col>

                                )}
                            </Row>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>
                {/*}</Container>{*/}
                <ScrollTop {...this.props}>
                    <Fab color="secondary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>


            </React.Fragment >

        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(DetailNotice);