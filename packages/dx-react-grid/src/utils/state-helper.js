export const createStateHelper = (component) => {
  let lastStateUpdater = null;
  let initialState = null;

  const applyReducer = (reduce, payload, callback) => {
    const stateUpdater = (prevState) => {
      const state = {
        ...component.getState(prevState),
        ...(component.state !== prevState ? prevState : null),
      };
      if (initialState === null) {
        initialState = state;
      }
      const nextState = { ...state, ...reduce(state, payload) };

      if (typeof callback === 'function') {
        callback(nextState, state);
      }
      if (stateUpdater === lastStateUpdater) {
        component.notifyStateChange(nextState, initialState);
        initialState = null;
      }

      return nextState;
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
