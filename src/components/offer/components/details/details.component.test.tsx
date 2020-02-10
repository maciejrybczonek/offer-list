import React from 'react';
import { mount } from 'enzyme';

import { OfferDetailsComponent } from './details.component';

describe('OfferDetailsComponent', () => {
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
        },
        mockedOfferService = {
            getDetails: jest.fn((id) => Promise.resolve({
                status: 200,
                json: () => {
                    return Promise.resolve(mockedOffer);
                }
            }))
        }

    beforeEach(() => {
        wrapper = mount(<OfferDetailsComponent offerService={mockedOfferService} />);
        wrapper.setState({
            offer: null,
            isFetching: true
        })
    });

    it('renders', () => {
        expect(wrapper.find('.offer-details-wrapper').length).toEqual(1);
        expect(wrapper.find('a').length).toEqual(1);
        expect(wrapper.find('.offer-details-box').length).toEqual(1);
        expect(wrapper.find('.loader'));
    });

    it('fires callback on click', () => {
        expect(mockedOfferService.getDetails).toHaveBeenCalled();
    });

});
