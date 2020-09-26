---
id: installation
title: Installation
description: How to install Assistant Relay
---

At its core, Assistant Relay is powered by Node.js
## Requirements
* [Node.js](https://nodejs.org/en/) version >= 10.13.0 (this can be checked by running `node -v`). If you require multiple Node versions, you can use [NVM](https://github.com/nvm-sh/nvm) to manage multiple versions on a single machine
* [Python](https://www.python.org/downloads/) version >= 3.7 (If you're running Assistant Relay version <= 3.2, this is not required)
* [PM2](https://pm2.keymetrics.io/) will be installed as a pre-requisite. If you do not already have it installed, please install after Node.js by running `npm i pm2 -g`
* [Assistant Relay](https://github.com/greghesp/assistant-relay/releases) - Make sure you download the latest **release.zip**.  Do not download the Source Code!

## Installation

To install Assistant Relay, unzip the contents of `release.zip` to a folder of your choosing. For these documents, the folder name will be `assistant-relay`

In the `assistant-relay` folder, open a terminal/command window and run the below command to install the required dependencies
```
npm run setup
``` 

Once setup is complete, you can run the below command to start Assistant Relay using PM2.

```
npm run start
```

> Note: If you don't want to run this with PM2, you can use `npm run dev` which will run Assistant Relay in its own instance.  It won't restart though if it crashes, or if it forces a restart when you do something such as changing the port












