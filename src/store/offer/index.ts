import { OfferSagas } from './sagas';
import { OfferService } from 'shared/services';

const offerSagas = new OfferSagas(new OfferService());

export { offerSagas };
export * from './actions';
export * from './reducers';
