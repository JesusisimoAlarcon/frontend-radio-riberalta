import React, { Component, Fragment } from 'react'
import {
    Card, CardImg, CardBody,
    CardTitle, CardFooter
} from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import imagen from '../imgtest/test01.jfif'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import ModalNoticia from './ModalNoticia';
export default class Noticia extends Component {
    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>

                    <Card className="main-card mb-3">
                        <CardImg top width="100%" src={imagen} />
                        <CardBody>
                            <CardTitle>MINISTRO DE GOBIERNO AMENAZA CON ESTADO DE SITIO</CardTitle>
                            <div className="badge badge-pill badge-info mr-1">
                                <FontAwesomeIcon icon={faVolumeUp} size={'1x'} />
                            </div>
                            {/*}
                            <FontAwesomeIcon icon={faVideo} size={'1x'} />
                            <FontAwesomeIcon icon={faVolumeUp} size={'1x'} />
                            {*/}
                            <div className="badge badge-pill badge-info">politica</div>
                            <div className="divider" />
                            <p>En cumplimiento al Decreto Supremo N° 4199 emitido por el Estado Boliviano, mismo que va vinculado con la seguridad interna, el Comando de la Guarnición de Riberalta en coordinación con el Comando Policial Amazónico y el </p>


                        </CardBody>
                        
                        <CardFooter>
                            <div>
                                <small className="text-muted"><FontAwesomeIcon icon={faClock} /> Hace 3 min</small>
                            </div>
                            <div className="ml-auto">
                                
                                <ModalNoticia/>
                            </div>
                        </CardFooter>
                    </Card>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
