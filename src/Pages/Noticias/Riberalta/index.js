import React, { Fragment } from 'react'

import PageTitle from '../../../Layout/AppMain/PageTitle';
import NoticiaPrincipal from '../../../Components/Noticias/NoticiaPrincipal'
//import MiniNoticia from '../../../Components/Noticias/MiniNoticia'
import NoticiaSuperpuesta from '../../../Components/Noticias/NoticiaSuperpuesta'
//import MiniNoticiaSuperpuesta from '../../../Components/Noticias/MiniNoticiaSuperpuesta'

import { Divider } from '@material-ui/core';
import { Row, Col } from 'reactstrap';
import NoticiaSecundaria from '../../../Components/Noticias/NoticiaSecundaria';

class Riberalta extends React.Component {

    render() {
        return (
            <Fragment>
                <PageTitle
                    heading="Noticias de Riberalta"
                    subheading="Noticas de ultima hora sobre la ciudad de Riberalta."
                    icon="pe-7s-add-user text-primary"
                />

                <NoticiaPrincipal />
                <NoticiaSecundaria/>
                <NoticiaSuperpuesta />
                <NoticiaSuperpuesta />
                <Divider className='m-3' />
                <NoticiaPrincipal />
                <Divider className='m-3' />
                <NoticiaSecundaria/>
                <Row>
                    <Col lg='4'>
                        <NoticiaSuperpuesta />
                    </Col>
                    <Col lg='4'>
                        <NoticiaSuperpuesta />
                    </Col>
                    <Col lg='4'>
                        <NoticiaSuperpuesta />
                    </Col>
                </Row>

                <Divider className='m-3' />
                <NoticiaPrincipal />
                <Divider className='m-3' />
            </Fragment>
        )
    }
}

export default Riberalta;