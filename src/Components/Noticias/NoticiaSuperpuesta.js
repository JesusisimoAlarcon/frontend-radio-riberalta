import React, { Component } from 'react'
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap'
export default class NoticiaSuperpuesta extends Component {
    render() {
        return (
            <Card className="mb-3" inverse>
                <CardImg width="100%"
                    src="https://www.lafm.com.co/s3/files/styles/teaser_desktop_410x236/public/2020-03/celebridades.jpg?itok=WLEMYHNy"
                    alt="Card image cap" />
                <CardImgOverlay>
                    <CardTitle className="text-white">Card Title</CardTitle>
                                    This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.

                                        <small className="text-white">Last updated 3 mins ago</small>

                </CardImgOverlay>
            </Card>
        )
    }
}
