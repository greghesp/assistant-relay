

# Assistant Relay v2.0!

**Note: This is a work in progress. Things might break, things might not work, and not all features exist yet.   If you want to test this, I suggest you set it up to run alongside your V1.0 installation**

Assistant Relay is a Node.js server. It's exposed with SSDP, and runs an Express Web Server that allows for commands to be sent to the Google Assistant.

It also supports the Google Home Broadcast command, so unlike other TTS solutions that cast audio, Assistant Relay allows you to send audio notifications to your Google Home devices, without interrupting music.

# Installation

Download a copy of this repository and then use `npm install` to get started

## Configuration

Assistant Relay requires you to download an OAuth2 JSON file from Google.  To do this, please follow this guide: https://developers.google.com/assistant/sdk/guides/service/python/embed/config-dev-project-and-account
**Note: When creating an Oauth Client ID, make sure you use the "Other" application type**

Once you have downloaded your client secret file, rename the file to your chosen user name.  For example: `greg.json`.  Once renamed, copy your OAuth file to the folder `server\configurations\secrets`

When Assistant Relay is ran, it will automatically configure itself to according to the files in the secrets folder.  These are also the usernames you can now pass with your queries.  For example, the username for `greg.json` is `greg`


## Running the Relay

Now that the Assistant Relay is configured, start the relay with the command `npm run start`

This should open a web browser asking you to sign in to your Google account. Make sure you use the account linked to you Google Home/Assistant.

Once signed in, a code will be presented to you.  Copy this code into the terminal, and press enter.  Your Google Home should now notify you that the Assistant Relay is setup.

*Note: If your web browser does not open, follow the instructions in the terminal
This process will continue for each user you added to the config file.*

# Issuing a command

If you want your Google Home to speak the response, make sure you pass a new parameter called "converse" as `true`.

## Custom Broadcast

To send a Broadcast command, simply send a HTTP Post request:

    http://<ip_address>:<port>/customBroadcast

with the following json-encoded parameters:

    text: hello world
    user: <user in config>

The full request would be:

    curl -X POST -H 'Content-type: application/json' -d '{"text": "hello world", "user": "<user in config>"}' http://<ip_address>:<port>/customBroadcast

The Google Home device will now play an audio alert, and say `Hello World`

## Custom commands

If you want to send a custom command to the Google Home (anything that would follow 'OK Google'), use the following request:

    http://<ip_address>:<port>/custom?command=<custom command>&user=<config file user name>

# Credit
This project uses the google-assistant repository from endoplasmic
https://github.com/endoplasmic/google-assistant

## Donations
Whilst donations are appreciated, they are not expected, nor required.  If you want to buy me a drink, you can do so here:
https://monzo.me/greghesp
