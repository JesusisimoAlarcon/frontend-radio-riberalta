import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import MetisMenu from 'react-metismenu';
import { connect } from 'react-redux';
import Axios from 'axios';
class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secciones: ''
        }
    }
    componentDidMount() {
        this.getSecciones();
    }
    getSecciones = async () => {
        const secciones = await (await Axios.get(this.props.API + 'seccion/navs')).data;
        this.setState({ secciones })
    }
    render() {
        return (
            <Fragment>
                {this.state.secciones &&
                    <MetisMenu
                        //content={this.props.SECCIONES}
                        content={this.state.secciones}
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
    API: state.ThemeOptions.API_REST
});
const mapDispatchToProps = dispatch => ({});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));