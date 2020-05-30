'use strict';
const {OAuth2Client} = require('google-auth-library');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./bin/config.json');

exports.auth =  async function(keyData) {
    try {
        const key = keyData.installed || keyData.web;
        const oauthClient = new OAuth2Client(key.client_id, key.client_secret, key.redirect_uris[0]);
        return oauthClient.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/assistant-sdk-prototype'],
        });
    } catch (e) {
        console.error(e)
    }
};

exports.processTokens = async function(oauthCode, name) {
    try {
        console.log(oauthCode, name);
        const db = await low(adapter);
        const user = await db.get('users').find({name}).value();
        const key = user.secret.installed || user.secret.web;
        const oauthClient = new OAuth2Client(key.client_id, key.client_secret, key.redirect_uris[0]);
        const r = await oauthClient.getToken(oauthCode);
        console.log(r)
        oauthClient.setCredentials(r.tokens);
        await db.get('users').chain().find({name: name}).assign({tokens: r.tokens}).write();
        return oauthClient;
    } catch (e) {
        console.error(e);
    }
};

exports.setCredentials = async function (name) {
    try {
        const db = await low(adapter);
        const user = await db.get('users').find({name}).value();
        const key = user.secret.installed || user.secret.web;
        const oauthClient = new OAuth2Client(key.client_id, key.client_secret, key.redirect_uris[0]);
        oauthClient.setCredentials(user.tokens);
        return oauthClient;
    } catch (e) {
        console.error(e)
    }
};
