import {shallow, mount} from 'enzyme';
import 'isomorphic-fetch'; //to make response constructor available
import React from 'react';
import Info from '../components/Info';

describe('<Info /> async component spec', () => {
    const url = '/info';
    const message = 'message';
    const mockResponse = (status, statusText, response) => {
        return new Response(response, {
            status: status,
            statusText: statusText,
            headers: {
                'Content-type': 'application/json'
            }
        });
    };


    it('should call /info endpoint on mount', async () => {
        const fakePromise = Promise.resolve(mockResponse(200, null, JSON.stringify({message: message})));
        window.fetch = jest.fn().mockImplementationOnce(() => {
            return fakePromise
        });
        expect.assertions(2);
        const info = mount(<Info infoUrl = {url} />);
        await Promise.all([fakePromise]);
        expect(window.fetch).toHaveBeenCalled();
        expect(window.fetch.mock.calls[0][0]).toEqual(url);
    });

    it('should display message retrieved with ajax request', async (done) => {
        const fakePromise = Promise.resolve(mockResponse(200, null, JSON.stringify({message: message})));
        window.fetch = jest.fn().mockImplementationOnce(() => {
            return fakePromise
        });
        expect.assertions(2);
        const info = mount(<Info infoUrl = {url} />);
        await Promise.all([fakePromise]);
        setImmediate(() => {
            try {
                expect(info).toHaveState('message', message);
                expect(info).toIncludeText(message);
            } catch (e) {
                done.fail(e);
            }
            done();
        });
    });

});
