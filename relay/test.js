const mdns = require('multicast-dns')();


(async function() {
    const services = [];

    mdns.on('response', async function(response) {
        response.answers.forEach(a => {
            console.log(a.name, a.data)
        services.push(a)
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
        mdns.destroy()
        //console.log(services);
    });

    mdns.query({
        questions:[{
            name: '_googlecast._tcp.local',
            type: 'SRV'
        }]
    })


})()

