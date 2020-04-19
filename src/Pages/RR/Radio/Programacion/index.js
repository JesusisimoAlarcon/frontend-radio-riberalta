import React, { Fragment } from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../../Layout/AppMain/PageTitle';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//import Programacion2 from '../../Programacion'



import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import './main.css';
import 'react-vertical-timeline-component/style.min.css';


import { Avatar, Grid, Typography } from '@material-ui/core';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
//import ContactlessIcon from '@material-ui/icons/Contactless';
import SettingsRemoteIcon from '@material-ui/icons/SettingsRemote';
import MenuBookIcon from '@material-ui/icons/MenuBook';


import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
//import Avatar from '@material-ui/core/Avatar';

import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';

import { connect } from 'react-redux';
import Axios from 'axios';

//import format from 'date-fns/format'
//import esLocale from 'date-fns/locale/es';
//import parse from 'date-fns/parse'
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
            programas: [],
            //hoy: format(new Date(), 'E', { locale: esLocale })
            hoy: new Date().getDay()
        }
        console.log(this.state.hoy)
        //const dia = format(new Date(), 'EEEE', { locale: esLocale });
        //console.log(dia)
        //console.log(this.state.hoy)
        //console.log(new Date().getDay())
    }

    componentDidMount = async () => {
        const resp = await Axios.get(this.props.API + 'programacion/detalle');
        this.setState({
            programas: resp.data
        })
    }

    render() {

        return (
            <Fragment>

                <PageTitle
                    heading="Nuestra programacion"
                    subheading="Puedes consultar nuestra programacion radial semanas con la informacion de todos nuestros programas."
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

                                    {this.state.programas.filter((p) => { return p.diasemana === tab }).map(programa =>
                                        <VerticalTimelineElement
                                            key={programa.idprogramacion}

                                            icon={
                                                programa.genero === 'NOTICIAS' ?
                                                    <MenuBookIcon fontSize='large' className='pe-spin' />
                                                    : programa.genero === 'MUSICA' ?
                                                        <MusicNoteIcon fontSize='large' className='pe-spin' />
                                                        :
                                                        <SettingsRemoteIcon fontSize='large' className='pe-spin' />
                                            }
                                            className="vertical-timeline-element--education"
                                            //contentStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                                            contentArrowStyle={{ borderRight: '7px solid  rgb(233, 30, 99)' }}
                                            date={<h5>{programa.horainicio + ' - ' + programa.horafin}</h5>}
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
                                                    <Typography variant='subtitle2'><b>Por:</b></Typography>
                                                </Grid>
                                                <Grid item>
                                                    <ListItem className='p-0'>
                                                        <ListItemAvatar className='mr-1'>
                                                            <Avatar variant="rounded" style={
                                                                {
                                                                    width: '100px',
                                                                    height: '100px'
                                                                }
                                                            } src={this.props.API + 'static/perfiles/' + programa.fotografia} />

                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={<Typography component='span' variant='subtitle1'>{programa.nombres + ' ' + programa.apellidos}</Typography>}
                                                            secondary={<span>
                                                                <FacebookIcon color='secondary' fontSize='small' />{programa.facebook}<br />
                                                                <TwitterIcon color='secondary' fontSize='small' />{programa.twiter}<br />
                                                                <WhatsAppIcon color='secondary' fontSize='small' />{programa.whatsapp}<br />
                                                            </span>}
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
    API: state.ThemeOptions.API_REST
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Programacion);