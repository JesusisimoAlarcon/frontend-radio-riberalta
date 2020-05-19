import React, { Fragment } from 'react';
import cx from 'classnames';
import { withRouter } from 'react-router-dom';
import {
    setEnableMobileMenuSmall
} from '../../../reducers/ThemeOptions';
import { connect } from 'react-redux';
class SearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSearch: false,
            focus: false,
            texto: ''
        };
    }

    render() {
        return (
            <Fragment>
                <div className={cx("search-wrapper", {
                    'active': this.state.activeSearch
                })}>
                    <div className="input-holder">
                        <form>
                            <input
                                style={{
                                    color: 'white'
                                }}
                                placeholder='Buscar'
                                onChange={(event) => this.setState({ texto: event.target.value })}
                                autoFocus={this.state.focus}
                                type="text"
                                className="search-input" />

                            <button onClick={
                                (e) => {
                                    e.preventDefault()
                                    if (this.state.activeSearch && this.state.texto.length > 0) {
                                        this.props.history.push({
                                            pathname: '/search/' + this.state.texto
                                        })
                                        this.props.setEnableMobileMenuSmall(!this.props.ENABLEMOBILEMENUSMALL)
                                    }
                                    this.setState({
                                        focus: !this.state.focus,
                                        activeSearch: !this.state.activeSearch
                                    })
                                }}
                                className="search-icon"><span />
                            </button>
                        </form>
                    </div>
                    <button onClick={
                        () => this.setState({
                            focus: !this.state.focus,
                            activeSearch: !this.state.activeSearch
                        })}
                        className="close" />
                </div>
            </Fragment >
        )
    }
}
const mapStateToProps = state => ({
    ENABLEMOBILEMENUSMALL: state.ThemeOptions.enableMobileMenuSmall
});
const mapDispatchToProps = dispatch => ({
    setEnableMobileMenuSmall: enableMobileMenuSmall => dispatch(setEnableMobileMenuSmall(enableMobileMenuSmall))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBox));