import React from "react";
import * as Styles from './styles';

function Card({children, margin}) {
    return (
        <Styles.Card margin={margin}>
            {children}
        </Styles.Card>
    )
}

export default Card;