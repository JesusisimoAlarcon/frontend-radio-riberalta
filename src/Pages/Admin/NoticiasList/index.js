import React, { Component, Fragment } from 'react'
import Axios from 'axios';
import MaterialTable from 'material-table'
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import Chip from '@material-ui/core/Chip';
import VideocamIcon from '@material-ui/icons/Videocam';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DescriptionIcon from '@material-ui/icons/Description';
import Rating from '@material-ui/lab/Rating';
import Switch from '@material-ui/core/Switch';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PageTitle from '../../../Layout/AppMain/PageTitle';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import jwt from 'jsonwebtoken';
class ListNoticias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autor: jwt.decode(this.props.TOKEN).user.idconductor,
            noticias: [],
            tipos: {
                video: <VideocamIcon />,
                audio: <VolumeUpIcon />,
                nota: <DescriptionIcon />
            }
        }
        console.log(
            this.state.autor
        )
        this.tablaRef = React.createRef();
    }

    async componentDidMount() {
        const resp = await Axios.get(this.props.API + 'noticia/detalle/autor/' + this.state.autor);
        this.setState({
            noticias: resp.data
        })
    }

    render() {
        return (
            <Fragment>
                <PageTitle
                    heading="Lista de noticias registradas por su autoria"
                    subheading="Puede quitar alguna de ellas de la pagina principal de noticias actualizando su estado"
                    icon="pe-7s-radio text-primary"
                />
                <ReactCSSTransitionGroup
                    className='mb-4'
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <MaterialTable
                        title='Noticias registrados'
                        tableRef={this.tablaRef}
                        columns={[
                            {
                                title: 'PORTADA',
                                field: 'portada',
                                render: rowData =>
                                    <center>
                                        <Avatar
                                            variant="rounded"
                                            src={this.props.API + 'static/portadas/' + rowData.portada}
                                            style={{ width: 90, height: 90 }}
                                        />
                                    </center>
                            },
                            {
                                title: 'FECHA',
                                field: 'fecha',
                                render: rowData =>
                                    <div>
                                        <CalendarTodayIcon style={{ fontSize: 15 }} />{" "}<small>{format(new Date(rowData.fecha), 'dd MMMM yyyy', { locale: esLocale })}</small><br />
                                        <ScheduleIcon style={{ fontSize: 15 }} />{" "}<small>{rowData.hora}</small>
                                    </div>

                            },
                            {
                                title: 'PRIORIDAD',
                                field: 'prioridad',
                                render: rowData =>
                                    <div><Rating
                                        size="medium"
                                        readOnly
                                        value={rowData.prioridad}
                                        precision={0.5}
                                    /></div>
                            },
                            /*
                            {
                                title: 'TIPO',
                                field: 'tipo',
                                render: rowData => <div>{rowData.tipo === 'audio' ? <VolumeUpIcon /> : rowData.tipo === 'video' ? <VideocamIcon /> : <DescriptionIcon />}<Chip size="small" label={rowData.seccion} /></div>
                            },
                            */
                            {
                                title: 'SECCION',
                                field: 'seccion',
                                render: rowData =>
                                    <Chip size="small" label={rowData.seccion} avatar={rowData.tipo === 'audio' ? <VolumeUpIcon /> : rowData.tipo === 'video' ? <VideocamIcon /> : <DescriptionIcon />} />
                            },
                            {
                                title: 'TITULO',
                                field: 'titulo',
                                render: rowData =>
                                    <small>{rowData.titulo}</small>
                            },
                            {
                                title: 'SUBTITULO',
                                field: 'subtitulo',
                                render: rowData =>
                                    <small>{rowData.subtitulo}</small>
                            },
                            /*
                            {
                                title: 'AUTOR',
                                field: 'autor',
                                render: rowData =>
                                    <div>
                                        <Avatar
                                            src={this.props.API + 'static/perfiles/' + rowData.fotografia}
                                            style={{ width: 40, height: 40 }}
                                        />
                                        <small>{rowData.nombres}</small><br />
                                        <small>{rowData.apellidos}</small>
                                    </div>
                            },
                            */
                            {
                                title: 'ESTADO',
                                field: 'estado',
                                render: rowData =>
                                    <div>
                                        <Switch
                                            checked={rowData.estado === 1 ? true : false}
                                        />
                                    </div>
                            }
                        ]}
                        data={this.state.noticias}
                        options={{
                            paging: false,
                            headerStyle: {
                                //backgroundColor: '#01579b',
                                //color: '#FFF',
                                textAlign: 'center'
                            }
                        }}

                    />
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST,
    TOKEN: state.ThemeOptions.token
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ListNoticias);