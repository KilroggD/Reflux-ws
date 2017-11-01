import React from 'react';
import Reflux from 'reflux';
import Item from './Item';
import CounterStore from '../stores/CounterStore';
import CounterActions from '../actions/CounterActions';
import Info from './Info';

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
            <Info infoUrl={this.props.infoUrl} />
            </div>
           );
    }
    
};

export default List;
