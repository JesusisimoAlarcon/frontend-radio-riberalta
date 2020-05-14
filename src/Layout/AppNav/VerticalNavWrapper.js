import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import MetisMenu from 'react-metismenu';
import { connect } from 'react-redux';
class Nav extends Component {
    render() {
        return (
            <Fragment>
                {this.props.SECCIONES &&
                    <MetisMenu
                        content={this.props.SECCIONES}
                        //content={this.state.secciones}
                        activeLinkFromLocation
                        className='vertical-nav-menu mt-3'
                        iconNamePrefix=''
                        classNameStateIcon='pe-7s-angle-down'
                    />
                }
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