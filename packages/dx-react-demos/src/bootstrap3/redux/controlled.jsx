/* global window */

import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import gridReducer from './grid-reducer';
import GridContainer from './grid-container';

const store = createStore(
  gridReducer,
  // Uncomment to enable Redux Dev Tools (https://github.com/zalmoxisus/redux-devtools-extension)
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export const ControlledDemo = () => (
  <Provider store={store}>
    <GridContainer />
  </Provider>
);
