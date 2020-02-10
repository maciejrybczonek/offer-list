import React from 'react';
import { shallow } from 'enzyme';
import { Router, View } from 'react-navi'

import { OfferComponent } from 'components';

describe('OfferComponent', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<OfferComponent />);
    });

    it('renders Router & View', () => {
        expect(wrapper.containsMatchingElement(<Router><View /></Router>)).toEqual(true);
    });

});
