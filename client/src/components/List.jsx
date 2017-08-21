import React from 'react';
import Reflux from 'reflux';
import Item from './Item';
import CounterStore from '../stores/CounterStore';
import CounterActions from '../actions/CounterActions';

class List extends Reflux.Component {
    
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        let ids = [];
        this.props.items.forEach((item) => {
           ids.push(item.id); 
        });
        Reflux.initStore(CounterStore);
        CounterActions.init(ids);
    }
    
    render() {
        return (
                <div className="list">
                {
                    this.props.items.map((item, index) => {
                        item.key = index;
                        return <Item {...item} />
                    })
                }
                </div>
               );
    }
    
};

export default List;