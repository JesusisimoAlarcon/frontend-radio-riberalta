import React, { Component, Fragment } from 'react'
import { Card, CardBody, CardTitle } from 'reactstrap';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';

import 'react-vertical-timeline-component/style.min.css';
import avatar from '../../assets/utils/images/avatars/10.jpg';
import avatar2 from '../../assets/utils/images/avatars/5.jpg';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
//import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// Examples
const timelineElements = [


    <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="07:00 am - 09:00 am"
        iconStyle={{ background: 'rgb(233, 30, 255)', color: '#fff' }}
    >
        <h5 className="text-info"><i className={'pe-7s-radio mr-2'}> </i>EXITOS ROMANTICOS</h5>
        <img src={avatar} width="15%" className="rounded-circle" alt="" />
        <div className="widget-content-left">
            <div className="widget-heading">
                Luis Miguel Roca Balcazar
            </div>
            <div className="widget-subheading">
                <small><FacebookIcon />@roca</small>
                <small><TwitterIcon />@rocaluis</small>
                <small><WhatsAppIcon />75894449</small>
            </div>
        </div>
    </VerticalTimelineElement>,
    <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="07:00 am - 09:00 am"
        iconStyle={{ background: 'rgb(233, 30, 255)', color: '#fff' }}
    >
        <h5 className="text-info"><i className={'pe-7s-radio mr-2'}> </i>EXITOS ROMANTICOS</h5>
        <img src={avatar} width="15%" className="rounded-circle" alt="" />
        <div className="widget-content-left">
            <div className="widget-heading">
                Luis Miguel Roca Balcazar
            </div>
            <div className="widget-subheading">
                <small><FacebookIcon />@roca</small>
                <small><TwitterIcon />@rocaluis</small>
                <small><WhatsAppIcon />75894449</small>
            </div>
        </div>
    </VerticalTimelineElement>,
    <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="07:00 am - 09:00 am"
        iconStyle={{ background: 'rgb(233, 30, 255)', color: '#fff' }}
    >
        <h5 className="text-info"><i className={'pe-7s-radio mr-2'}> </i>EXITOS ROMANTICOS</h5>
        <img src={avatar} width="15%" className="rounded-circle" alt="" />
        <div className="widget-content-left">
            <div className="widget-heading">
                Luis Miguel Roca Balcazar
        </div>
            <div className="widget-subheading">
                <small><FacebookIcon />@roca</small>
                <small><TwitterIcon />@rocaluis</small>
                <small><WhatsAppIcon />75894449</small>
            </div>
        </div>
    </VerticalTimelineElement>,
    <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="07:00 am - 09:00 am"
        iconStyle={{ background: 'rgb(233, 30, 255)', color: '#fff' }}
    >
        <h5 className="text-info"><i className={'pe-7s-radio mr-2'}> </i>EXITOS ROMANTICOS</h5>
        <img src={avatar} width="15%" className="rounded-circle" alt="" />
        <div className="widget-content-left">
            <div className="widget-heading">
                Luis Miguel Roca Balcazar
            </div>
            <div className="widget-subheading">
                <small><FacebookIcon />@roca</small>
                <small><TwitterIcon />@rocaluis</small>
                <small><WhatsAppIcon />75894449</small>
            </div>
        </div>
    </VerticalTimelineElement>,
];

export default class Programacion extends Component {
    render() {
        return (
            <Fragment>
                <Card className="main-card mb-3 text-center" style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <CardBody>
                        <CardTitle className="text-white">ESTAS ESCUCHANDO...</CardTitle>

                        <h5 className="text-info"><i className={'pe-7s-radio mr-2'}> </i>EL TREN DE LA MAÑANA RIBERALTEÑA</h5>
                        <img src={avatar2} width="15%" className="rounded-circle" alt="" />
                        <div className="widget-content-left mb-2">
                            <div className="widget-heading text-white">
                                David Luis Roca
                            </div>
                            <div className="widget-subheading text-success">
                                <small><FacebookIcon />@roca</small>
                                <small><TwitterIcon />@rocaluis</small>
                                <small><WhatsAppIcon />75894449</small>
                            </div>
                        </div>

                        <CardTitle className="text-white mt-5">A CONTINUACION...</CardTitle>


                        <VerticalTimeline layout="1-column">{timelineElements}</VerticalTimeline>

                    </CardBody>
                </Card>
            </Fragment>
        )
    }
}
