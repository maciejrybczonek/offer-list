import { offerReducer, initialState } from './reducers';
import { offerActions } from './actions'
import * as types from './constants';

describe('offer reducers', () => {

    it('should return the initial state', () => {
        expect(offerReducer(undefined, {})).toEqual(initialState)
    });

    it(`should handle ${types.OFFER_SET_LOADED_PAGE_NUMBER}`, () => {
        let action = offerActions.offerSetLoadedPageNumber(1);
        expect(offerReducer(undefined, action)).toEqual({
            ...initialState,
            loadedPage: 1
        })
    });

    it(`should handle ${types.OFFER_SET_CAN_LOAD_MORE}`, () => {
        let action = offerActions.offerSetCanLoadMore(false);
        expect(offerReducer(undefined, action)).toEqual({
            ...initialState,
            canLoadMore: false
        })
    });

    it(`should handle ${types.OFFER_SET_IS_FETCHING}`, () => {
        let action = offerActions.offerSetIsFetching(true);
        expect(offerReducer(undefined, action)).toEqual({
            ...initialState,
            isFetching: true
        })
    });

    it(`should handle ${types.OFFER_SET_LIST_VIEWPORT_POSITION}`, () => {
        let action = offerActions.offerSetListViewportPosition(500);
        expect(offerReducer(undefined, action)).toEqual({
            ...initialState,
            viewportPosition: 500
        })
    });

    it(`should handle ${types.OFFER_APPEND}`, () => {
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
        let action = offerActions.offerAppend(payload);
        expect(offerReducer(undefined, action)).toEqual({
            ...initialState,
            loadedOffers: payload
        })
    });

})
