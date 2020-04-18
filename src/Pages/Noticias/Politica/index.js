import React, { Fragment } from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import './main.css';
import 'react-vertical-timeline-component/style.min.css';
import {
    Row, Col
} from 'reactstrap';

import { Avatar, Grid, Typography } from '@material-ui/core';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
//import ContactlessIcon from '@material-ui/icons/Contactless';



import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
//import Avatar from '@material-ui/core/Avatar';
import foto from '../../../assets/test/test04.jpg';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TwitterIcon from '@material-ui/icons/Twitter';



const timelineElements = [
    <VerticalTimelineElement
        key={4}
        icon={<MusicNoteIcon fontSize='large' />}
        className="vertical-timeline-element--education"
        //contentStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  rgb(233, 30, 99)' }}
        date="12:30 - 13:30"
        iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}

    >
        <Grid
            container
            direction="column"
            spacing={0}
            justify="flex-start"
            alignItems="flex-start"
        >
            <Grid item>
                <Typography variant='h4'>
                    El tren de la mañana
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant='subtitle2'>
                    Por:
                </Typography>
            </Grid>
            <Grid item>
                <ListItem>
                    <ListItemAvatar className='mr-3'>
                        <Avatar variant="rounded" style={
                            {
                                width: '150px',
                                height: '150px'
                            }
                        } src={foto} />

                    </ListItemAvatar>
                    <ListItemText
                        primary={<Typography variant='subtitle1'>Luis Miguel Roca</Typography>}
                        secondary={<div>
                            <FacebookIcon />Luis Miguel<br />
                            <TwitterIcon />Luisito<br />
                            <WhatsAppIcon />+59178596589<br />
                        </div>}
                    />
                </ListItem>

            </Grid>
        </Grid>
    </VerticalTimelineElement>
];
class Politica extends React.Component {

    render() {
        return (
            <Fragment>
                <div>
                    <Row>
                        <Col className="container">
                            <VerticalTimeline>{timelineElements}</VerticalTimeline>
                        </Col>
                    </Row>
                </div>
            </Fragment>
        )
    }
}

export default Politica;