import React from 'react';
import * as Styles from './styles.js';

import Card from '~/components/Card';
import Logo from '~/components/Logo';

function Setup({children}) {
    return (
        <Styles.Body>
            <Styles.Container>
                <Logo height={"100px"} width={"100px"} margin={"10px"}/>
                <Card>
                    {children}
                </Card>
            </Styles.Container>
        </Styles.Body>
    )
}
export default Setup;