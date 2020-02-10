import { combineReducers, createStore, applyMiddleware } from 'redux';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga'
import { offerReducer, offerSagas } from './offer';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware()


export const rootReducer = combineReducers({ offer: offerReducer });
const rootSaga = function* rootSaga() {
    yield all([
        offerSagas.watchers()
    ])
}

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(sagaMiddleware),
));
sagaMiddleware.run(rootSaga);

export { store }
