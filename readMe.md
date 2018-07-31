
# Assistant Relay!

Assistant Relay is a Node.js server. It's exposed with SSDP, and runs an Express Web Server that allows for commands to be sent to the Google Assistant.

It also supports the Google Home Broadcast command, so unlike other TTS solutions that cast audio, Assistant Relay allows you to send audio notifications to your Google Home devices, without interrupting music.


# Installation

Download a copy of this repository and then use `npm install` to get started

## Configuration

Assistant Relay requires you to download an OAuth2 JSON file from Google.  To do this, please follow this guide: https://developers.google.com/assistant/sdk/guides/service/python/embed/config-dev-project-and-account
**Note: When creating an Oauth Client ID, make sure you use the "Other" application type**

Once you have downloaded your client secret file, copy it to the root folder of this project.

Open your command prompt in the Assistant Relay directory, and run:

    npm run build-config

This will allow you to add your chosen name and associated client secret into the config file, as well as define the port the relay server runs on.
 You can add multiple users, however ensure that each user has correctly configured their Google account so that it is linked with your Google Home devices.


## Running the Relay

Now that the Assistant Relay is configured, start the relay with the command `npm run start`

This should open a web browser asking you to sign in to your Google account. Make sure you use the account linked to you Google Home/Assistant.

Once signed in, a code will be presented to you.  Copy this code into the terminal, and press enter.  Your Google Home should now notify you that the Assistant Relay is setup.

*Note: If your web browser does not open, follow the instructions in the terminal
This process will continue for each user you added to the config file.*

# Issuing a command

At the moment, it is only possible to issue a command to all Google Home devices. Additional support for Home Groups will be coming in the future.
For all of the below commands, it is possible to override the account that issues the command by adding the user parameter to the request, and matching it against the name you set it in the config file.

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

## Preconfigured Broadcast

The Google Home also has a number of preconfigured broadcasts that have some fancy additions to them such as sound effects.  These can be found [here](https://support.google.com/googlehome/answer/7531913?co=GENIE.Platform=Android&hl=en):

Rather than configure these elsewhere, they are built into the Assistant Relay.  Simple send a request as follows:

    curl -X POST -H 'Content-type: application/json' -d '{"preset": "<command>", "user": "<user in config>"}' http://<ip_address>:<port>/broadcast

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

    curl -X POST -H 'Content-type: application/json' -d '{"camera": "<camera name>", "chromecast": "<chromecast name>", "user": "<user in config>"}' http://<ip_address>:<port>/nestStream

To stop a stream, send the following request:

    curl -X POST -H 'Content-type: application/json' -d '{"stop": true, "chromecast": "<chromecast name>", "user": "<user in config>"}' http://<ip_address>:<port>/nestStream

*Note: The user must have the Chromecast device in their account, and have the Nest camera assigned to their account*

## Custom commands

If you want to send a custom command to the Google Home (anything that would follow 'OK Google'), use the following request:

    curl -X POST -H 'Content-type: application/json' -d '{"command": "<custom command>", "user": "<user in config>"}' http://<ip_address>:<port>/custom

This will only log out the response into console, so if you send "What time is it?" as the command, the response would be in the console only.
To have your Google Home speak the answer, simple pass the converse parameter as true:

    curl -X POST -H 'Content-type: application/json' -d '{"command": "<custom command>", "converse": true, "user": "<user in config>"}' http://<ip_address>:<port>/custom


# Credit
This project uses the google-assistant repository from endoplasmic
https://github.com/endoplasmic/google-assistant

## Donations
Whilst donations are appreciated, they are not expected, nor required.  If you want to buy me a drink, you can do so here:
https://monzo.me/greghesp
