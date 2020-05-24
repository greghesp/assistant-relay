exports.delay = function(v) {
    return new Promise(res => setTimeout(res, v))
};

exports.adapter = function() {
    const adapter = new FileSync('./bin/config.json');
    return adapter;
}
