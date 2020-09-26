---
id: faq
title: Frequently Asked Questions
description: Assistant Relay Frequently Asked Questions
---

## How do I disable "Incoming broadcast from [name]"?
Unfortunately you can't.  The best thing to do is send Google some feedback asking them to change it or make it optional.  
To do this, open Google Assistant on your phone, and say `Send Feedback`.  It'll let you type in your feedback to the product team

## How can I cast media?
See our [Casting](../cast/casting) documentation

## How can I broadcast to specific Google Home devices?
See our [Broadcast](../assistant/broadcast.mdx#broadcast-to-device) documentation

## I tried a Broadcast, but I don't hear anything?

If you're not seeing any errors in Assistant Relay when performing a broadcast, the issue may lie within your network

Head over to [My Activity](https://myactivity.google.com/myactivity) and check to see if you see your command under the 
Assistant product.

If not, ensure you have used the correct OAuth Client Type from the [Configuration instructions](../getting-started/configuration)

If you can see the command in My Activity, then Assistant Relay is running correctly.  The next step would be to disable
IPV6 on your router.  Google implemented some security changes a while back, and having IPV6 enabled breaks the SDK integration.

## Can I run this on a VPS or device outside of my home network?
Whilst it is possible to run Assistant Relay on a device outside of your home network, it is not something we support or 
recommend.  Google security policies prevent the broadcast functionality from working, and by nature Casting will also not
be available.
