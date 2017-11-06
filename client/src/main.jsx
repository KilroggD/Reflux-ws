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
