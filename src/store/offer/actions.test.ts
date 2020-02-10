import { offerActions } from './actions'
import * as types from './constants';

describe('offer actions', () => {

    it(types.OFFER_SET_LOADED_PAGE_NUMBER, () => {
        const expectedAction = {
            type: types.OFFER_SET_LOADED_PAGE_NUMBER,
            payload: 1
        }
        expect(offerActions.offerSetLoadedPageNumber(1)).toEqual(expectedAction);
    });

    it(types.OFFER_SET_CAN_LOAD_MORE, () => {
        const expectedAction = {
            type: types.OFFER_SET_CAN_LOAD_MORE,
            payload: true
        }
        expect(offerActions.offerSetCanLoadMore(true)).toEqual(expectedAction);
    });

    it(types.OFFER_SET_IS_FETCHING, () => {
        const expectedAction = {
            type: types.OFFER_SET_IS_FETCHING,
            payload: true
        }
        expect(offerActions.offerSetIsFetching(true)).toEqual(expectedAction);
    });

    it(types.OFFER_SET_LIST_VIEWPORT_POSITION, () => {
        const expectedAction = {
            type: types.OFFER_SET_LIST_VIEWPORT_POSITION,
            payload: 500
        }
        expect(offerActions.offerSetListViewportPosition(500)).toEqual(expectedAction);
    });

    it(types.OFFER_GET_ALL, () => {
        let payload = {
            status: 'published'
        };
        const expectedAction = {
            type: types.OFFER_GET_ALL,
            payload
        }
        expect(offerActions.offerGetAll(payload)).toEqual(expectedAction);
    });

    it(types.OFFER_APPEND, () => {
        let payload = [{
            id: 1,
            title: 'test',
            description: 'test',
            img_url: 'https://example.com',
            price: 100,
            discount: 50,
            rating: 5,
            status: 'published',
            created_at: new Date().toString()
        }];
        const expectedAction = {
            type: types.OFFER_APPEND,
            payload
        }
        expect(offerActions.offerAppend(payload)).toEqual(expectedAction);
    });

})
