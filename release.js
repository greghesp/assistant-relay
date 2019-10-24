const fs = require('fs');
const dir = './release';
const ncp = require('ncp').ncp;
ncp.limit = 16;


if (!fs.existsSync(dir)) fs.mkdirSync(dir);
ncp('./relay/bin/', './release/bin');
ncp('./relay/helpers/', './release/helpers');
ncp('./relay/routes/', './release/routes');
ncp('./relay/views/', './release/views');
ncp('./relay/app.js', './release/app.js');
ncp('./relay/package.json', './release/package.json');
ncp('./relay/package-lock.json', './release/package-lock.json');
ncp('./LICENSE', './release/LICENSE');
ncp('./readMe.md', './release/readMe.md');