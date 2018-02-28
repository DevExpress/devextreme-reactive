const STATE_CONSISTENCY_TIMEOUT = 1000 / 60;

export const createStateHelper = (component, controlledStateProperties = {}) => {
  const stateConsistencyTimers = {};
  const checkStateConsistency = (propertyName) => {
    if (component.props[propertyName] !== undefined
      && component.props[propertyName] !== component.state[propertyName]) {
      component.setState({ [propertyName]: component.props[propertyName] });
    }
  };
  const notifyStateChange = (nextState, state) => {
    Object.keys(controlledStateProperties).forEach((propertyName) => {
      const changeEvent = controlledStateProperties[propertyName]();
      if (changeEvent && nextState[propertyName] !== state[propertyName]) {
        changeEvent(nextState[propertyName]);
        clearTimeout(stateConsistencyTimers[propertyName]);
        stateConsistencyTimers[propertyName] = setTimeout(
          checkStateConsistency.bind(null, propertyName),
          STATE_CONSISTENCY_TIMEOUT,
        );
      }
    });
  };

  let lastStateUpdater = null;
  let initialState = null;
  const applyReducer = (reduce, payload, callback) => {
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
        notifyStateChange(state, initialState);
        initialState = null;
      }

      return stateChange;
    };
    lastStateUpdater = stateUpdater;
    component.setState(stateUpdater);
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
