const s = require('shelljs');
const { spawn } = require('child_process');
const path = require('path')

let catt;

exports.install =  async function() {
    return new Promise((res, rej) => {
        if(!s.which('pip3')){
            return rej("This is only compatible with Python 3. Please install Python3");
        }

        if(!s.which('catt')) {
            console.log("Installing CATT");
            if(s.exec('pip3 install catt').code !== 0) {
                return rej("Unable to install CATT");
            }
        }
        console.log("Dependencies installed");
        return res();
    })
};

exports.search = async function() {
    return new Promise((res, rej) => {
        const scan = s.exec('catt scan', { silent:true });
        if(scan.code !== 0) return rej("CATT scan failed");
        const devices = scan.stdout.split("\r\n");
        const newDevices = [];
        devices.shift();
        devices.pop();
        devices.forEach(d => {
            const i = d.split(" - ");
            newDevices.push({ address : i[0], name: i[1]})
        });
        return res(newDevices);
    })
};

exports.cast = async function(d) {
    return new Promise((res, rej) => {
        let p;
        if(catt && catt.kill) catt.kill();

        switch (d.type) {
            case "localSound":
                p = `${path.dirname(require.main.filename)}\\sounds\\${d.source}`;
                break;
            default:
                p = d.source;
        }

        catt = spawn('catt', ['-d', d.device, 'cast', p]);
        catt.on('close', () => {
            catt.kill();
            return res();
        })
    })
};
