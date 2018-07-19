import { shallowEqual } from '@devexpress/dx-core';

export const getAvailableGetters = (
  pluginHost,
  getGetterValue = getterName => pluginHost.get(`${getterName}Getter`),
) => {
  const trackedDependencies = {};

  let getters;
  if (Proxy) {
    getters = new Proxy({}, {
      get(target, prop) {
        const result = getGetterValue(prop);
        trackedDependencies[prop] = result;
        return result;
      },
    });
  } else {
    getters = pluginHost.knownKeys('Getter')
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
  }

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
) => {
  let actions;
  if (Proxy) {
    actions = new Proxy({}, {
      get(target, prop) {
        return getAction(prop);
      },
    });
  } else {
    actions = pluginHost.knownKeys('Action')
      .reduce((acc, actionName) => {
        Object.defineProperty(acc, actionName, {
          get: () => getAction(actionName),
        });
        return acc;
      }, {});
  }
  return actions;
};
