const hostile = require('hostile');
const chalk = require('chalk');
const exec = require('child_process').exec;
const isWindowsAdmin = require('is-admin');

/**
 * Print an error and exit the program
 * @param {string} message
 */
function error(err) {
    console.error(chalk.red(err.message || err));
    process.exit(-1);
}

function activatePortForwarding(minIp, port) {
    return new Promise((resolve) => {
        if (process.platform === 'win32') {
            exec(`netsh interface portproxy add v4tov4 listenport=80 listenaddress=${minIp} connectport=${port} connectaddress=127.0.0.1`, {}, (err) => {
                if (err) {
                    error(err);
                }
                resolve();
            });
        } else if (process.platform === 'darwin') {
            exec(`echo "rdr pass on lo0 inet proto tcp from any to ${minIp} port 80 -> 127.0.0.1 port ${port}" | sudo pfctl -ef -`, {}, () => {
                resolve();
            });
        }
    });
}

function removeFromEtcHosts(url) {
    return new Promise((resolve) => {
        let ip = '';

        function filterFunc(line) {
            return !((Array.isArray(line) && line[1] === url) || (typeof line === 'string' && line.split(' ')[2] === this.port));
        }

        function hostileRemove(lines, port) {
            // Try to remove entry, if it exists
            const filteredLines = lines.filter(filterFunc, { port });
            return hostile.writeFile(filteredLines, () => {
                resolve(ip);
            });
        }

        hostile.get(true, (err, lines) => {
            if (err) error(err);
            let port = '';
            for (let i = 0; i < lines.length; i += 1) {
                if (typeof lines[i] === 'object' && lines[i][1] === url) {
                    port = lines[i - 1].split(' ')[2];
                    ip = lines[i][0];
                }
            }
            if (port === '') {
                error('This local.dev is not found');
            }
            return hostileRemove(lines, port);
        });
    });
}

function removeFromNetwokr(ip) {
    return new Promise((resolve) => {
        if (process.platform !== 'win32') {
            resolve();
        } else {
            exec(`netsh interface portproxy delete v4tov4 listenport=80 listenaddress=${ip}`, {}, (err) => {
                if (err) {
                    error(err);
                }
                resolve();
            });
        }
    });
}

function isAdmin() {
    return new Promise((resolve) => {
        if (process.platform === 'linux') {
            error('Your OS is not supported yet, sorry !');
        }
        if (process.platform === 'win32') {
            isWindowsAdmin().then((admin) => {
                resolve(admin);
            });
        } else {
            resolve(process.getuid && process.getuid() === 0);
        }
    });
}

/**
 * Return the next local IP available in a callback
 * @param {function} cb
 */
function getNextAvailableIP(port, url) {
    return new Promise((resolve) => {
        hostile.get(true, (err, lines) => {
            if (err) {
                error(err);
            }
            const ipList = [];
            for (let i = 0; i < lines.length; i += 1) {
                if (typeof lines[i] === 'object') {
                    if (lines[i][1] === url) {
                        error(`
  The url "${url}" is already being used in your hostfile
  If it's a local.dev url, you can by remove it with the remove command

        $ local.dev remove ${url}
            `);
                    }
                    if (i >= 1 && typeof lines[i - 1] === 'string' && lines[i - 1].split(' ')[2] === port) {
                        error(`
  The port "${port}" is already being used by a local.dev
  You can delete the url associated with the remove command

        $ local.dev remove ${lines[i][1]}
            `);
                    }
                    if (lines[i][0].slice(0, 7) === '127.0.0') {
                        ipList.push(lines[i][0]);
                    }
                }
            }
            let minimal = 1;
            ipList.forEach((ip) => {
                if (Number(ip.split('.')[3]) >= minimal) {
                    minimal = Number(ip.split('.')[3]);
                }
            });
            if (minimal === 255) {
                error('Max IP is already took');
            }
            resolve(`127.0.0.${minimal + 1}`);
        });
    });
}

exports.add = function add(port, url) {
    isAdmin().then((admin) => {
        if (!(((port - port) + 1) >= 0)) {
            error('Please give a right port number');
        }
        if (!admin) {
            error('Please launch as root in order to add a new local.dev');
        }
        getNextAvailableIP(port, url).then((minIp) => {
            activatePortForwarding(minIp, port).then(() => {
                hostile.set('# local.dev', port);
                hostile.set(minIp, url);
                console.log(chalk.green(`
Added local.dev :
localhost:${chalk.green(`${port} <-`)} ${chalk.green(url)}
        `));
            });
        });
    });
};

/**
 * Ouputs the list of local.dev url
 * Example : localhost:2000 <- dev.local
 */
exports.list = function list() {
    hostile.get(true, (err, lines) => {
        if (err) {
            error(err);
        }

        for (let i = 0; i < lines.length; i += 1) {
            if (lines[i].slice(0, 11) === '# local.dev') {
                const port = lines[i].split(' ')[2];
                const url = lines[i + 1][1];
                console.log(`localhost:${chalk.green(`${port} <-`)} ${chalk.green(url)}`);
                i += 1;
            }
        }
    });
};

exports.remove = function remove(url) {
    isAdmin().then((admin) => {
        if (!admin) {
            error('Please launch as root in order to remove a local.dev');
        }
        removeFromEtcHosts(url)
            .then((ip) => {
                removeFromNetwokr(ip)
                    .then(() => {
                        console.log(chalk.green(`
Successfully removed ${url}
            `));
                    });
            });
    });
};