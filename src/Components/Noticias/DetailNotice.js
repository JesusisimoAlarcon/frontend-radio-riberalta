import React, { Component } from 'react'
import PropTypes from 'prop-types';
import esLocale from 'date-fns/locale/es';
import { Link } from "react-router-dom"
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsappIcon from '@material-ui/icons/WhatsApp';

import Zoom from '@material-ui/core/Zoom';
import { Paper, CardMedia, Divider, Tooltip, Typography, CardActionArea } from '@material-ui/core';
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

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
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

        console.log(this.props)

        this.state = {
            id: props.match.params.id,
            noticia: {},
            infografias: [],
            imagenes: [],
            contenido: '',
            audio: '',
            titleaudio: '',
            video: '',
            video_url: '',
            tipovideo: false
        }

    }

    componentDidMount = async () => {
        const resp = await Axios.get(this.props.API + 'noticia/' + this.state.id);
        this.setState({
            noticia: resp.data[0]
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
        let contenido_original = this.state.noticia.contenido + '';
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

        const anchor = document.querySelector('#back-to-top-anchor');
        //console.log(anchor)
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    render() {
        return (

            <React.Fragment>

                <AppHeader />
                <div className="app-main">
                    <AppSidebar />

                    <div className="app-main__outer">
                        <div className="app-main__inner">

                            <div id="back-to-top-anchor"></div>
                            {/*}<Container fluid={false}>{*/}
                            <ReactCSSTransitionGroup
                                component="div"
                                transitionName="TabsAnimation"
                                transitionAppear={true}
                                transitionAppearTimeout={0}
                                transitionEnter={false}
                                transitionLeave={false}>
                                <Paper my={2} className='p-3 mb-4'>
                                    <Row>
                                        <Col lg='1'>
                                            <aside style={{
                                                position: 'sticky',
                                                top: '70px'
                                            }}>
                                                <small>Compartir</small>
                                                <Divider className='mt-1 mb-1' />
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

                                        <Col lg='11'>
                                            <Row>
                                                <Col lg='8'>

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
                                                    <small style={{ lineHeight: '0.002rem' }}>
                                                        {this.state.noticia.pieportada}
                                                    </small>
                                                </Col>
                                                <Col lg='4'>
                                                    <Grid
                                                        container
                                                        direction="row"
                                                        justify="space-between"
                                                        alignItems="flex-end"
                                                    >
                                                        <div className='mt-2 mb-2'>

                                                            <Chip size="small" label='' color='secondary' avatar={
                                                                this.state.noticia.tipo === 'audio' ? <VolumeUpIcon /> : this.state.noticia.tipo === 'video' ? <VideocamIcon /> : this.state.noticia.tipo === 'image' ? <PhotoLibraryIcon /> : <DescriptionIcon />
                                                            } />
                                                            {' '}
                                                            <Link to={'/noticias/' + (this.state.noticia.seccion + '').toLowerCase()}>
                                                                <Chip
                                                                    size='small'
                                                                    color='secondary'
                                                                    label={this.state.noticia.seccion}
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <Typography variant="caption" display="block" gutterBottom>
                                                                <AccessTimeIcon fontSize='small' />
                                                                {format(new Date(), 'dd MMMM yyyy', { locale: esLocale })}
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

                                                    <div>
                                                        <ListItem>
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

                                                            < AudioPlayer
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
                                                            <ReactPlayer
                                                                className='mb-3'
                                                                controls
                                                                light={false}
                                                                url={
                                                                    this.state.tipovideo === true ?
                                                                        this.state.video_url
                                                                        :
                                                                        this.state.video
                                                                }
                                                                //url={video}
                                                                width='100'
                                                                height='auto'
                                                            />
                                                    }




                                                    <div>{ReactHtmlParser(this.state.contenido)}</div>
                                                </Col>

                                                <Col lg='4'>
                                                    <aside style={{
                                                        position: 'sticky',
                                                        top: '70px'
                                                    }}>
                                                        <Typography variant='subtitle1' className='mb-2' style={{ fontWeight: 'bold' }}>Relacionados..</Typography>

                                                        <Paper className='p-1 mb-2 mt-2'>
                                                            <CardActionArea>
                                                                <CardMedia
                                                                    component='img'
                                                                    alt='portada'
                                                                    className='border rounded'
                                                                    src={portada}
                                                                />
                                                                <small>Representante Edward Rodríguez dice que no hizo fiesta en medio de cuarentena</small>
                                                            </CardActionArea>
                                                        </Paper>


                                                    </aside>
                                                </Col>

                                            </Row>
                                        </Col>
                                    </Row>
                                </Paper>
                            </ReactCSSTransitionGroup>

                            {/*}</Container>{*/}
                            <ScrollTop {...this.props}>
                                <Fab color="secondary" size="small" aria-label="scroll back to top">
                                    <KeyboardArrowUpIcon />
                                </Fab>
                            </ScrollTop>
                        </div>
                    </div>
                </div>

            </React.Fragment >

        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(DetailNotice);