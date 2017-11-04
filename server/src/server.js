import http from 'http';
import url from 'url';
import io from 'socket.io';

//items we need to send updates for
let items = [];
const range = 100; //numbers from one to 100

let interval = null;

//helper functions
const updateNumberMessage = () => { //update random id with random number
    return {
        id: items[Math.floor(Math.random() * items.length)],
        number: Math.floor(Math.random() * range),
    };
};

const unsubscribe = (id) => { //unsubscribe from selected id
    let index = items.indexOf(id);
    if (index > -1) {
        items.splice(index, 1);
        return true;
    }
    return false;
};

const subscribe = (id) => { //subscribe for selected id
    let index = items.indexOf(id);
    if (index === -1) {
        items.push(id);
        return true;
    }
    return false;
};

//code for http server

let app = http.createServer((request, response) => {
    const uri = url.parse(request.url).pathname;
    let data = {};
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Request-Method', '*');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader('Access-Control-Allow-Headers', '*');
    if (uri === '/info') {
        response.writeHead(200, { "Content-Type" : "application/json" });
        data = {message: 'This is ajax response'};
    } else {
        response.writeHead(401, { "Content-Type" : "application/json" });
        data = {error: 'ACTION_NOT_SUPPORTED'};
    }
    response.end(JSON.stringify(data));
}).listen(3001, () => {
    console.log('Http server running at *:3001');
});

let socketServer = io(app);


socketServer.on('connection', (socket) => {
    //on subscribe to Websocket from the FE
    socket.on('subscribe', (data, fn) => {
        if (typeof data.ids !== 'undefined' && data.ids.length) { //received ids subscribing to
            items = data.ids;
            fn();
            if (!interval) {
                interval = setInterval(() => {
                    socketServer.emit('update', updateNumberMessage()); //emit update with random number 
                }, 2000);
            }
        } else { //emit error message
            socketServer.emit('error', {error: 'Error! Malformed subscribe package!'});
            clearInterval(interval);
        }
    });

    socket.on('disable', (data) => {
        if (typeof data.id === 'undefined') {
            return false;
        }
        if (unsubscribe(data.id)) {
            socketServer.emit('status', {id: data.id, status: 'disabled'});
        }
        return false;
    });

    socket.on('enable', (data) => {
        if (typeof data.id === 'undefined') {
            return false;
        }
        if (subscribe(data.id)) {
            socketServer.emit('status', {id: data.id, status: 'enabled'});
        }
        return false;
    });

});
