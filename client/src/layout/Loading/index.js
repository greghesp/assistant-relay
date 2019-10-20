import React from 'react';
import * as Styles from './styles.js';
import LoadingAnimation from '~/components/LoadingAnimation';

function Dashboard() {
    return (
        <Styles.Body>
            <Styles.Container>
                <LoadingAnimation/>
            </Styles.Container>
        </Styles.Body>
    )
}
export default Dashboard;