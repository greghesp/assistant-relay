const axios = require('axios');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('config.json');

registerDevice();

async function registerDevice() {
    try {
        const db = await low(adapter);
        const users = await db.get('users').value();
        const projectid = users[0].secret.installed.project_id;
        const accesstoken = users[0].tokens.access_token;

        const device = {
            "project_id": projectid,
            "device_model_id": `${projectid}-assistant-relay`,
            "manifest": {
                "manufacturer": "Greg Hesp",
                "product_name": "Assistant Relay",
                "device_description": "Assistant Relay device"
            },
            "device_type": "action.devices.types.SPEAKER"
        };

        const response = await axios({
            method: 'post',
            url: `https://embeddedassistant.googleapis.com/v1alpha2/projects/${projectid}/deviceModels/`,
            headers: {
                'Authorization': `Bearer ${accesstoken}`,
                'Content-Type': 'application/json'
            },
            data: device
        });
        registerDeviceInstance();
    } catch (e) {
        console.log(e)
    }
}

async function registerDeviceInstance() {
    try {
        const db = await low(adapter);
        const users = await db.get('users').value();
        const projectid = users[0].secret.installed.project_id;
        const accesstoken = users[0].tokens.access_token;

        const modelid = `${projectid}-assistant-relay`;
        const deviceid = "my_assistant_relay";

        const device = {
            "id": deviceid,
            "model_id": modelid,
            "nickname": "My Assistant Relay",
            "client_type": "SDK_SERVICE"

        };

        const response = await axios({
            method: 'post',
            url: `https://embeddedassistant.googleapis.com/v1alpha2/projects/${projectid}/devices/`,
            headers: {
                'Authorization': `Bearer ${accesstoken}`,
                'Content-Type': 'application/json'
            },
            data: device
        });

        db.get('conversation').push({ deviceModelId: modelid, deviceId: deviceid}).write();


    } catch (e) {
        console.log(e)
    }
}