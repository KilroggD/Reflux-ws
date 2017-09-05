import React from 'react';
import Reflux from 'reflux';
import CounterActions from '../actions/CounterActions';
import CounterStore from '../stores/CounterStore';

class Counter extends Reflux.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            status: 'enabled',
        };
        this.processData = this.processData.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.mapStoreToState(CounterStore, (data) => {
            if (typeof data[this.props.id] !== 'undefined') {
                return this.processData(data[this.props.id]);
            }
        });
    }

    processData(data) {
        let stateObj = Object.assign({}, this.state);
        if (typeof data.error !== 'undefined') {
            alert(data.error);
        }
        if (typeof data.number !== 'undefined' && this.state.status !== 'disabled') {
            stateObj.number = data.number;
        }
        if (typeof data.status !== 'undefined') {
            stateObj.status = data.status;
        }
        return stateObj;
    }

    handleClick(e) { //change status on click
        if (this.state.status === 'enabled') {
            CounterActions.disable(this.props.id);
        }
        if (this.state.status === 'disabled') {
            CounterActions.enable(this.props.id);
        }
    }

    render() {
        const counterClass = 'list__counter' + ' '
                + 'list__counter--' + this.state.status;
        return (
                <div onClick={this.handleClick} className={counterClass}>
                    {this.state.number}
                </div>
                );
    }

}
;

export default Counter;
