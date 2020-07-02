import React from "react";
import {Typography, Button} from 'antd';
import * as Styles from './styles'

const { Title, Paragraph, Text } = Typography;

function GetJson({next}) {
    return (
        <Styles.Container>
            <Title>Introduction</Title>
            <Paragraph>To get started with Assistant Relay, you first need to setup a project in the Google Console to integrate this.
                You will need to repeat these steps for every Google Account you want to add to Assistant Relay.
            </Paragraph>
            <Paragraph>
                <Text strong>Note: Make sure you are signed into the Google Account you want this to work with</Text>
            </Paragraph>

            <Title level={2}>Setup Steps</Title>
            <Paragraph>
                <ul>
                    <li>Follow <Text code><a href="https://developers.google.com/assistant/sdk/guides/service/python/embed/config-dev-project-and-account" target="_blank" rel="noopener noreferrer"> this guide</a></Text> and come back once Step 5 is complete</li>
                    <li>Now the Assistant API is enabled, click <Text code>Credentials</Text> in the left hand menu</li>
                    <li>On this page, select <Text code>Create Credentials</Text>, and choose <Text code>OAuth client ID</Text></li>
                    <li>Select <Text code>TVs and Limited Input devices</Text> as the application type and give it a name such as <Text code>Assistant Relay Client</Text>. Then click create</li>
                    <li>You'll get a popup, but just click OK to close this</li>
                    <li>Back on the Credentials page, click the download icon next to the new credential you made. Save it somewhere safe</li>
                    <li>Now click <Text code>Configure Consent Screen</Text></li>
                    <li>Give the application a name such as Assistant Relay, add an email under Support Email and click Save</li>
                </ul>
                Note: You can repeat these steps for each Google Account you wish to configure Assistant Relay for
            </Paragraph>

            <Styles.Steps>
                <Button type="primary" onClick={() => next()}>
                    Next
                </Button>
            </Styles.Steps>
        </Styles.Container>
    )
}

export default GetJson
