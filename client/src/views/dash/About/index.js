import React, {useEffect, useState} from "react";
import {message, Typography, Alert, Radio} from "antd";
import {post, get} from '~/helpers/api';

import * as Styles from './styles';

const {Text, Paragraph, Title} = Typography;

function About(){
    const [isUpdate, setIsUpdate] = useState(false);
    const [v, setV] = useState(null);
    const [releaseChannel, setRC] = useState(null);

    useEffect(() => {
        checkUpdate();
    },[]);

    async function checkUpdate() {
        try {
            const resp = await post({}, 'checkUpdate');
            const v = await get({}, 'version');
            const c = await get({}, 'releaseChannel');
            setIsUpdate(resp.data);
            setV(v.data.version);
            setRC(c.data.releaseChannel);
        } catch (e) {
            message.error(e.message);
        }
    }

    async function updateChannel(e){
        try {
            const channel = e.target.value;
            await post({channel}, 'changeChannel')
        } catch (e) {
            message.error(e.message);
        }
    }

    return (
        <Styles.Container>
            <div>
                <AlertBox update={isUpdate}/>
                <Styles.Title>About Assistant Relay</Styles.Title>

                <p>Assistant Relay is a Node.js server that exposes the Google Assistant as a REST API.
                    Send Assistant Relay any query you would send the Google Assistant SDK, and get a response back.</p>
                <p>It also supports the Google Home Broadcast command so you can send audio notifications to your Google Home devices, without interrupting music.                </p>
                <p>Please Note:  Assistant Relay is restricted by the Google Assistant SDK.  Some commands are not supported.</p>
                <p>Assistant Relay is not affiliated with Google or Google Assistant.</p>

                <Styles.Title>Found an issue?</Styles.Title>
                <p>If you find an issue, you can check existing issues or submit a new issue here: <a href="https://github.com/greghesp/assistant-relay/issues" target="_blank">Github Issues</a></p>


                <Styles.Title>Want to buy me a coffee?</Styles.Title>
                <p>Any donations are greatly appreciated, but certainly not required!</p>
                <div>
                    <a href='https://ko-fi.com/O5O41SUX6' target='_blank'>
                        <img height='36'  src='https://cdn.ko-fi.com/cdn/kofi1.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' />
                    </a>
                </div>
                <Styles.Form>
                    <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank">
                        <input type="hidden" name="cmd" value="_s-xclick" />
                        <input type="hidden" name="hosted_button_id" value="YK2LXAHNTSVLC" />
                        <input width="200" type="image" src="https://raw.githubusercontent.com/stefan-niedermann/paypal-donate-button/master/paypal-donate-button.png" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
                        <img alt="" border="0" src="https://www.paypal.com/en_GB/i/scr/pixel.gif" width="1" height="1" />
                    </form>
                </Styles.Form>
            </div>


            <div>
                <Styles.Title>Want to chat?</Styles.Title>
                <Styles.Frame><iframe src="https://discordapp.com/widget?id=671664792896798720&theme=dark" width="350"
                                      height="300" allowTransparency="true" frameBorder="0"/></Styles.Frame>

                <Styles.Title>License</Styles.Title>
                <p>Assistant Relay is distributed with the GNU General Public License v2.0</p>

                <Styles.Title>Version</Styles.Title>
                <p>You are running version {v ? v : "...Fetching..."}</p>
                <Styles.Optin>Version Notification Channel:</Styles.Optin>
                <span>
                    {
                        releaseChannel ?
                            <Radio.Group defaultValue={releaseChannel} buttonStyle="solid" onChange={updateChannel}>
                                <Radio.Button value="beta">Beta</Radio.Button>
                                <Radio.Button value="stable">Stable</Radio.Button>
                            </Radio.Group>:
                            '...Loading...'
                    }

                </span>
            </div>
        </Styles.Container>
    )
}

function AlertBox({update}) {
    if(!update.update) return null;
    return (
        <Styles.Alert>
            <Alert
                message={`Version ${update.details.title} is available`}
                description={<span>To download the latest update, please visit <a>{update.details.link}</a></span>}
                type="info"
                showIcon
            />

        </Styles.Alert>
    )
}

export default About;
