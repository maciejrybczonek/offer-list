import React from 'react';
import { shallow } from 'enzyme';

import { AppComponent, OfferComponent } from 'components';

describe('AppComponent', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<AppComponent />);
    });

    it('renders the OfferComponent', () => {
        expect(wrapper.containsMatchingElement(<OfferComponent />)).toEqual(true);
    });
    
});
