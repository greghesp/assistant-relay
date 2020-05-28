---
id: configuration
title: Configuration
description: How to configure Assistant Relay
---

## Configuring Credentials
To get started with Assistant Relay, you will first need to setup a project in the Google Cloud Console to integrate with.  You will need to repeat these steps, for every Google Account you wish to add to Assistant Rlay

>  **Make sure you are signed into the Google Account you want this to work with!**

Rather than list all the steps on how to configure this, please follow the [Configure a Developer Project and Account Settings](https://developers.google.com/assistant/sdk/guides/service/python/embed/config-dev-project-and-account) guide from Google.  
Once you have completed steps 1 - 6, come back to this guide and follow the below instructions:

1. Go to the [Google Developer Console](https://console.developers.google.com/) and ensure that your project is selected from the dropdown at the top
2. Click on the `Credentials` link in the left hand menu
3. At the top, click the `Create Credentials` button and select `OAuth Client ID`
4. Select `TV and Limited Input devices` from the dropdown list
5. Give your client ID a name, such as `Assistant Relay`. Click `Create`.
7. Click the `Download` button to download your credentials json file.

## Setting up Assistant Relay

Now that you have your credentials json file downloaded, it's time to setup Assistant Relay

1. Run the command `npm run start` to start Assistant Relay
2. In your terminal/command window, you will see a message giving you a link to the Assistant Relay Dashboard. Open this link in a web browser
3. You can now follow the setup wizard, adding a username and providing the credentials json you downloaded above
4. Once you have setup your first user, Assistant Relay will broadcast a message to announce it is setup.

## Configuring Assistant Relay

Assistant Relay has a set of options that can be configured under the `Configuration` tab of the Assistant Relay dashboard.

At this time, the following configuration options are available:

* **Mute Startup Sound**: If set to off, Assistant Relay will broadcast a message when it starts up
* **Port Number**: Change the port Assistant Relay is running on
* **Quiet Hours**: If enabled, Quiet Hours let you set a time when broadcasts are not announced.
* **Conversation Language**: Change the language that Assistant Relay communicates with the Assistant SDK

### Changing the port before running

By default, Assistant Relay runs on port 3000. If you need to change this **before** running Assistant Relay, you can do this by creating a `config.json` file.

1. In the `assistant-relay` folder, navigate to the `bin` subfolder
2. Create a file called `config.json`
3. Inside this file, paste the below code, modify the port number and save.

```json
{
  "port": 3000
}
```
4. Start Assistant Relay

