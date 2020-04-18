import React, { Component, Fragment } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from "react-router-dom"

import {
    Row, Col
} from 'reactstrap';
// Examples
//import imagen from '../../assets/test/test03.png'
//import foto from '../../assets/test/test04.jpg'
//import imagen from '../../assets/test/test05.jpg'
//test05.jpg


import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

import Chip from '@material-ui/core/Chip';

import { Divider } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import DescriptionIcon from '@material-ui/icons/Description';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { connect } from 'react-redux';

import Image from 'material-ui-image'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
class NoticiaSecundaria extends Component {

    state = {
        link: '/noticia/' + this.props.idnoticia + '/' + (this.props.titulo.replace(/[ ]/gi, '-'))
    }

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

                    <Card className='mb-3'>

                        <CardActionArea
                        >
                            <Row>
                                <Col lg='8'>
                                    <Link to={{
                                        pathname: this.state.link,
                                        state: {
                                            idnoticia: this.props.idnoticia,
                                            noticia: this.props.noticia
                                        },
                                    }}>
                                        <Image
                                            className='border rounded'
                                            //animationDuration={5000}
                                            //loading={<CircularProgress size={48} />}
                                            aspectRatio={(16 / 9)}
                                            src={this.props.API + 'static/portadas/' + this.props.portada}
                                        />
                                    </Link>
                                </Col>
                                <Col lg='4'>
                                    <CardContent>
                                        <Link to={this.state.link}>
                                            <Typography variant='h1' style={{
                                                fontSize: '2.2rem',
                                                fontFamily: 'PlayfairDisplay-Bold',
                                                lineHeight: '2.4rem',
                                                fontWeight: 'bold'
                                            }}>
                                                {this.props.titulo}
                                            </Typography>
                                        </Link>
                                        <div className='mt-2 mb-2'>
                                            <Chip size="small" label='' avatar={
                                                this.props.tipo === 'audio' ? <VolumeUpIcon /> : this.props.tipo === 'video' ? <VideocamIcon /> : this.props.tipo === 'image' ? <PhotoLibraryIcon /> : <DescriptionIcon />
                                            } />
                                            {' '}
                                            <Link to={'/noticias/' + this.props.seccion.toLowerCase()}>
                                                <Chip
                                                    size='small'
                                                    label={this.props.seccion}
                                                />
                                            </Link>
                                        </div>
                                        <Link to={this.state.link}>
                                            <Typography variant='subtitle1' style={{
                                                marginTop: '10px',
                                                color: '#4a4a4a',
                                                fontFamily: 'LatoBold',
                                                fontSize: '1rem',
                                                lineHeight: '1.2rem',
                                            }}>
                                                {this.props.subtitulo}
                                            </Typography>
                                        </Link>
                                        <Divider className='m-1' />
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="flex-end"

                                        >
                                            <div>

                                                <Typography variant="caption" display="block" gutterBottom>
                                                    <AccessTimeIcon fontSize='small' /> {this.props.tiempo}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Link to={this.state.link}>
                                                    <Typography variant="caption" display="block" gutterBottom>Leer mas..</Typography>
                                                </Link>
                                            </div>
                                        </Grid>
                                    </CardContent>
                                </Col>
                            </Row>
                        </CardActionArea>

                    </Card>

                </ReactCSSTransitionGroup>
            </Fragment >
        )
    }
}
const mapStateToProps = state => ({
    API: state.ThemeOptions.API_REST
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(NoticiaSecundaria);