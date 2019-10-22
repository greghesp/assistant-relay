exports.delay = function(v) {
    return new Promise(res => setTimeout(res, v))
};