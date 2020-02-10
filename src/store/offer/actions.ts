import { createAction, ActionType } from 'typesafe-actions';
import { Offer } from 'shared/models';
import * as types from './constants';

export const offerActions = {
    offerSetLoadedPageNumber: createAction(types.OFFER_SET_LOADED_PAGE_NUMBER)<number>(),
    offerSetCanLoadMore: createAction(types.OFFER_SET_CAN_LOAD_MORE)<boolean>(),
    offerSetIsFetching: createAction(types.OFFER_SET_IS_FETCHING)<boolean>(),
    offerSetListViewportPosition: createAction(types.OFFER_SET_LIST_VIEWPORT_POSITION)<number>(),
    offerGetAll: createAction(types.OFFER_GET_ALL)<any>(),
    offerAppend: createAction(types.OFFER_APPEND)<Offer[]>()
};
export type OfferActionsType = ActionType<typeof offerActions>;
