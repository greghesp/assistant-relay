# Assistant Relay v3!

## Discord
There is now a Discord Server where all can join and discuss any Assistant Relay issues or features live:
https://discord.gg/87FsaGa

## About

Assistant Relay is a Node.js server that exposes the Google Assistant as a REST API.

Send Assistant Relay any query you would send the Google Assistant SDK, and get a response back.

It also supports the Google Home Broadcast command so you can send audio notifications to your Google Home devices, without interrupting music.

## New in V3.2.0
- Added the ability to [delete a user](https://github.com/greghesp/assistant-relay/issues/142)
- Added version information to About page
- Updated About page

## New in V3.1.4
- Merged [Pull Request](https://github.com/greghesp/assistant-relay/pull/149) to fix play button not working remotely

## New in V3.1.3
**Note: Please run `npm i` after updating**
- Fixed another bug that stopped `/assistant` from working

## New in V3.1.2
**Note: Please run `npm i` after updating**
- Fixed a bug that prevented OAuth from working

## New in V3.1.1
**Note: Please run `npm i` after updating**
- Fixed a bug that stopped commands from working (sorry, not sure where this one came from)
- Fixed the update checker
- Added a feature to check for updates every day

## New in V3.1.0
- Fixed a bug that prevented the configuration being saved
- Removed the need for the user to enter the server IP and port

## New in V3.0.6
- Fixed a [bug](https://github.com/greghesp/assistant-relay/issues/135) that set invalid date when clearing quiet hours times

## New in V3.0.5
- Fixed a [bug](https://github.com/greghesp/assistant-relay/issues/128) preventing remote configuration that was found in v3.0.4 (Sorry!)
- [Removed playback of Emojis](https://github.com/greghesp/assistant-relay/issues/127) when using the converse parameter

## New in V3.0.4
- Bug fixed in Sandbox JSON creation
- Fixed naming convention in Sandbox
- Fixed typos in Readme

## New in V3.0.3
- Fixed audio URL in response file
- Moved from Beta to Release

## New in V3.0.1b
- Added in converse option
- Fixed quiet hours bug (again...)


## New in V3.0b

- Removed reliance on console commands
- Completely configurable from a dashboard
- Access to Google Assistant audio Responses
- See your Assistant Relay commands on the dashboard
- Listen to your history of audio responses
- Sandbox mode to test requests from dashboard

# Installation

- Make sure you have Node installed from https://nodejs.org/en/
- Install PM2 as a pre-requisite if not already installed `npm i pm2 -g`
- Download a copy of the latest release from https://github.com/greghesp/assistant-relay/releases and then use `npm i` to get started. 
Once setup, run `npm run start`.  You do NOT want the source files:

Note: If you cloned this repo or downloaded the source files, you will need to execute the command in both the relay and client folder as the interface is not packaged


## Configuration
### Creating Users

Assistant Relay requires you to download an OAuth2 JSON file from Google.  
Follow the instructions from step one of the Setup Wizard, and continue until you have finished.

### Configuring the Relay

Visit the `Configuration` tab on the Dashboard to configure

## Running the Relay

Run `npm run start` to start the relay

Note: If you cloned this repo, you will need to execute the command in both the relay and client folder as the interface is not packaged

---

# Issuing a command

If you want your Google Home to speak the response, make sure you pass a new parameter called "converse" as `true`.
In version 3, the endpoint for all interactions with Google Assistant is simple `/assistant`
Simply send a HTTP POST request to `http://<ip_address>:<port>/assistant` with the parameters below


## Broadcast

To send a Broadcast command, simply send a HTTP POST request with the following json-encoded body parameters

    command: hello world
    user: <user in config>
    broadcast: true

The full request would be:

    curl -d '{"command":"hello world", "user":"greg", "broadcast":true}' -H "Content-Type: application/json" -X POST http://<ip_address>:<port>/assistant


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

## Schema

    user: string
    preset: string
    command: string
    broadcast: boolean
    converse: boolean

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
