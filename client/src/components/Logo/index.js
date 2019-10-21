import React from "react";
import * as Styles from './styles';
import logo from '~/static/img/logo.png';


function Logo({width, height, margin}) {
    return (
        <Styles.Image margin={margin}>
            <img width={width} height={height} src={logo} alt="Assistant Relay Logo"/>
        </Styles.Image>
    )
}

export default Logo;