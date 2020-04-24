import React from 'react';
import './footer.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsappIcon from '@material-ui/icons/WhatsApp';
import Instagram from '@material-ui/icons/Instagram';
import { Button } from '@material-ui/core';
class AppFooter extends React.Component {
    render() {
        return (

            <footer className=''>
                <div className='container pt-5'>
                    <div className='row'>
                        <div className='col-sm-6 col-md-6 col-lg-4 mb-5'>
                            <div className='footer-title'>
                                <h6>Acerca de Nosotros</h6>
                            </div>
                            <div className='footer-content'>

                                <div className="app-header__logo">
                                    <div className="logo-src" />
                                </div>

                                <p>
                                    <small className='text-muted'>
                                        Aenean suscipit eget mi act fermentum phasellus vulputate
                                        turpis tincidunt. Aenean suscipit eget. Aenean suscipit eget
                                        mi act fermentum phasellus vulputate turpis tincidunt. Aenean
                                        suscipit ege Aenean suscipit eget mi act fermentum phasellus.
                </small>
                                </p>

                                <Button color='secondary' variant='contained' size='small'>Saber mas...</Button>
                            </div>
                        </div>
                        <div className='col-sm-6 col-md-6 col-lg-2 mb-5'>
                            <div className='footer-title'>
                                <h6>Secciones</h6>
                            </div>
                            <div className='footer-content'>
                                <ul className='list-group quick-links'>
                                    {this.props.SECCIONES.map(sec =>
                                        <li key={sec.id}>
                                            <Link to={`/RR/${sec.label.toLowerCase()}`}>
                                                {sec.label}
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className='col-sm-6 col-md-6 col-lg-2 mb-5'>
                            <div className='footer-title'>
                                <h6>Nuestra Radio</h6>
                            </div>
                            <div className='footer-content'>
                                <ul className='list-group quick-links'>
                                    <li>
                                        <Link to={`/RR/quienes-somos`}>
                                            QUIENES SOMOS?
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/RR/nuestros-servicios`}>
                                            NUESTROS SERVICIOS
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/RR/nuestra-programacion`}>
                                            PROGRAMACION RADIAL
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className='col-sm-6 col-md-6 col-lg-3 mb-5'>
                            <div className='footer-title'>
                                <h6>Contactanos</h6>
                            </div>
                            <div className='footer-content'>
                                <p className='text-muted'>
                                    <small>Direccion : Barrio El Periodista, Av. Nogal, Riberalta</small>
                                </p>
                                <p className='text-muted'>
                                    <small>Telefono : +591 75894449</small>
                                </p>
                                <p className='text-muted'>
                                    <small>E-mail : radioriberalta@hotmail.com</small>
                                </p>
                                <div className='social-media mt-4'>
                                    <a href='!#' className='text-light'>
                                        <FacebookIcon color='secondary' className='mr-4' />

                                    </a>
                                    <a href='!#' className='text-light'>
                                        <TwitterIcon color='secondary' className='mr-4' />

                                    </a>
                                    <a href='!#' className='text-light'>
                                        <Instagram color='secondary' className='mr-4' />

                                    </a>
                                    <a href='!#' className='text-light'>
                                        <WhatsappIcon color='secondary' className='mr-4' />

                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bottom-footer pt-3 pb-3 text-center'>
                    <small>© 2020 Radio Riberalta, todos los derechos reservados.</small>
                </div>
            </footer>

        )
    }
}
const mapStateToProps = state => ({
    //API: state.ThemeOptions.API_REST
    SECCIONES: state.ThemeOptions.secciones
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AppFooter);