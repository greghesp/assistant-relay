import React from "react";
import {Typography} from "antd";
import * as Styles from './styles';

const {Text, Paragraph, Title} = Typography;

function About(){
    return (
        <Styles.Container>
            <Styles.Text>
                <Title level={3}>About Assistant Relay</Title>
                <Paragraph>
                    <Text>
                        Assistant Relay is a Node.js server that exposes the Google Assistant as a REST API.
                        Send Assistant Relay any query you would send the Google Assistant SDK, and get a response back.
                    </Text>
                </Paragraph>
                <Paragraph>
                    <Text>
                        It also supports the Google Home Broadcast command so you can send audio notifications to your Google Home devices, without interrupting music.
                    </Text>
                </Paragraph>
                <Paragraph>
                    <Text strong>
                        Please Note:  Assistant Relay is restricted by the Google Assistant SDK.  Some commands are not supported.
                    </Text>
                </Paragraph>
                <Paragraph>
                    <Text>
                        Assistant Relay is not affiliated with Google or Google Assistant.
                    </Text>
                </Paragraph>

                <Title level={3}>License</Title>

                <Text>
                    Assistant Relay is distributed with the GNU General Public License v3.0
                </Text>

                <Title level={3}>Found an issue?</Title>
                <Paragraph>
                    <Text>
                        If you find an issue, you can check existing issues or submit a new issue here: <a href="https://github.com/greghesp/assistant-relay/issues" target="_blank">Github Issues</a>
                    </Text>
                </Paragraph>

                <Title level={3}>Want to buy me a coffee?</Title>
                <Text>Any donations are greatly appreciated, but certainly not required!</Text>
                <Styles.Form>
                        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                            <input type="hidden" name="cmd" value="_s-xclick" />
                            <input type="hidden" name="hosted_button_id" value="YK2LXAHNTSVLC" />
                            <input width="200" type="image" src="https://raw.githubusercontent.com/stefan-niedermann/paypal-donate-button/master/paypal-donate-button.png" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                            <img alt="" border="0" src="https://www.paypal.com/en_GB/i/scr/pixel.gif" width="1" height="1" />
                        </form>

                </Styles.Form>

            </Styles.Text>


        </Styles.Container>
    )
}

export default About;