import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { AppComponent } from 'components';
import { store } from 'store';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <AppComponent />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
