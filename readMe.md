# Assistant Relay!

Assistant Relay is a Node.js server that currently runs on any Unix platform (Windows is not supported).  It's exposed with SSDP, and runs an Express Web Server that allows for commands to be sent to the Google Assistant.

It also supports the Google Home Broadcast command, so unlike other TTS solutions that cast audio, Assistant Relay allows you to send audio notifications to your Google Home devices, without interrupting music.

# Installation

Download a copy of this repository and then use `npm install` to get started

## Configuration

Assistant Relay requires you to download an OAuth2 JSON file from Google.  To do this, please follow this guide: https://developers.google.com/assistant/sdk/guides/service/python/embed/config-dev-project-and-account

Once you have downloaded your client secret file, copy it to the root folder of this project.

Open config.json and enter the full name of the client secret file, including the extension into the keyFile value like so

    {
      "keyFile": "client_secret_123456-abcde.apps.googleusercontent.com.json"
    }

## Running the Relay

Now that the Assistant Relay is configured, start the relay with the command `node index.js`

This should open a web browser asking you to sign in to your Google account. Make sure you use the account linked to you Google Home/Assistant.

Once signed in, a code will be presented to you.  Copy this code into the terminal, and press enter.  Your Google Home should now notify you that the Assistant Relay is setup.

*Note: If your web browser does not open, follow the instructions in the terminal*

# Issuing a command

At the moment, the only command supported is Broadcast. Additional support for Home Groups will be coming in the future

## Broadcast

To send a Broadcast command, simply send a HTTP Post request:

    http://<ip_address>:3000/broadcast

with the following parameters:

    text: hello world

The full request would be:

    http://<ip_address>:3000/broadcast?text=hello+world
The Google Home device will now play an audio alert, and say `Hello World`

# Credit
This project uses the google-assistant repository from endoplasmic
https://github.com/endoplasmic/google-assistant
