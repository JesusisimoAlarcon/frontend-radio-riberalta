import { Route, Redirect } from 'react-router-dom';
import React, { Suspense, lazy, Fragment } from 'react';

import {
    ToastContainer,
} from 'react-toastify';
//import DetailNotice from '../../Components/Noticias/DetailNotice';
//import DetalleNoticia from '../../Components/Noticias/DetalleNoticia';
const DetailNotice = lazy(() => import('../../Components/Noticias/DetailNotice'));
const Noticias = lazy(() => import('../../Pages/Noticias'));
const Administracion = lazy(() => import('../../Pages/Admin'));
const Radio = lazy(() => import('../../Pages/Radio'));
//const DetalleNoticia = lazy(() => import('../../Components/Noticias/DetalleNoticia'))
//import moduleName from '../../Components/Noticias/DetalleNoticia'

const AppMain = () => {

    return (
        <Fragment>


            {/* Noticias */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Por favor espere mientras cargamos todos los ejemplos de Componentes
                            <small>Como se trata de una demostración, cargamos a la vez todos los ejemplos de componentes. ¡Esto no sucedería en una aplicación real en vivo!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/noticias" component={Noticias} />
            </Suspense>

            {/* Detalle noticias */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Por favor espere mientras cargamos todos los ejemplos de Componentes
                            <small>Como se trata de una demostración, cargamos a la vez todos los ejemplos de componentes. ¡Esto no sucedería en una aplicación real en vivo!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/noticia/:id/:titulo" component={DetailNotice} />
            </Suspense>


            {/* Radio Riberalta */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Por favor espere mientras cargamos todos los ejemplos de Componentes
                            <small>Como se trata de una demostración, cargamos a la vez todos los ejemplos de componentes. ¡Esto no sucedería en una aplicación real en vivo!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/nosotros" component={Radio} />
            </Suspense>


            {/* Administracion */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Por favor espere mientras cargamos todos los ejemplos de Componentes
                            <small>Como se trata de una demostración, cargamos a la vez todos los ejemplos de componentes. ¡Esto no sucedería en una aplicación real en vivo!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/administracion" component={Administracion} />
            </Suspense>





            <Route exact path="/" render={() => (
                <Redirect to="/noticias/riberalta" />
            )} />
            <ToastContainer />
        </Fragment>
    )
};

export default AppMain;