import React from 'react';
import ReactDOM from 'react-dom';
import List from './components/List';
import '../css/style.css';

window.onload = () => {
    let items = [
        {id: 1, name: "User 1"},
        {id: 2, name: "User 2"},
        {id: 3, name: "User 3"},
        {id: 4, name: "User 4"},
    ];
    ReactDOM.render(
            <List items={items} />,
            document.getElementById('list')
            );
};
