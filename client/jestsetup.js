import jsdom from 'jsdom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

const {JSDOM} = jsdom;
const {window} = new JSDOM('<!doctype html><html><body></body></html>');
function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
            .filter(prop => typeof target[prop] === 'undefined')
            .map(prop => Object.getOwnPropertyDescriptor(src, prop));
    Object.defineProperties(target, props);
}
global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};
copyProps(window, global);

// Fail tests on any warning
console.error = message => {
    throw new Error(message);
};

//configure enzyme to work with adapter
configure({ adapter: new Adapter() });
