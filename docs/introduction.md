---
id: introduction
title: Introduction
sidebar_label: Introduction
description: Assistant Relay documentation introduction
---

Assistant Relay is a Node.js server that exposes the Google Assistant SDK, and [CATT](https://github.com/skorokithakis/catt) 
as a REST API.  

Assistant Relay has a number of endpoints for both Google Assistant and CATT.  Simply send Assistant Relay a request to the
corresponding endpoint, and it'll do the rest.

Assistant Relay also has support for the Google Home Broadcast command, including single device broadcasts, so you can
send audio notifications to your Google Home devices without interrupting any media that might already be playing.

At the time of writing, the Google Assistant SDK does unfortunately have a few restrictions, like the inability to ask 
it to start Netflix on a certain device or to stream music.  For more information, check out the [FAQ](./other/faq.md)
or ask in our [Discord](https://discord.gg/Jz8AM9k) channel

