var liveServer = require("live-server");
var locations = require('./api/locations.json')

var params = {
    port: 8080,
    host: "127.0.0.1",


    ignore: 'scss,my/templates',
    file: "index.html",
    wait: 500,

    logLevel: 2,
    middleware: [function (req, res, next) {
        if (req.url === '/api/locations') {
            apiLocations(req, res);
        } else {
            next();
        }
    }] 
};

liveServer.start(params);

function apiLocations(req, res) {
    const body = JSON.stringify(locations);

    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'application/json'
    });
    res.end(body);
}
