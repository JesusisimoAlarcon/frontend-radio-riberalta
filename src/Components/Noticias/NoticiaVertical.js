import React, { Component, Fragment } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from "react-router-dom"

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
class NoticiaVertical extends Component {

    state = {
        link: this.props.idnoticia + '/' + (this.props.titulo.replace(/[ ]/gi, '-'))
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

                    <Card className='mb-3' elevation={0}>

                        <CardActionArea
                        >


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

                            <CardContent>

                                <Typography variant='h1' style={{
                                    fontSize: '2.2rem',
                                    fontFamily: 'PlayfairDisplay-Bold',
                                    lineHeight: '2.4rem',
                                    fontWeight: 'bold'
                                }}>
                                    <Link to={this.state.link}>{this.props.titulo}</Link>
                                </Typography>

                                <div className='mt-2 mb-2'>


                                    <Chip size="small" label='' color='secondary' className='mr-1' avatar={
                                        this.props.tipo === 'audio' ?
                                            <VolumeUpIcon style={{
                                                background: '#f50057',
                                                padding: '0'
                                            }} /> : this.props.tipo === 'video' ?
                                                <VideocamIcon style={{
                                                    background: '#f50057',
                                                    padding: '0'
                                                }} /> : this.props.tipo === 'image' ?
                                                    <PhotoLibraryIcon style={{
                                                        background: '#f50057',
                                                        padding: '0'
                                                    }} /> :
                                                    <DescriptionIcon style={{
                                                        background: '#f50057',
                                                        padding: '0'
                                                    }} />
                                    } />

                                    <Chip
                                        size='small'
                                        color='secondary'
                                        label={
                                            <Link to={'/RR/' + (this.props.seccion + '').toLowerCase()} style={{
                                                color: 'white',
                                                fontWeight: 'bold'
                                            }}>{this.props.seccion}</Link>
                                        }
                                    />

                                </div>

                                <Typography variant='subtitle1' style={{
                                    marginTop: '10px',
                                    color: '#4a4a4a',
                                    fontFamily: 'LatoBold',
                                    fontSize: '1rem',
                                    lineHeight: '1.2rem',
                                }}>
                                    <Link to={this.state.link}>{this.props.subtitulo}</Link>
                                </Typography>
                                <Divider className='m-1' />
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="flex-end"

                                >
                                    <div>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            <AccessTimeIcon color='secondary' fontSize='small' /> {this.props.tiempo}
                                        </Typography>
                                    </div>
                                    <div>

                                        <Typography variant="caption" display="block" color='secondary' gutterBottom>
                                            <Link to={this.state.link}>Leer mas..</Link>
                                        </Typography>

                                    </div>
                                </Grid>
                            </CardContent>

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
export default connect(mapStateToProps, mapDispatchToProps)(NoticiaVertical);