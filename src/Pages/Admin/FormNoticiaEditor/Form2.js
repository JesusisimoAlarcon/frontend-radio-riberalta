import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsappIcon from '@material-ui/icons/WhatsApp';

import Zoom from '@material-ui/core/Zoom';
import { Paper, CardMedia, Divider, Tooltip, Typography, CardActionArea, TextareaAutosize } from '@material-ui/core';
import { Row, Col } from 'reactstrap';
//import portada from '../../assets/utils/images/dropdown-header/abstract1.jpg'
import portada from '../../../assets/test/portada.png'
import { green } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import VideocamIcon from '@material-ui/icons/Videocam';
//import AccessTimeIcon from '@material-ui/icons/AccessTime';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import foto from '../../../assets/test/test04.jpg'
import Editor from './Editor';

import esLocale from 'date-fns/locale/es';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react';
//import Axios from 'axios';
const useStyles = makeStyles((theme) => ({
    retorno: {
        position: 'fixed',
        bottom: '1%',
        right: '45%'
    },
    title: {
        fontSize: '2.2rem',
        fontFamily: 'PlayfairDisplay-Bold',
        lineHeight: '2.4rem',
        fontWeight: 'bold'
    },
    subtitle: {
        marginTop: '10px',
        color: '#4a4a4a',
        fontFamily: 'LatoBold',
        fontSize: '1rem',
        lineHeight: '1.2rem',
    },

    customWidth: {
        widows: 70,
        textAlign: 'center'
    },
    fab: {
        position: 'sticky',
        top: '70px'
    },
    fabGreen: {
        color: theme.palette.common.white,
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[600],
        }
    }
}));

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
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
            <div onClick={handleClick} role="presentation" className={classes.retorno}>
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




//function FormNoticiaEditor(props, { API }) {
const FormNoticiaEditor = (props) => {

    //const [API, setApi] = useState('');
    //console.log(props.API)
    const [seccion, setSeccion] = useState('');
    const classes = useStyles();
    const [secciones, setSecciones] = useState([]);

    /*
        useEffect(() => {
            async function getseccion() {
                const resp = await (await Axios.get(props.API + 'seccion'))
                //console.log(resp)
                setSecciones(resp.data)
                //console.log(secciones)
            }
            getseccion();
        })
    */



    //const secciones = getSecciones;
    //console.log(secciones)



    const onChangeSeccion = (event) => {
        setSeccion(event.target.value)
    }
    return (
        < React.Fragment >
            <div id="back-to-top-anchor"></div>
            {/*}<Container fluid={false}>{*/}
            <Paper my={2} className='p-3 mb-2'>
                <Row>
                    <Col lg='1'>
                        <aside className={classes.fab}>
                            <small>Compartir</small>
                            <Divider className='mt-1 mb-1' />
                            <div className='m-1'>
                                <Tooltip title='Compartir por Facebook' placement='right-start'>
                                    <Fab size='small' className='m-1' >
                                        <FacebookIcon fontSize='small' />
                                    </Fab>
                                </Tooltip>
                                <Tooltip title='Compartir por Facebook' placement='right-start'>
                                    <Fab size='small' className='m-1' >
                                        <TwitterIcon fontSize='small' />
                                    </Fab>
                                </Tooltip>
                                <Tooltip title='Compartir por Facebook' placement='right-start'>
                                    <Fab size='small' className='m-1' >
                                        <WhatsappIcon fontSize='small' />
                                    </Fab>
                                </Tooltip>
                            </div>
                        </aside>
                    </Col>

                    <Col lg='11'>
                        <Row>
                            <Col lg='8'>
                                <CardMedia
                                    component='img'
                                    alt='portada'
                                    className='border rounded'
                                    src={portada}
                                />
                                <small style={{ lineHeight: '0.002rem' }}>
                                    Pedro Sánchez, presidente del Gobierno español. Fuente: AFP
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
                                        <Chip size="small" label='' avatar={<VideocamIcon />} />
                                        {' '}
                                    </div>
                                    <Select
                                        value={seccion}
                                        fontSize='small'
                                        onChange={onChangeSeccion}
                                    >
                                        {secciones.map(sec =>
                                            <MenuItem key={sec.idseccion} value={sec.idseccion}>{sec.seccion}</MenuItem>
                                        )}
                                    </Select>
                                    <div>

                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                                            <small>
                                                <DateTimePicker
                                                    //inputVariant="outlined"
                                                    autoOk
                                                    size='small'
                                                    ampm={false}
                                                    //className='form-control'
                                                    format="dd MMM yyyy HH:mm"
                                                    disableFuture
                                                //inputProps={{ 'aria-label': 'naked' }}
                                                //label="FECHA Y HORA"
                                                />
                                            </small>
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </Grid>


                                <TextareaAutosize
                                    className='form-control'
                                    style={{
                                        fontSize: '2.2rem',
                                        fontFamily: 'PlayfairDisplay-Bold',
                                        lineHeight: '2.4rem',
                                        fontWeight: 'bold'
                                    }}
                                    rowsMin={3}
                                    placeholder='Titulo de la noticia'
                                />

                                <TextareaAutosize
                                    className='form-control'
                                    style={{
                                        marginTop: '10px',
                                        color: '#4a4a4a',
                                        fontFamily: 'LatoBold',
                                        fontSize: '1rem',
                                        lineHeight: '1.2rem',
                                    }}
                                    rowsMin={3}
                                    placeholder='Subtitulo o resumen de la noticia'
                                />

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
                                <Editor />
                            </Col>

                            <Col lg='4'>
                                <aside className={classes.fab}>
                                    <Typography variant='subtitle1' className='mb-2' style={{ fontWeight: 'bold' }}>
                                        Relacionados..
                    </Typography>

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


            {/*}</Container>{*/}
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment >
    );
}

const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(FormNoticiaEditor);