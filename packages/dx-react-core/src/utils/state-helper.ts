import { CreateStateHelperFn } from '../types';

/** @internal */
export const createStateHelper: CreateStateHelperFn = (
  component, controlledStateProperties = {},
) => {
  const notifyStateChange = (nextState, state) => {
    Object.keys(controlledStateProperties).forEach((propertyName) => {
      const changeEvent = controlledStateProperties[propertyName]();
      if (changeEvent && nextState[propertyName] !== state[propertyName]) {
        changeEvent(nextState[propertyName]);
      }
    });
  };

  let lastStateUpdater: (state) => void;
  let initialState = null;
  let lastInitialState = null;
  let newState = null;
  let shouldNotify = false;

  const applyReducer = (reduce, payload?, callback?) => {
    const stateUpdater = (prevState) => {
      if (initialState === null) {
        initialState = prevState;
      }
      const stateChange = reduce({ ...prevState }, payload);
      const state = { ...prevState, ...stateChange };

      if (typeof callback === 'function') {
        callback(state, prevState);
      }
      if (stateUpdater === lastStateUpdater) {
        if (lastInitialState !== initialState) {
          newState = state;
          if (!shouldNotify) {
            lastInitialState = initialState;
            shouldNotify = true;
          }
        }
        initialState = null;
      }

      return stateChange;
    };
    lastStateUpdater = stateUpdater;

    component.setState(stateUpdater, () => {
      if (shouldNotify) {
        notifyStateChange(newState, lastInitialState);
        shouldNotify = false;
      }
    });
  };
  const applyFieldReducer = (field, reduce, payload) => {
    applyReducer(state => ({
      [field]: reduce(state[field], payload),
    }));
  };

  return {
    applyReducer,
    applyFieldReducer,
  };
};
