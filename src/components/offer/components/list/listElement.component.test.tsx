import React from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-navi';
import { InfiniteScrollComponent } from 'components';

import { OfferListElementComponent } from './listElement.component';

describe('OfferListElementComponent', () => {
    let wrapper, spies, props,
        mockedOffer = {
            id: 1,
            title: 'test',
            description: 'test',
            img_url: 'https://example.com',
            price: 100,
            discount: 50,
            rating: 5,
            status: 'published',
            created_at: new Date().toString()
        }

    beforeEach(() => {
        spies = {
            handleOfferClick: jest.spyOn(OfferListElementComponent.prototype, 'handleOfferClick'),
            clickCallback: jest.fn(() => { })
        };
        wrapper = mount(<OfferListElementComponent clickCallback={spies.clickCallback} offer={mockedOffer} />);
    });

    it('renders Link and others', () => {
        expect(wrapper.find('li').length).toEqual(1);
        expect(wrapper.find('a').length).toEqual(1);
        expect(wrapper.find('img').length).toEqual(1);
        expect(wrapper.find('.offer-list-description').length).toEqual(1);
        expect(wrapper.find('h2').length).toEqual(1);
        expect(wrapper.find('p').length).toEqual(1);
        expect(wrapper.find('h3').length).toEqual(1);
        expect(wrapper.find('.offer-list-details-link').length).toEqual(1);
    });

    it('fires callback on click', () => {
        wrapper.find('li').prop('onClick')();
        expect(spies.handleOfferClick).toHaveBeenCalled();
        expect(spies.clickCallback).toHaveBeenCalled();
    });

});
