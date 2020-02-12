---
id: contributing
title: Contributing
sidebar_label: Contributing
description: Contributing to Assistant Relay
---

Assistant Relay is in active development, and welcomes contributions to assist with bug fixes and feature enhancements.

## Getting Involved

Contributing to Assistant Relay doesn't always involve writing code.  There are many ways to get involved:

* Answering questions on [GitHub](https://github.com/greghesp/assistant-relay/issues) or [Discord](https://discord.gg/Jz8AM9k)
* Contributing to this documentation. (Check out [Docusaurus](https://v2.docusaurus.io/docs/) for guides on how to edit these docs)

### Join our Discord Channel
If you fancy contributing to Assistant Relay as a developer, join our [#assistant-relay-development](https://discord.gg/MqTSSqa) channel on Discord

## Our development process

### Reporting a new issue
When [reporting a new issue](https://github.com/greghesp/assistant-relay/issues/new/choose), please make sure you fill out the provided template where possible.
Filling out this template helps us look for the issue faster as the basic questions have been answered.

* **One issue, one bug**: One bug per issue please
* **How can we replicate it**: Please complete the template and list the steps to reproduce the issue

### Requesting new features
Whilst feature requests are always welcomed, we can't guarantee they will be implemented.  Assistant Relay is built as a non commercial, hobbyist solution and all features are built in free time.

If you wish to request a new feature, please complete the [Feature Request](https://github.com/greghesp/assistant-relay/issues/new/choose) template

## Developing Assistant Relay

Assistant Relay uses Express to power the REST API and connection to the Google Assistant SDK, and React to power the web dashboard.  When a new release is issued, React is bundled and included in the Express server.

### Installation
1. Ensure that you have [Node.js](https://nodejs.org/en/) installed
2. After cloning the repository, run `npm i` in both the `relay` and `client` directories
3. Go into the `client` directory and run `npm run start` to start the React instance
4. Go into the `relay` directory and run `npm run dev` to start the Express server