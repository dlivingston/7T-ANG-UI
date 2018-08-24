var express = require('express');
var socket = require('socket.io');
var jsonfile = require('jsonfile');
var datafile = 'data/data.json';

var app = express();
var server = app.listen(8080, function () {
    console.log('listening to requests on port 8080');
});

var io = socket(server);

io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);

    socket.on('activity', (data) => {
        io.sockets.emit('activity', data);
    });
});

function emitAngData() {
    setTimeout(() => {
        jsonfile.readFile(datafile, function (err, obj) {
            let signalIn = Math.floor(Math.random() * 10);
            let signalOut = Math.floor(Math.random() * 10);
            let data = obj;
            data.ang_data.activity_in = signalIn;
            data.ang_data.activity_out = signalOut;
            io.sockets.emit('ang_data', data);
        });
        emitAngData();
    }, 200);
}

emitAngData();