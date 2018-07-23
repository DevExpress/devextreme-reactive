import { shallowEqual } from '@devexpress/dx-core';

export const getAvailableGetters = (
  pluginHost,
  getGetterValue = getterName => pluginHost.get(`${getterName}Getter`),
) => {
  const trackedDependencies = {};
  const getters = pluginHost.knownKeys('Getter')
    .reduce((acc, getterName) => {
      Object.defineProperty(acc, getterName, {
        get: () => {
          const boxedGetter = getGetterValue(getterName);
          trackedDependencies[getterName] = boxedGetter && boxedGetter.id;
          return boxedGetter && boxedGetter.value;
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
    .reduce((acc, getterName) => {
      const boxedGetter = getGetterValue(getterName);
      return Object.assign(acc, {
        [getterName]: boxedGetter && boxedGetter.id,
      });
    }, {});
  return !shallowEqual(prevTrackedDependencies, trackedDependencies);
};

export const getAvailableActions = (
  pluginHost,
  getAction = actionName => pluginHost.collect(`${actionName}Action`).slice().reverse()[0],
) => pluginHost.knownKeys('Action')
  .reduce((acc, actionName) => {
    Object.defineProperty(acc, actionName, {
      get: () => getAction(actionName),
    });
    return acc;
  }, {});
