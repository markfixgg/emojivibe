import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'

import { Provider } from 'react-redux';
import { store } from "./store";

let persistor = persistStore(store);

render(<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <Popup />
    </PersistGate>
</Provider>, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
