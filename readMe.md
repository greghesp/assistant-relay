

# Assistant Relay v2.0!

**Note: V1 is no longer supported. There is no upgrade path to V2, simply save your existing auth file, download V2 to a new folder and away you go**

Assistant Relay is a Node.js server. It's exposed with an Express Web Server that allows for commands to be sent to the Google Assistant.

It also supports the Google Home Broadcast command, so unlike other TTS solutions that cast audio, Assistant Relay allows you to send audio notifications to your Google Home devices, without interrupting music.

## New in V2.1

- Quiet Hours - thanks joeqread
- Mute Startup - thanks joeqread
- Bug fix for presets

## New in V2.0

- JSON responses for all requests
- Access to Google Assistant audio Responses
- 1 endpoint for all requests
- Improved setup process removing manual user configuration

# Installation

Download a copy of this repository and then use `npm install` to get started

## Configuration
### Creating Users

Assistant Relay requires you to download an OAuth2 JSON file from Google.  To do this, please follow this guide: https://developers.google.com/assistant/sdk/guides/service/python/embed/config-dev-project-and-account

Once your project is setup, you can enable the Google Assistant API and get the credentials OAuth file from here:
https://console.developers.google.com/apis/api/embeddedassistant.googleapis.com/overview
Just select your project from the top left

**Note: When creating an Oauth Client ID, make sure you use the "Other" application type**

Once you have downloaded your client secret file, rename the file to your chosen user name.  For example: `greg.json`.  Once renamed, copy your OAuth file to the folder `server\configurations\secrets`

When Assistant Relay is ran, it will automatically configure itself to according to the files in the secrets folder.  These are also the usernames you can now pass with your queries.  For example, the username for `greg.json` is `greg`

### Configuring the Relay

At the moment, the functionality of the config builder is limited. You can manually edit the `config.json` file found in `/server/configurations` to set this up.

**Only edit the fields below**

| Field | Decription |
|---|---|
|port|What local port do you want Assistant Relay to listen on?|
|muteStartup|`true` or `false` - Will mute the startup announcement|
|quietHours|Whole numbers only. Sets the hours between which Assistant Relay will ignore commands|
|baseUrl|The port and URL to access your Assistant Relay instance on. This will normally be the machines local IP address, followed by the port set above. i.e. http://192.168.1.102:3000 You can set this to an external URL using dyndns or similar if you wish to access from outside your network|
|muteStartup|`true` or `false` - Will mute the startup announcement|

## Running the Relay

Now that the Assistant Relay is configured, start the relay with the command `npm run start`

This should open a web browser asking you to sign in to your Google account. Make sure you use the account linked to you Google Home/Assistant.

Once signed in, a code will be presented to you.  Copy this code into the terminal, and press enter.  Your Google Home should now notify you that the Assistant Relay is setup.

*Note: If your web browser does not open, follow the instructions in the terminal
This process will continue for each user you added to the config file.*

---

# Issuing a command

If you want your Google Home to speak the response, make sure you pass a new parameter called "converse" as `true`.
In version 2, the endpoint for all interactions with Google Assistant is simple `/assistant`
Simply send a HTTP POST request to `http://<ip_address>:<port>/assistant` with the parameters below


## Broadcast

To send a Broadcast command, simply send a HTTP POST request with the following json-encoded body parameters

    command: hello world
    user: <user in config>
    broadcast: true

The full request would be:

    curl -d '{"command":"hello world", "user":"greg", "broadcast":"true"}' -H "Content-Type: application/json" -X POST http://<ip_address>:<port>/assistant


The Google Home device will now play an audio alert, and say `Hello World`

## Custom commands

If you want to send a custom command to the Google Home (anything that would follow 'OK Google'), use the following json-encoded body parameters:

    command: tell me a joke
    user: <user in config>

If you want Assistant Relay to broadcast the response from Assistant, set the converse parameter to true

    command: tell me a joke
    user: <user in config>
    converse: true

## Preset Broadcasts

Google Assistant supports a number of preset broadcasts out of the box, that come with sound effects and other surprises that can be found [here](https://support.google.com/googlehome/answer/7531913?co=GENIE.Platform=Android&hl=en).

To make use of these presets, send a request with the following json-encoded body parameters

    preset: <command>
    user: <user in config>

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

*Note: Some of these preconfigured commands also say who triggered the command, such as the 'on the way' command. Make sure you pass the correct username in the user parameter, otherwise it will use the first user you setup*

---

# Responses

For each request sent, Assistant Relay will now response with a JSON message.  The message can contain the following fields:

**success** - A boolean field to declare if the command was successful

**audio** - A url that will playback to audio response from Google Assistant when a GET request is made to it

**response** - The text response from Google Assistant

**error** - The error message from Google Assistant

---

# Broadcasting to specific Google Homes

This functionality is not supported by Google, and as such you have to put a work around in place.

To do this, you will need to create a new Google account, and then connect the Google Home devices you want to put into a broadcast "group".

Once you have this new Google Account, continue the setup as per above and give the OAuth file a name of your choice.  When you then broadcast, pass this name as the user fields

For example, if I wanted to broadcast only to my Living Room Home, I would setup a new Google Account and link ONLY my Living Room Home to this account. I'd download the OAuth file and then rename it to "LivingRoom.json".  Then when sending a command to Assistant Relay, I would use the username "LivingRoom"

---

# Credit
This project uses the google-assistant repository from endoplasmic
https://github.com/endoplasmic/google-assistant

## Donations
Whilst donations are appreciated, they are not expected, nor required.  If you want to buy me a drink, you can do so here:
https://monzo.me/greghesp
