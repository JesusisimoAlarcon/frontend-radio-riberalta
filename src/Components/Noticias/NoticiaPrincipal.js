import React, { Component, Fragment } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import {
    Row, Col
} from 'reactstrap';
// Examples
//import imagen from '../../assets/test/test03.png'
import foto from '../../assets/test/test04.jpg'
import imagen from '../../assets/test/test05.jpg'
//test05.jpg

import IconButton from '@material-ui/core/IconButton'
import WhatsappIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwiterIcon from '@material-ui/icons/Twitter';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { Divider } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import VideocamIcon from '@material-ui/icons/Videocam';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { green, lightBlue, blue } from '@material-ui/core/colors';

export default class NoticiaPrincipal extends Component {
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
                        <CardActionArea>
                            <Row>
                                <Col lg='8'>

                                    <CardMedia
                                        component="img"
                                        alt="Contemplative Reptile"
                                        image={imagen}
                                        title="Contemplative Reptile"
                                        //style={{ width: 150, height: 150 }}
                                    />

                                </Col>
                                <Col lg='4'>
                                    <CardContent>
                                        <Typography variant="h5" component="h4">
                                            Reducen denuncias por abusos a menores durante cuarentena: ICBF
                                                </Typography>
                                        <div className='mt-2 mb-2'>
                                            <Chip size="small" label='' avatar={<VideocamIcon />} />
                                            {' '}
                                            <Chip
                                                size='small'
                                                label='POLITICA'
                                            />
                                        </div>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            La directora de la institución aseguró que el cierre de instituciones por el Covid-19 influye en la cifra.
                                                </Typography>
                                        <Divider className='m-1' />
                                        <Grid
                                            container
                                            direction="row"
                                            justify="space-between"
                                            alignItems="center"
                                        >
                                            <div>

                                                <Typography variant="caption" display="block" gutterBottom>
                                                    <AccessTimeIcon fontSize='small' /> Hace 3 min.
                                                        </Typography>
                                            </div>
                                            <div>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar src={foto} fontSize='small' />
                                                    </ListItemAvatar>
                                                    <ListItemText primary="Luis Roca" secondary="@Roca" />
                                                </ListItem>
                                            </div>
                                        </Grid>
                                    </CardContent>
                                </Col>
                            </Row>
                        </CardActionArea>
                        <CardActions>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                            >
                                <Badge color="secondary" badgeContent={20} anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right'
                                }}>
                                    <IconButton>
                                        <ThumbUpAltIcon fontSize='small' />
                                    </IconButton>

                                </Badge>
                                <div>
                                    <IconButton>
                                        <FacebookIcon style={{ color: blue[700] }} />
                                    </IconButton>
                                    <IconButton>
                                        <TwiterIcon style={{ color: lightBlue[500] }} />
                                    </IconButton>
                                    <IconButton>
                                        <WhatsappIcon style={{ color: green[500] }} />
                                    </IconButton>
                                </div>
                            </Grid>
                        </CardActions>
                    </Card>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
