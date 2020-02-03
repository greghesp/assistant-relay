const Youtube = require('youtube-castv2-client').Youtube;
const DefaultMediaReceiver  = require('castv2-client').DefaultMediaReceiver;
const Client = require('castv2-client').Client;


exports.launch = function (host) {
    return new Promise(async(res, rej) => {
        var client = new Client();

        client.connect(host, function() {
            console.log('connected, launching app ...');
            client.launch(DefaultMediaReceiver, function(err, player) {
                var media = {

                    // Here you can plug an URL to any mp4, webm, mp3 or jpg file with the proper contentType.
                    contentId: 'http://192.168.1.174:3000/server/sounds?v=doorbell.mp3',
                    contentType: 'audio/mp3',
                    streamType: 'LIVE', // or LIVE

                    // Title and cover displayed while buffering
                    // metadata: {
                    //     type: 0,
                    //     metadataType: 0,
                    //     title: "Big Buck Bunny",
                    //     images: [
                    //         { url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg' }
                    //     ]
                    //}
                };

                player.on('status', function(status) {
                    console.log('status broadcast playerState=%s', status.playerState);
                    if(status.playerState === "IDLE") client.close();
                });

                player.load(media, { autoplay: true }, function(err, status) {
                    console.log('media loaded playerState=%s', status.playerState);
                });

            });

        });

        client.on('error', function(err) {
            console.log('Error: %s', err.message);
            client.close();
        });
    })
};

exports.yt = function(host) {
    var client = new Client();
    client.connect(host, function() {
        console.log('connected, launching app ...');
        client.launch(Youtube, function(err, player) {
            player.load('69V__a49xtw');
        });
    });

    client.on('error', function(err) {
        console.log('Error: %s', err.message);
        client.close();
    });
}