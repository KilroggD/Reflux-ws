import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List';
import '../css/style.css';

window.onload = () => {
    const items = [
        {id: 1, name: "User 1"},
        {id: 2, name: "User 2"},
        {id: 3, name: "User 3"},
        {id: 4, name: "User 4"},
    ];
    const infoUrl = 'http://localhost:3001/info';
    ReactDOM.render(
        <List items={items} infoUrl={infoUrl} />,
        document.getElementById('list')
    );
};


//npm i --save-dev jest
//npm i --save-dev enzyme enzyme-adapter-react-15
//npm i --save-dev enzyme-matchers
//npm i --save-dev jest-enzyme
//npm i --save-dev mock-socket
//npm i --save-dev jsdom
//npm i --save-dev react-test-renderer
//npm i --save-dev babel-preset-env
//npm i --save-dev babel-plugin-transform-runtime