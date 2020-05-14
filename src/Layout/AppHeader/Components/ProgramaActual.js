import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as moment from 'moment';
import Axios from 'axios';
import {
    setProgramacion,
    setProgramaactual,
    setHoydia
} from '../../../reducers/ThemeOptions';
class ProgramaActual extends Component {
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
            programacion: '',
            programaactual: '',
            hoy: new Date().getDay(),
            hoydia: ''

        }
        this.api = Axios.create({
            baseURL: this.props.API,
            onDownloadProgress: (e) => {
                if ((Math.round(e.loaded * 100) / e.total) === 100)
                    this.setState({ open: false })
                this.setState({
                    progreso: Math.round(e.loaded * 100) / e.total
                })
            }
        });
    }
    componentDidMount = async () => {
        this.setState({
            hoydia: this.state.diasTabs[this.state.hoy]
        })
        this.getProgramacion();
    }

    getProgramacion = async () => {
        const programacion = await (await this.api.get('programacion/detalle')).data;
        programacion.filter((p) => p.diasemana === this.state.hoydia && p.estado === 1).map(programa => {
            const horainicio = new Date(moment(programa.horainicio, 'HH:mm:ss'))
            const horafin = new Date(moment(programa.horafin, 'HH:mm:ss'))
            const horaactual = new Date().getTime();
            //console.log('hora actual: ' + horaactual + ' horaprogramada: ' + horainicio.getTime() + ' horaprogramada: ' + horafin.getTime())
            if (horaactual >= horainicio && horaactual < horafin) {
                //console.log("si")
                this.setState({ programaactual: programa })
                //this.state.programaactual = programa;
                programa.live = 1;
            }
            //console.log(horainicio)
            //programa.live = 1;
            return programa;
        })
        this.setState({ programacion })
        this.props.setHoydia(this.state.hoydia);
        this.props.setProgramaactual(this.state.programaactual);
        this.props.setProgramacion(this.state.programacion);
    }

    render() {
        return (
            <div className="ml-1 mr-2">
                <div className="widget-heading">
                    {this.state.programaactual && this.state.programaactual.programa}
                </div>
                <div className="widget-subheading">
                    <span>{this.state.programaactual && this.state.programaactual.nombres + ' ' + this.state.programaactual.apellidos}</span>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST,
    PROGRAMACION: state.ThemeOptions.programacion,
    PROGRAMAACTUAL: state.ThemeOptions.programaactual
});
const mapDispatchToProps = dispatch => ({
    setProgramacion: programacion => dispatch(setProgramacion(programacion)),
    setProgramaactual: programaactual => dispatch(setProgramaactual(programaactual)),
    setHoydia: hoydia => dispatch(setHoydia(hoydia))
});
export default connect(mapStateToProps, mapDispatchToProps)(ProgramaActual);