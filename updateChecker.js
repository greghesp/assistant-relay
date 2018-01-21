var AutoUpdater = require('auto-updater');

var autoupdater = new AutoUpdater({
 pathToJson: 'package.json',
 autoupdate: false,
 checkgit: true,
 jsonhost: 'https://raw.githubusercontent.com/greghesp/assistant-relay/master/package.json',
 contenthost: 'https://github.com/greghesp/assistant-relay/archive/master.zip',
 progressDebounce: 0,
 devmode: false
});

// State the events
autoupdater.on('git-clone', function() {
  console.log("You have a clone of the repository. Use 'git pull' to be up-to-date");
});
autoupdater.on('check.up-to-date', function(v) {
  console.info("You have the latest version: " + v);
});
autoupdater.on('check.out-dated', function(v_old, v) {
  console.warn("Your version is outdated. " + v_old + " of " + v);
  autoupdater.fire('download-update'); // If autoupdate: false, you'll have to do this manually.
  // Maybe ask if the'd like to download the update.
});
autoupdater.on('update.downloaded', function() {
  console.log("Update downloaded and ready for install");
  autoupdater.fire('extract'); // If autoupdate: false, you'll have to do this manually.
});
autoupdater.on('update.not-installed', function() {
  console.log("The Update was already in your folder! It's read for install");
  autoupdater.fire('extract'); // If autoupdate: false, you'll have to do this manually.
});
autoupdater.on('update.extracted', function() {
  console.log("Update extracted successfully!");
  console.warn("RESTART THE APP!");
});
autoupdater.on('download.start', function(name) {
  console.log("Starting downloading: " + name);
});
autoupdater.on('download.progress', function(name, perc) {
  process.stdout.write("Downloading " + perc + "% \033[0G");
});
autoupdater.on('download.end', function(name) {
  console.log("Downloaded " + name);
});
autoupdater.on('download.error', function(err) {
  console.error("Error when downloading: " + err);
});
autoupdater.on('end', function() {
  console.log("The app is ready to function");
});
autoupdater.on('error', function(name, e) {
  console.error(name, e);
});

// Start checking
autoupdater.fire('check');
