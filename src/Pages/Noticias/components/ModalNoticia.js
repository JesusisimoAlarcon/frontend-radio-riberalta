import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, CardImg, CardTitle } from 'reactstrap';
import imagen from '../imgtest/test01.jfif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
class ModalNoticia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true
    };

    this.toggle = this.toggle.bind(this);
    this.changeBackdrop = this.changeBackdrop.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  changeBackdrop(e) {
    let value = e.target.value;
    if (value !== 'static') {
      value = JSON.parse(value);
    }
    this.setState({ backdrop: value });
  }

  render() {
    return (
      <span className="d-inline-block mb-2 mr-2">
        <Button size="md" className="text-primary" color="link" onClick={this.toggle}>Ver articulo completo...</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={this.state.backdrop}>
          <ModalHeader toggle={this.toggle}>
            <CardTitle>MINISTRO DE GOBIERNO AMENAZA CON ESTADO DE SITIO</CardTitle>

          </ModalHeader>
          <ModalBody>
            <div className="badge badge-pill badge-info mr-1">
              <FontAwesomeIcon icon={faVolumeUp} size={'1x'} />
            </div>
            <div className="badge badge-pill badge-info">politica</div>
            <div className="badge badge-pill badge-info">politica</div>
            <CardImg width="100%" src={imagen} className="mb-3 mt-3" />
            <p>En cumplimiento al Decreto Supremo N° 4199 emitido por el Estado Boliviano, mismo que va vinculado con la seguridad interna, el Comando de la Guarnición de Riberalta en coordinación con el Comando Policial Amazónico y el En cumplimiento al Decreto Supremo N° 4199 emitido por el Estado Boliviano, mismo que va vinculado con la seguridad interna, el Comando de la Guarnición de Riberalta en coordinación con el Comando Policial Amazónico y elEn cumplimiento al Decreto Supremo N° 4199 emitido por el Estado Boliviano, mismo que va vinculado con la seguridad interna, el Comando de la Guarnición de Riberalta en coordinación con el Comando Policial Amazónico y elEn cumplimiento al Decreto Supremo N° 4199 emitido por el Estado Boliviano, mismo que va vinculado con la seguridad interna, el Comando de la Guarnición de Riberalta en coordinación con el Comando Policial Amazónico y elEn cumplimiento al Decreto Supremo N° 4199 emitido por el Estado Boliviano, mismo que va vinculado con la seguridad interna, el Comando de la Guarnición de Riberalta en coordinación con el Comando Policial Amazónico y elEn cumplimiento al Decreto Supremo N° 4199 emitido por el Estado Boliviano, mismo que va vinculado con la seguridad interna, el Comando de la Guarnición de Riberalta en coordinación con el Comando Policial Amazónico y elEn cumplimiento al Decreto Supremo N° 4199 emitido por el Estado Boliviano, mismo que va vinculado con la seguridad interna, el Comando de la Guarnición de Riberalta en coordinación con el Comando Policial Amazónico y elEn cumplimiento al Decreto Supremo N° 4199 emitido por el Estado Boliviano, mismo que va vinculado con la seguridad interna, el Comando de la Guarnición de Riberalta en coordinación con el Comando Policial Amazónico y elEn cumplimiento al Decreto Supremo N° 4199 emitido por el Estado Boliviano, mismo que va vinculado con la seguridad interna, el Comando de la Guarnición de Riberalta en coordinación con el Comando Policial Amazónico y elEn cumplimiento al Decreto Supremo N° 4199 emitido por el Estado Boliviano, mismo que va vinculado con la seguridad interna, el Comando de la Guarnición de Riberalta en coordinación con el Comando Policial Amazónico y elEn cumplimiento al Decreto Supremo N° 4199 emitido por el Estado Boliviano, mismo que va vinculado con la seguridad interna, el Comando de la Guarnición de Riberalta en coordinación con el Comando Policial Amazónico y elEn cumplimiento al Decreto Supremo N° 4199 emitido por el Estado Boliviano, mismo que va vinculado con la seguridad interna, el Comando de la Guarnición de Riberalta en coordinación con el Comando Policial Amazónico y el</p>
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={this.toggle}>Cancel</Button>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}

export default ModalNoticia;
