import {mount, shallow} from 'enzyme';
import React from 'react';
import Reflux from 'reflux';
import { SocketIO, Server } from 'mock-socket';
import Counter from '../components/Counter';
import CounterStore from '../stores/CounterStore';
import CounterActions from '../actions/CounterActions';


describe('<Counter /> real-time component spec', () => {
    const counterId = 1;
    const updateMsg = {id: counterId, number: 10};
    const enableMsg = {id: counterId, status: 'enabled'};
    const disableMsg = {id: counterId, status: 'disabled'};
    const counter = shallow(<Counter id={counterId} />);
    const mockServer = new Server('http://localhost:3001');
    
    beforeEach(() => {

        jest.useFakeTimers();
    });
    
    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    })

    it('should update number value on websocket message', () => {
        Reflux.initStore(CounterStore);
        CounterActions.init([counterId]);
    });

});
