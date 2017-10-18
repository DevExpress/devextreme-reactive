import { shallowEqual } from '@devexpress/dx-core';

export const getActionExecutor = (pluginHost, actionToExecuteName) => {
  const actionsToExecute = pluginHost.collect(`${actionToExecuteName}Action`).slice().reverse();
  return (startingPayload) => {
    let payload = startingPayload;
    // eslint-disable-next-line no-use-before-define
    const { getters } = getAvaliableGetters(pluginHost);
    // eslint-disable-next-line no-use-before-define
    const actions = getAvaliableActions(
      pluginHost,
      actionName => (actionName === actionToExecuteName
        ? (newPayload) => { payload = newPayload; }
        : getActionExecutor(pluginHost, actionName)
      ),
    );
    for (let i = 0; i < actionsToExecute.length; i += 1) {
      const result = actionsToExecute[i](payload, getters, actions);
      if (result === false) {
        break;
      }
    }
  };
};

export const getAvaliableGetters = (
  pluginHost,
  getGetterValue = getterName => pluginHost.get(`${getterName}Getter`),
) => {
  const trackedDependencies = {};
  const getters = pluginHost.knownKeys('Getter')
    .reduce((acc, getterName) => {
      Object.defineProperty(acc, getterName, {
        get: () => {
          const result = getGetterValue(getterName);
          trackedDependencies[getterName] = result;
          return result;
        },
      });
      return acc;
    }, {});

  return { getters, trackedDependencies };
};

export const isTrackedDependenciesChanged = (
  pluginHost,
  prevTrackedDependencies,
  getGetterValue = getterName => pluginHost.get(`${getterName}Getter`),
) => {
  const trackedDependencies = Object.keys(prevTrackedDependencies)
    .reduce((acc, getterName) => Object.assign(acc, {
      [getterName]: getGetterValue(getterName),
    }), {});

  return !shallowEqual(prevTrackedDependencies, trackedDependencies);
};

export const getAvaliableActions = (
  pluginHost,
  getAction = actionName => getActionExecutor(pluginHost, actionName),
) =>
  pluginHost.knownKeys('Action')
    .reduce((acc, actionName) => {
      Object.defineProperty(acc, actionName, {
        get: () => getAction(actionName),
      });
      return acc;
    }, {});
