import React, { Component } from 'react'
import { Fragment } from 'react'
import { Row, Col, CardTitle, CardBody, CardSubtitle, FormGroup, Label, FormText } from 'reactstrap'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { connect } from 'react-redux';
import Axios from 'axios';
import Card from '@material-ui/core/Card';
import esLocale from 'date-fns/locale/es';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import foto from '../../../assets/test/test04.jpg'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Dropzone from 'react-dropzone';
import Avatar from '@material-ui/core/Avatar';
//import DetalleNoticia from '../../../Components/Noticias/DetalleNoticia';
import { CardMedia, CardContent, Divider, List } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';
//import VideocamIcon from '@material-ui/icons/Videocam';
//import Chip from '@material-ui/core/Chip';


import IconButton from '@material-ui/core/IconButton'
import WhatsappIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwiterIcon from '@material-ui/icons/Twitter';
import Tooltip from '@material-ui/core/Tooltip';
import { green, lightBlue, blue } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';
class FormNoticia extends Component {

    constructor(props) {
        super(props)
        this.state = {
            infografias: [],
            config: {},
            titulo: '',
            subtitulo: '',
            contenido: '',
            fecha: new Date(),
            hora: '',
            value: 2,
            hover: -1,
            labels: {
                0.5: 'Normal',
                1: 'Useless+',
                1.5: 'Poor',
                2: 'Poor+',
                2.5: 'Ok',
                3: 'Ok+',
                3.5: 'Good',
                4: 'Good+',
                4.5: 'Excellent',
                5: 'Primera plana',
            }
        }

        this.onDrop = (infografias) => {
            this.setState({
                infografias: infografias
            })

        };

    }
    componentDidMount() {
        this.getConfig();
    }



    getConfig = async () => {
        const resp = await Axios.get(this.props.API + 'configuracion')
        this.setState({
            config: resp.data[0]
        })
        //console.log(this.state.config)
    }

    inputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    inputSelectFecha = (e) => {
        console.log(e.target.value)

    }

    render() {
        return (
            <Fragment>
                <Row>

                    <Col lg='2'>
                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>
                                    FORMULARIO DE CREACION DE NOTICIA</CardTitle>
                                <FormGroup>
                                    <Label for="inputtitulo">TITULO</Label>
                                    <TextareaAutosize
                                        name='titulo'
                                        id="inputtitulo"
                                        value={this.state.titulo}
                                        onChange={this.inputChange}
                                        className="form-control"
                                        maxLength={this.state.config.tam_titulo_noticia}
                                        rowsMin={1} />
                                    <FormText className='text-left'>
                                        Max. {this.state.config.tam_titulo_noticia} letras
                                        <b> [{this.state.titulo.length}]</b>
                                    </FormText>

                                </FormGroup>
                                <FormGroup>
                                    <Label for="inputsubtitulo">SUBTITULO</Label>
                                    <TextareaAutosize
                                        name='subtitulo'
                                        id="inputsubtitulo"
                                        value={this.state.subtitulo}
                                        onChange={this.inputChange}
                                        className="form-control"
                                        maxLength={this.state.config.tam_subtitulo_noticia}
                                        rowsMin={1} />
                                    <FormText className='text-left'>
                                        Max. {this.state.config.tam_subtitulo_noticia} letras
                                        <b> [{this.state.subtitulo.length}]</b>
                                    </FormText>
                                </FormGroup>



                                <FormGroup>
                                    <div>
                                        <Dropzone
                                            onDrop={this.onDrop}
                                            multiple={true}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <section className="container mt-4 mb-4 border border-primary rounded" >
                                                    <div {...getRootProps({ className: 'dropzone' })} className='mt-4 mb-4' >
                                                        <input {...getInputProps()} />
                                                        <p>Arrastre y suelte algunos archivos aquí, o haga clic para seleccionar archivos</p>
                                                    </div>
                                                </section>
                                            )}
                                        </Dropzone>
                                    </div>
                                </FormGroup>



