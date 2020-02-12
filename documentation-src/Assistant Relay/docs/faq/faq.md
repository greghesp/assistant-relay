---
id: faq
title: Frequently Asked Questions
---

## How do I disable "Incoming broadcast from [name]"?
Unfortunately you can't.  The best thing to do is send Google some feedback asking them to change it or make it optional.  
To do this, open Google Assistant on your phone, and say `Send Feedback`.  It'll let you type in your feedback to the product team

## How can I cast media?
This is not something supported by the Google Assistant SDK.  There are apparently other Google Assistant implementations out there that have managed to do this.  I have yet to find them, or get them working.  I've also tried to get this working with Assistant Relay, but have had no such luck so far.

With that in mind, you can cast Nest Cameras to a Smart Display.  Simply send a command `cast driveway camera to the kitchen hub`

## How can I broadcast to specific Google Home devices?
This functionality is not supported by Google, and as such you have to put a work around in place.

To do this, you will need to create a new Google account, and then connect the Google Home devices you want to put into a broadcast "group".

Once you have this new Google Account, continue the setup as per above and give the OAuth file a name of your choice.  When you then broadcast, pass this name as the user fields

For example, if I wanted to broadcast only to my Living Room Home, I would setup a new Google Account and link ONLY my Living Room Home to this account. I'd download the OAuth file and then rename it to `LivingRoom.json`.  Then when sending a command to Assistant Relay, I would use the username `LivingRoom`


