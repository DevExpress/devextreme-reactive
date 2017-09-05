import { shallowEqual } from '@devexpress/dx-core';

export const getAction = (pluginHost, actionName) => {
  const actions = pluginHost.collect(`${actionName}Action`).reverse();
  return params => actions.forEach(action => action(params));
};

export const getAllAvaliableGetters = (
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
        enumerable: true, // TODO: remove it?
      });
      return acc;
    }, {});

  return { getters, trackedDependencies };
};

export const isTrackedDependenciesChanged = (
  pluginHost,
  previousTrackedDependencies,
  getGetterValue = getterName => pluginHost.get(`${getterName}Getter`),
) => {
  const trackedDependencies = Object.keys(previousTrackedDependencies)
    .reduce((acc, getterName) => Object.assign(acc, {
      [getterName]: getGetterValue(getterName),
    }), {});

  return !shallowEqual(previousTrackedDependencies, trackedDependencies);
};

export const getAllAvaliableActions = pluginHost =>
  pluginHost.knownKeys('Action')
    .reduce((acc, actionName) => {
      Object.defineProperty(acc, actionName, {
        get: () => getAction(pluginHost, actionName),
        enumerable: true, // TODO: remove it?
      });
      return acc;
    }, {});