                                <FormGroup>
                                    <center>
                                        <Rating
                                            name="hover-feedback"
                                            size="large"
                                            value={this.state.value}
                                            precision={0.5}
                                            onChange={(event, value) => {
                                                this.setState({
                                                    value
                                                })
                                            }}
                                            onChangeActive={(event, hover) => {
                                                this.setState({
                                                    hover
                                                })
                                            }}
                                        />
                                        {this.state.value !== null &&
                                            <Box ml={0}>
                                                {this.state.labels[this.state.hover !== -1 ? this.state.hover : this.state.value]}
                                            </Box>
                                        }
                                    </center>
                                </FormGroup>
                                <FormGroup>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                                        <KeyboardDateTimePicker
                                            inputVariant="outlined"
                                            autoOk
                                            ampm={false}
                                            className='form-control'
                                            format="dd/MM/yyyy HH:mm"
                                            disableFuture
                                            value={this.state.fecha}
                                            onChange={(fecha) => {
                                                this.setState({
                                                    fecha
                                                })
                                            }}
                                            label="FECHA Y HORA"
                                        />
                                    </MuiPickersUtilsProvider>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="inputcontenido">CONTENIDO</Label>
                                    <TextareaAutosize
                                        name='contenido'
                                        id="inputcontenido"
                                        value={this.state.contenido}
                                        onChange={this.inputChange}
                                        className="form-control"
                                        maxLength={this.state.config.tam_contenido_noticia}
                                        rowsMin={5} />
                                    <FormText className='text-left'>
                                        Max. {this.state.config.tam_contenido_noticia} letras
                                        <b> [{this.state.contenido.length}]</b>
                                    </FormText>
                                </FormGroup>
                            </CardBody>
                        </Card>
                    </Col>




                    <Col lg='10'>

                        <Card className='p-2'>
                            <Row>
                                <Col lg='1'>
                                    <aside style={{ position: 'absolute' }}>
                                        <small>Compartir</small>
                                        <Divider className='mt-2 mb-2' />
                                        <Tooltip title="Compartir en Facebook" placement="left-start">
                                            <IconButton size='medium' color='primary'>
                                                <FacebookIcon style={{ color: blue[700] }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Compartir en Twiter" placement="left-start">
                                            <IconButton>
                                                <TwiterIcon style={{ color: lightBlue[500] }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Compartir en WhatsApp" placement="left-start">
                                            <IconButton>
                                                <WhatsappIcon style={{ color: green[500] }} />
                                            </IconButton>
                                        </Tooltip>
                                    </aside>
                                </Col>
                                <Col lg='8'>
                                    <CardMedia
                                        component='img'
                                        alt='portada'
                                        src={this.state.infografias.length > 0 ? URL.createObjectURL(this.state.infografias[0]) : null}
                                    //style={{ width: 800, height: 450 }}
                                    />

                                </Col>

                                <Col lg='3'>
                                    <Grid
                                        container
                                        direction="column"
                                        justify="space-between"
                                        alignItems="flex-start"
                                    >


                                        <CardBody className='text-left'>

                                            <CardTitle>
                                                {this.state.titulo}
                                                <Typography variant="subtitle2" >
                                                    {this.state.titulo}
                                                </Typography>
                                            </CardTitle>
                                            <CardSubtitle>
                                                <Typography variant="subtitle2" component="h6">
                                                    {this.state.subtitulo}
                                                </Typography>
                                            </CardSubtitle>
                                        </CardBody>
                                        <List>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar src={foto} fontSize='small' className='align-self-end mr-3' />
                                                </ListItemAvatar>
                                                <ListItemText primary="Luis Roca" secondary="@Roca" />
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Col>
                            </Row>
                            <Divider className='m-3'></Divider>
                            <Row>
                                <Col lg='1'>
                                </Col>
                                <Col lg='8'>
                                    <CardContent>
                                        <Typography variant="body1" gutterBottom>
                                            {this.state.contenido}
                                        </Typography>
                                    </CardContent>


                                </Col>
                                <Col lg='3'></Col>
                            </Row>
                        </Card>


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
export default connect(mapStateToProps, mapDispatchToProps)(FormNoticia);