import http from 'http';
import io from 'socket.io';

let socketServer = io(http);
//items we need to send updates for
let items = [];
const range = 100; //numbers from one to 100

let interval = null;

socketServer.listen(3001, () => {
    console.log('listening on *:3001');
});

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



