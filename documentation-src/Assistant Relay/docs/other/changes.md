---
id: changes
title: Release Notes
description: Assistant Relay Release Notes
---

> The latest release stable release can always be found on [GitHub](https://github.com/greghesp/assistant-relay/releases/latest)

## Version 3.3

### v3.3.1
> Please make sure to run npm i after extracting and that you are running the latest version of CATT
- Fixed Cast device scanning issue on Linux
- Changed Cast Sandbox icon
- Added cast force stopping
- Fixed update notification bug
- Added Beta notification opt-in


### v3.3.0 Beta
> Please make sure to run npm i after extracting
  
- New [documentation available](https://greghesp.github.io/assistant-relay/)
- Assistant Relay can now cast media (Please note, this is in beta and might break)

## Version 3.2

### v3.2.0
- Added the ability to [delete a user](https://github.com/greghesp/assistant-relay/issues/142)
- Added version information to About page
- Updated About page

## Version 3.1

### v3.1.4
- Merged [Pull Request](https://github.com/greghesp/assistant-relay/pull/149) to fix play button not working remotely

### v3.1.3
> Please make sure to run npm i after extracting

- Fixed another bug that stopped /assistant from working

### v3.1.2
> Please make sure to run npm i after extracting

- Fixed a bug that prevented OAuth from working

### v3.1.1
> Please make sure to run npm i after extracting

- Fixed a bug that stopped commands from working (sorry, not sure where this one came from)
- Fixed the update checker
- Added a feature to check for updates every day

### v3.1.0
- Fixed a bug that prevented the configuration being saved
- Removed the need for the user to enter the server IP and port

## Version 3.0

### v3.0.6
- Fixed a [bug](https://github.com/greghesp/assistant-relay/issues/135) that set invalid date when clearing quiet hours times

### v3.0.5
- Fixed a [bug](https://github.com/greghesp/assistant-relay/issues/128) preventing remote configuration that was found in v3.0.4 (Sorry!)
- [Removed playback of Emojis](https://github.com/greghesp/assistant-relay/issues/127) when using the converse parameter

### v3.0.4
- Bug fixed in Sandbox JSON creation
- Fixed naming convention in Sandbox
- Fixed typos in Readme

### v3.0.3
- Fixed audio URL in response file
- Moved from Beta to Release

### v3.0.2 Beta
- Bug fix for configuration page
  
### v3.0.1
- Added in converse option
- Fixed quiet hours bug (again...)

### v3.0 Beta
- Removed reliance on console commands
- Completely configurable from a dashboard
- Access to Google Assistant audio Responses
- See your Assistant Relay commands on the dashboard
- Listen to your history of audio responses
- Sandbox mode to test requests from dashboard