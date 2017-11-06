import {shallow} from 'enzyme';
import React from 'react';
import Item from '../components/Item';
import Counter from '../components/Counter';

describe ('<Item /> component spec', () => {
    
    const dummyProps = {
        id: 1, 
        name: 'Name',
    }
    const item = shallow(<Item {...dummyProps} />);
    it('should contain the name label', () => {
        expect(item.find('.list__name').length).toEqual(1);
    });
    
    it('should containt the <Counter /> child', () => {
        expect(item.find(Counter).length).toEqual(1);
    });
    
});