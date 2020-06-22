const fs = require('fs-extra');
const path = require('path');
const dir = './release';

console.log("Did you remember to change the version number in /bin/version.json and /relay/package.json?!");
copy();

async function copy() {
    try {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);

        await fs.copy(path.resolve(__dirname, 'relay/bin/'), path.resolve(__dirname, 'release/bin'));
        console.log("Copied bin folder");

        await fs.copy(path.resolve(__dirname, 'relay/helpers/'), path.resolve(__dirname, 'release/helpers'));
        console.log("Copied helpers");

        await fs.copy(path.resolve(__dirname, 'relay/routes/'), path.resolve(__dirname, 'release/routes'));
        console.log("Copied routes");

        await fs.copy(path.resolve(__dirname, 'client/build/'), path.resolve(__dirname, 'release/views'));
        console.log("Copied views");

        await fs.copy(path.resolve(__dirname, 'relay/app.js'), path.resolve(__dirname, 'release/app.js'));
        console.log("Copied app.js");

        await fs.copy(path.resolve(__dirname, 'relay/package.json'), path.resolve(__dirname, 'release/package.json'));
        console.log("Copied packages.json");

        await fs.copy(path.resolve(__dirname, 'LICENSE'), path.resolve(__dirname, 'release/LICENSE'));
        console.log("Copied license");

        await fs.copy(path.resolve(__dirname, 'readMe.md'), path.resolve(__dirname, 'release/readMe.md'));
        console.log("Copied readme");

        await fs.remove(path.resolve(__dirname, 'release/bin/config.json'));
        console.log("Removed config.json");

        await fs.emptyDir(path.resolve(__dirname, 'release/bin/audio-responses'));
        console.log("Removed personal audio files");

        await fs.emptyDir(path.resolve(__dirname, 'release/bin/html-responses'));
        console.log("Removed personal HTML files");

        console.log("Done")
    } catch (e) {
        console.error("Something went wrong");
        console.error(e)
    }
}











