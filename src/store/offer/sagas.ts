import { boundMethod } from 'autobind-decorator'
import { put, takeEvery, select } from 'redux-saga/effects';
import { offerActions, OfferActionsType } from './actions';
import { OfferService } from 'shared/services';

export class OfferSagas {

    offerService: OfferService;

    constructor(offerService: OfferService) {
        this.offerService = offerService;
    }

    @boundMethod
    * getOffers(action: OfferActionsType) {
        yield put(offerActions.offerSetIsFetching(true));

        let offerLimit = yield select((state) => state.offer.limit);
        let loadedPage = yield select((state) => state.offer.loadedPage);
        const offers = yield this.offerService.getList(Object.assign({
            offset: offerLimit * loadedPage,
            limit: offerLimit
        }, action.payload))
            .then(response => response.json())
            .catch(error => {}); // TODO: Add error handling
        yield put(offerActions.offerSetLoadedPageNumber(loadedPage + 1)); // increment page number
        if (offers.length < offerLimit) {
            yield put(offerActions.offerSetCanLoadMore(false)); // disable infinite scroll if there is no more offers
        }
        yield put(offerActions.offerAppend(offers));

        yield put(offerActions.offerSetIsFetching(false));
    }

    * watchers() {
        yield takeEvery(offerActions.offerGetAll, this.getOffers);
    }

}
