import React, { Fragment } from 'react';

import {
    DropdownToggle,
    ButtonDropdown,
    UncontrolledTooltip
} from 'reactstrap';



import PlayStream from './PlayStream';
import ProgramaActual from './ProgramaActual';
import BaraLateral from '../../AppBaraLateral';
class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };

    }

    render() {

        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <ButtonDropdown>
                                    
                                    <PlayStream />
                                    <ProgramaActual />
                                    <DropdownToggle color="link" className="p-0 ml-2 mr-2" id="Tooltip-2">    
                                        <BaraLateral/>
                                    </DropdownToggle>
                                    <UncontrolledTooltip className="tooltip-light" placement="bottom-start" target={'Tooltip-2'}>
                                        Consulta nuestra programacion para hoy : !
                                    </UncontrolledTooltip>
                                </ButtonDropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default UserBox;