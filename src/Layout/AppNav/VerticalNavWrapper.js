import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import MetisMenu from 'react-metismenu';
import { connect } from 'react-redux';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsappIcon from '@material-ui/icons/WhatsApp';
import Instagram from '@material-ui/icons/Instagram';
class Nav extends Component {
    render() {
        return (
            <Fragment>
                {this.props.SECCIONES &&
                    <MetisMenu
                        content={this.props.SECCIONES}
                        activeLinkFromLocation
                        className='vertical-nav-menu mt-3'
                        iconNamePrefix=''
                        classNameStateIcon='pe-7s-angle-down'
                    />

                }
                <center>
                    <div className='social-media mt-4'>
                        <a href='https://www.facebook.com/RadioRiberalta94.7Fm' rel='noopener noreferrer' target='_blank' className='text-light'>
                            <FacebookIcon color='secondary' className='mr-4' />
                        </a>
                        <a href='https://twitter.com/radio_riberalta' rel='noopener noreferrer' target='_blank' className='text-light'>
                            <TwitterIcon color='secondary' className='mr-4' />
                        </a>
                        
                        <a href='https://www.instagram.com/radioriberalta/' rel='noopener noreferrer' target='_blank' className='text-light'>
                            <Instagram color='secondary' className='mr-4' />
                        </a>
                        <a href='https://chat.whatsapp.com/F4kFEV4L2n8EYugK8EWFyu' rel='noopener noreferrer' target='_blank' className='text-light'>
                            <WhatsappIcon color='secondary' className='mr-4' />
                        </a>
                    </div>
                </center>
            </Fragment>
        );
    }
    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST,
    SECCIONES: state.ThemeOptions.secciones
});
const mapDispatchToProps = dispatch => ({});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));