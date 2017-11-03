import {mount, shallow}
from 'enzyme';
import React from 'react';
import Reflux from 'reflux';
import * as mockSocket from 'mock-socket';
import Counter from '../components/Counter';
import CounterStore from '../stores/CounterStore';
import CounterActions from '../actions/CounterActions';
jest.mock('socket.io-client', () => {
    return mockSocket.SocketIO;
});

describe('<Counter /> real-time component spec', () => {
    const counterId = 1;
    const updateMsg = {id: counterId, number: 10};
    const enableMsg = {id: counterId, status: 'enabled'};
    const disableMsg = {id: counterId, status: 'disabled'};
    const counter = shallow(<Counter id={counterId} />);
    const mockServer = new mockSocket.Server('ws://localhost:3001');
    mockServer.on('connection', () => {
        mockServer.emit('connect');
        mockServer.on('subscribe', (data, fn) => {
            fn();
        });
    });
    beforeEach(() => {
        Reflux.initStore(CounterStore);
        CounterActions.init([counterId]);
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    })

    it('should update number value on websocket message', () => {
        setTimeout(() => {
            mockServer.emit('update', updateMsg);
            counter.update();
        }, 100);
        jest.runOnlyPendingTimers();
        expect(counter).toHaveState('number', updateMsg.number);
    });

    it('should go disabled on disabled message', () => {
        expect(counter).toHaveState('status', enableMsg.status);
        setTimeout(() => {
            mockServer.emit('status', disableMsg);
            counter.update();
        }, 100);
        jest.runOnlyPendingTimers();
        expect(counter).toHaveState('status', disableMsg.status);
    });

    it('should go enabled on enabled message', () => {
        counter.setState({status: disableMsg.status});
        expect(counter).toHaveState('status', disableMsg.status);
        setTimeout(() => {
            mockServer.emit('status', enableMsg);
            counter.update();
        }, 100);
        jest.runOnlyPendingTimers();
        expect(counter).toHaveState('status', enableMsg.status);
    });

}
);
