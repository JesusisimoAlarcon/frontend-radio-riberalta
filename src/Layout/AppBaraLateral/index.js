import React, { Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';



import Hamburger from 'react-hamburgers';
//import Programacion from '../../Programacion';
//import Programacion from '../../Pages/Programacion'
/*
import {

    faTasks

} from '@fortawesome/free-solid-svg-icons';
*/
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const useStyles = makeStyles({
    list: {
        //width: window.screen.width,
        width: 300
    },
    fullList: {
        width: 'auto',
    },
});

export default function SwipeableTemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = anchor => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {/*}<Programacion />{*/}


        </div>
    );
    return (
        <Fragment>
            
            <Hamburger type='elastic' onClick={toggleDrawer('right', true)} />
            {/*}
            <FontAwesomeIcon size={'2x'} className="ml-2 mr-2" icon={faTasks} onClick={toggleDrawer('right', true)} />
            {*/}
            <SwipeableDrawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
                onOpen={toggleDrawer('right', true)}
            >

                {list('right')}
            </SwipeableDrawer>
        </Fragment>
    );
}
