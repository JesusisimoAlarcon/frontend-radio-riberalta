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
import { Paper, Divider, Tooltip, Typography } from '@material-ui/core';
import { Row, Col } from 'reactstrap';
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
import Axios from 'axios';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DescriptionIcon from '@material-ui/icons/Description';
import { format } from 'date-fns';
import ReactHtmlParser from 'react-html-parser';
import ReactPlayer from 'react-player';
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
import MiniNoticiaVertical from './MiniNoticiaVertical';
import { formatDistanceStrict } from 'date-fns';
function ScrollTop(props) {
    const { children, window } = props;
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
    window: PropTypes.func,
};
class DetailNotice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.match.params.id,
            noticia: '',
            infografias: '',
            imagenes: '',
            contenido: '',
            audio: '',
            titleaudio: '',
            video: '',
            video_url: '',
            tipovideo: false,
            noticiasrelacionadas: ''
        }
    }

    componentDidMount = async () => {
        const noticia = await (await Axios.get(this.props.API + 'noticia/' + this.state.id)).data[0];
        this.setState({
            noticia
        })
        if (this.state.noticia.tipo === 'image') {
            const names = this.state.noticia.infografia.split(',');
            console.log(names.length)
            const titulos = this.state.noticia.infonombre.split(',');
            const imagenes = [];
            names.map((name, index) =>
                imagenes.push({
                    name,
                    titulo: titulos[index]
                })
            )
            imagenes.pop();
            console.log(imagenes);
            console.log(imagenes.length);
            this.setState({
                imagenes
            })
        }
        if (this.state.noticia.tipo === 'audio') {
            this.setState({
                audio: this.props.API + 'static/audio/' + this.state.noticia.infografia,
                titleaudio: this.state.noticia.infonombre
            })
        }
        if (this.state.noticia.tipo === 'video') {
            if (this.state.noticia.infotipo === 'video_url') {
                this.setState({
                    tipovideo: true,
                    video_url: this.state.noticia.infografia
                })
            }
            else {
                this.setState({
                    tipovideo: false,
                    video: this.props.API + 'static/video/' + this.state.noticia.infografia
                })
            }
        }

        let contenido_original = this.state.noticia.contenido;
        let contenido_modificado_inicio = contenido_original.replace(/<figure class="media"><oembed url=/gi, `<div class="embed-responsive embed-responsive-16by9 mb-4"><iframe class="embed-responsive-item" allowfullscreen src=`);
        let contenido_modificado_intermedio = contenido_modificado_inicio.replace(/oembed/gi, "iframe");
        let contenido_modificado_fin = contenido_modificado_intermedio.replace(/figure/gi, "div").replace(/youtu.be/gi, "www.youtube.com/embed");
        this.setState({
            contenido: contenido_modificado_fin
        })
        const anchor = document.querySelector('#back-to-top-anchor');
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
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
                        <Col xl='12' lg='12' className='p-0'>
                        </Col>
                        <Col xl='12' lg='12' md='12' sm='12' xs='12'>
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
                                                                this.props.API + 'static/portada/' + this.state.noticia.portada}
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
                                                            className='p-0 m-0'
                                                        >
                                                            <ListItemAvatar
                                                                className='p-0 m-0'
                                                            >
                                                                <Avatar src={this.props.API + 'static/perfiles/' + this.state.noticia.fotografia} variant="rounded" fontSize='small' />
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                className='p-0 m-0'
                                                                primary={this.state.noticia.nombres + ' ' + this.state.noticia.apellidos}
                                                                secondary={this.state.noticia.facebook ? <span><FacebookIcon color={'secondary'} fontSize='small' />{this.state.noticia.facebook}</span>
                                                                    : ''}
                                                            />
                                                        </ListItem>
                                                    </div>
                                                </Col>

                                            </Row>
                                            <Divider className='mt-2 mb-3' />
                                            <Row>
                                                <Col lg='8'>
                                                    {this.state.noticia.tipo !== 'nota' &&
                                                        <div style={{
                                                            fontSize: '1.3rem'
                                                        }}>{ReactHtmlParser(this.state.noticia.infocontenido)}</div>
                                                    }


                                                    {this.state.noticia.tipo === 'image' ?
                                                        this.state.imagenes.length > 0 &&
                                                        <Swiper
                                                            API={this.props.API}
                                                            imagenes={this.state.imagenes}
                                                        />
                                                        :
                                                        this.state.noticia.tipo === 'audio' ?
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
                                                                header={this.state.titleaudio.split('.')[0]}
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
                                                            />
                                                            :
                                                            this.state.noticia.tipo === 'video' ?
                                                                <div
                                                                    className='mb-3'
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
                                                                        
                                                                        url={
                                                                            this.state.tipovideo === true ?
                                                                                this.state.video_url
                                                                                :
                                                                                this.state.video
                                                                        }
                                                                        width='100%'
                                                                        height='100%'
                                                                    />
                                                                </div>
                                                                :
                                                                ''
                                                    }
                                                    <div style={{
                                                        fontSize: '1.3rem'
                                                    }}>
                                                        {ReactHtmlParser(this.state.contenido)}
                                                    </div>




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
                                                            label={<b>{etiqueta.charAt(0).toUpperCase() + etiqueta.toLowerCase().slice(1)}</b>}
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