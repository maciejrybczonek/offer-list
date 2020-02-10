import React from 'react';
import { shallow } from 'enzyme';
import { InfiniteScrollComponent } from 'components';
import { initialState } from 'store/offer';

import { OfferListComponent } from './list.component';

describe('OfferListComponent', () => {
    let wrapper, spies, props;

    beforeEach(() => {
        spies = {
            actions: {
                offerGetAll: jest.fn(() => { }),
                offerSetListViewportPosition: jest.fn(() => { })
            },
            scrollTo: jest.fn(() => { })
        }
        Object.defineProperty(global.window, 'scrollTo', { value: spies.scrollTo });
        props = Object.assign(initialState, { actions: spies.actions });
        wrapper = shallow(<OfferListComponent {...props} />);
    });

    it('renders InfiniteScrollComponent and others', () => {
        expect(wrapper.find('InfiniteScrollComponent').length).toEqual(1);
        expect(wrapper.find('div.offer-list-wrapper').length).toEqual(1);
        expect(wrapper.find('h1').length).toEqual(1);
        expect(wrapper.find('ul').length).toEqual(1);
    });

    it('dispatch offerGetAll store action on mount', () => {
        expect(spies.actions.offerGetAll).toHaveBeenCalled();
    });

    it('set scroll position and dispatch offerSetListViewportPosition store action', () => {
        wrapper.setProps({ viewportPosition: 500 });
        expect(spies.actions.offerSetListViewportPosition).toHaveBeenCalled();
        expect(spies.scrollTo).toHaveBeenCalled();
    });

});
