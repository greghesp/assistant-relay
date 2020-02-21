const s = require('shelljs');
const { spawn } = require('child_process');
const path = require('path');

let catt;

exports.install =  async function() {
    return new Promise((res, rej) => {
        if(!s.which('pip3')){
            return rej("This is only compatible with Python 3. Please install Python3");
        }

        // if(!s.which('requests')) {
        //     console.log("Installing Requests");
        //     if(s.exec('pip3 install requests').code !== 0) {
        //         return rej("Unable to install Requests");
        //     }
        // }

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
        //const scan = s.exec('catt scan --json-output');
        const scan = s.exec('catt scan --json-output', { silent:true });
        if(scan.code !== 0) return rej("CATT scan failed");
        const devices = JSON.parse(scan.stdout);
        const newDevices = {
            success: true,
            devices: []
        };

        Object.entries(devices).forEach(([key, val]) => {
            newDevices.devices.push({
                name: key,
                address: val.host,
                model: val.model_name,
                uuid: val.uuid
            });
        });

        return res(newDevices);
    })
};

exports.cast = async function(d) {
    return new Promise((res, rej) => {
        let p, t;
        let i = {
            messages: []
        };

        if(catt && catt.kill) catt.kill();

        switch (d.type) {
            case "custom":
                p = `${path.dirname(require.main.filename)}/media/${d.source}`;
                t = 'cast';
                break;
            case "local":
                p = d.source;
                t = 'cast';
                break;
            case "website":
                p = d.source;
                t = 'cast_site';
                break;
            default:
                p = d.source;
                t = 'cast';
        }

        catt = spawn('catt', ['-d', d.device, t, p]);

        catt.stdout.on('data', (data) => {
            i.messages.push(Buffer.from(data).toString());
            console.log(`${data}`)
        });

        catt.stderr.on('data', (data) => {
            console.log(`${data}`)
        });

       return catt.on('close', (code) => {
           if(d.type === "custom" || d.type === "local") {
               cattkill = spawn('catt', ['-d', d.device, 'stop', '-f']);
               cattkill.on('close', (code) => {
                   return res();
               });
           }
            return res(i);
        });
    })
};

exports.stop = async function(d) {
    return new Promise((res, rej) => {
        if(catt && catt.kill) catt.kill();

        if(d.force) catt = spawn('catt', ['-d', d.device, 'stop' ,'-f']);
        else catt = spawn('catt', ['-d', d.device, 'stop']);

        catt.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`)
        });

        catt.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`)
        });

        return catt.on('close', (code) => {
            console.log(`close: ${code}`);
            return res();
        });
    })
}
