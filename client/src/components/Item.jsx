import React from 'react';
import Counter from './Counter';

const Item = (props) => {
    return (
            <div className="list__item">
                <div className="list__name">{props.name}</div>
                <Counter id={props.id} />
            </div>
    );  
};

export default Item;
