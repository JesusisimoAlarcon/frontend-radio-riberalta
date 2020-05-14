import React, { Fragment } from 'react';
import Tabs from 'react-responsive-tabs';
import PageTitle from '../../../../Layout/AppMain/PageTitle';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import './main.css';
import 'react-vertical-timeline-component/style.min.css';
import { Avatar, Grid, Typography } from '@material-ui/core';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import AlbumIcon from '@material-ui/icons/Album';
import * as moment from 'moment';
import format from 'date-fns/format';
class Programacion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diasTabs: [
                'Domingo',
                'Lunes',
                'Martes',
                'Miercoles',
                'Jueves',
                'Viernes',
                'Sabado'
            ],
            programas: this.props.PROGRAMACION,
            //hoy: format(new Date(), 'E', { locale: esLocale })
            hoy: new Date().getDay()
            //hoydia: ''
        }

        const anchor = document.querySelector('#back-to-top-anchor');
        //console.log(anchor)
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        //console.log(this.state.hoy)
        //const dia = format(new Date(), 'EEEE', { locale: esLocale });
        //console.log(dia)
        //console.log(this.state.hoy)
        //console.log(new Date().getDay())
    }

    componentDidMount = async () => {
        //const resp = await Axios.get(this.props.API + 'programacion/detalle');
        this.setState({
            //programas: resp.data,
            hoydia: this.state.diasTabs[this.state.hoy]

        })
        //this.encontrar_live();
        //this.actualizar_programacion();
    }

    /*
    
        encontrar_live = () => {
            //console.log(this.state.programas)
            this.state.programas.filter((p) => {
                return (p.diasemana === this.state.hoydia && p.estado === 1)
            }).map(programa => {
    
                const horainicio = new Date(moment(programa.horainicio, 'HH:mm:ss'))
                const horafin = new Date(moment(programa.horafin, 'HH:mm:ss'))
    
                const horaactual = new Date().getTime();
                //console.log('hora actual: ' + horaactual + ' horaprogramada: ' + horainicio.getTime() + ' horaprogramada: ' + horafin.getTime())
    
                if (horaactual >= horainicio && horaactual < horafin) {
                    //console.log("si")
                    programa.live = 1;
                }
    
                //console.log(horainicio)
                //programa.live = 1;
                return programa;
            })
            //console.log(this.state.programas)
        }
    */
    render() {
        return (
            <Fragment>
                <div id="back-to-top-anchor"></div>
                <PageTitle
                    heading="Nuestra programacion"
                    subheading="Consulta nuestra programacio radial en vivo, musica, noticias, entrevistas y enlaces satelitales desde Riberalta para el Mundo Entero."
                    icon="pe-7s-radio icon-gradient bg-amy-crisp"
                />

                <Tabs
                    tabsWrapperClass="body-tabs body-tabs-layout"
                    transform={true}
                    selectedTabKey={this.state.hoy}

                    width={'800px'}
                    showInkBar={true}
                    items={this.state.diasTabs.map((tab, index) => ({
                        key: index,
                        title: tab,
                        getContent: () =>
                            <ReactCSSTransitionGroup

                                component="div"
                                transitionName="TabsAnimation"
                                transitionAppear={true}
                                transitionAppearTimeout={0}
                                transitionEnter={false}
                                transitionLeave={false}>

                                <VerticalTimeline>

                                    {this.state.programas.filter((p) => { return (p.diasemana === tab) }).map(programa =>
                                        <VerticalTimelineElement
                                            key={programa.idprogramacion}

                                            icon={
                                                programa.genero === 'NOTICIAS' ?
                                                    <MenuBookIcon fontSize='large' className={programa.live ? 'pe-spin' : ''} />
                                                    : programa.genero === 'MUSICA' ?
                                                        <MusicNoteIcon fontSize='large' className={programa.live ? 'pe-spin' : ''} />
                                                        :
                                                        <SettingsRemoteIcon fontSize='large' className={programa.live ? 'pe-spin' : ''} />
                                            }
                                            className="vertical-timeline-element--education"

                                            contentStyle={
                                                programa.live ?
                                                    {
                                                        background: 'rgb(233, 30, 99)', color: '#fff'
                                                    }
                                                    : {}
                                            }
                                            contentArrowStyle={{ borderRight: '7px solid  rgb(233, 30, 99)' }}
                                            date={<h5><b>
                                                {programa.live ?
                                                    <Chip color="secondary" size='small' icon={<AlbumIcon />} label='en vivo' />
                                                    : ''
                                                }
                                                {" " + format(new Date(moment(programa.horainicio, 'hh:mm:ss')), 'HH:mm') + ' - ' + format(new Date(moment(programa.horafin, 'HH:mm:ss')), 'HH:mm')}</b></h5>}
                                            iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                                        >
                                            <Grid
                                                container
                                                direction="column"
                                                spacing={0}
                                                justify="flex-start"
                                                alignItems="flex-start"
                                            >
                                                <Grid item>
                                                    <Typography variant='h4'>
                                                        <b>{programa.programa}</b>
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant='subtitle2'><b>Con:</b></Typography>
                                                </Grid>
                                                <Grid item>
                                                    <ListItem className='p-0'>
                                                        <ListItemAvatar className='mr-2'>
                                                            <Avatar variant="rounded" style={
                                                                {
                                                                    width: '120px',
                                                                    height: '120px'
                                                                }
                                                            } src={this.props.API + 'static/perfiles/' + programa.fotografia} />

                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={<Typography component='span' variant='subtitle1'>{programa.nombres + ' ' + programa.apellidos}</Typography>}
                                                            secondary={
                                                                <Typography component='span' variant='subtitle1'>
                                                                    {programa.facebook ?
                                                                        <span><br /><FacebookIcon color={programa.live ? 'inherit' : 'secondary'} fontSize='small' />{programa.facebook}<br /></span>
                                                                        : ''
                                                                    }
                                                                    {programa.twiter ?
                                                                        <span><TwitterIcon color={programa.live ? 'inherit' : 'secondary'} fontSize='small' />{programa.twiter}<br /></span>
                                                                        : ''
                                                                    }
                                                                    {programa.whatsapp ?
                                                                        <span><WhatsAppIcon color={programa.live ? 'inherit' : 'secondary'} fontSize='small' />{programa.whatsapp}</span>
                                                                        : ''
                                                                    }
                                                                </Typography>
                                                            }
                                                        />
                                                    </ListItem>

                                                </Grid>
                                            </Grid>
                                        </VerticalTimelineElement>
                                    )}
                                </VerticalTimeline>
                            </ReactCSSTransitionGroup>


                    }))} />

            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST,
    PROGRAMACION: state.ThemeOptions.programacion
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Programacion);