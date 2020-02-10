import * as constants from './constants';
import { Offer } from 'shared/models';
import { OfferActionsType } from './actions';

export interface OfferState {
    loadedOffers: Offer[];
    limit: number,
    loadedPage: number,
    canLoadMore: boolean,
    isFetching: boolean,
    viewportPosition: number
}

export const initialState: OfferState = {
    loadedOffers: [],
    limit: 20,
    loadedPage: 0,
    canLoadMore: true,
    isFetching: false,
    viewportPosition: 0
};

export function offerReducer<OfferState>(state = initialState, action: OfferActionsType) {
    switch (action.type) {
        case constants.OFFER_SET_LOADED_PAGE_NUMBER:
            return {
                ...state,
                loadedPage: action.payload
            }
        case constants.OFFER_SET_CAN_LOAD_MORE:
            return {
                ...state,
                canLoadMore: action.payload
            }
        case constants.OFFER_SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        case constants.OFFER_SET_LIST_VIEWPORT_POSITION:
            return {
                ...state,
                viewportPosition: action.payload
            }
        case constants.OFFER_APPEND:
            return {
                ...state,
                loadedOffers: [...state.loadedOffers, ...action.payload]
            }
        default:
            return state
    }
}
