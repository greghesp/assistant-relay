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
    "users" : {
      "user1": "user1_client_secret.json",
      "user": "user2_client_secret.json"
    },
    "language": "en-US"
  }

## Running the Relay

Now that the Assistant Relay is configured, start the relay with the command `node index.js`

This should open a web browser asking you to sign in to your Google account. Make sure you use the account linked to you Google Home/Assistant.

Once signed in, a code will be presented to you.  Copy this code into the terminal, and press enter.  Your Google Home should now notify you that the Assistant Relay is setup.

*Note: If your web browser does not open, follow the instructions in the terminal*

# Issuing a command

At the moment, the only command supported is Broadcast. Additional support for Home Groups will be coming in the future

## Custom Broadcast

To send a Broadcast command, simply send a HTTP Post request:

    http://<ip_address>:3000/customBroadcast

with the following parameters:

    text: hello world    

The full request would be:

    http://<ip_address>:3000/customBroadcast?text=hello+world
The Google Home device will now play an audio alert, and say `Hello World`

## Preconfigured Broadcast

The Google Home also has a number of preconfigured broadcasts that have some fancy additions to them such as sound effects.  These can be found [here](https://support.google.com/googlehome/answer/7531913?co=GENIE.Platform=Android&hl=en):

Rather than configure these elsewhere, they are built into the Assistant Relay.  Simple send a request as follows:

    http://<ip_address>:3000/broadcast?preset=<command>&user=<name-as-in-config>

**Available Commands**

 - wakeup
 - breakfast
 - lunch
 - dinner
 - timetoleave
 - arrivedhome
 - ontheway
 - movietime
 - tvtime
 - bedtime

*Note: Some of these preconfigured commands also say who triggered the command, such as the 'on the way' command. Since Assistant Relay only currently supports one user, this will automatically use the account for whoever setup Assistant Relay with their account*

## Nest Camera Streaming

If you want to start a stream from your Nest Cam to a Chromecast device, you can do this with the following request:

    http://<ip_address>:3000/nestStream?camera=<camera name>&chromecast=<chromecast_name>&user=<user-from-config>

To stop a stream, send the following request:

    http://<ip_address>:3000/nestStream?stop=true&chromecast=<chromecast_name>

*Note: The user must have the Chromecast device in their account, and have the Nest camera assigned to their account*

## Custom commands

If you want to send a custom command to the Google Home (anything that would follow 'OK Google'), use the following request:

    http://<ip_address>:3000/custom?command=<custom command>&user=<user from config>

# Credit
This project uses the google-assistant repository from endoplasmic
https://github.com/endoplasmic/google-assistant
