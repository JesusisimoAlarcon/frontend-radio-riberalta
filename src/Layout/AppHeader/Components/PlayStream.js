import React, { Component, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
export default class PlayStream extends Component {
    render() {
        return (
            <Fragment>
                <FontAwesomeIcon icon={faPlayCircle} size='3x' color={"white"} />
                <audio name="media">
                    <source src="http://stm10.miradio.com.es:10544/stream/1/" type="audio/mpeg"></source>
                </audio>
            </Fragment>
        )
    }
}
