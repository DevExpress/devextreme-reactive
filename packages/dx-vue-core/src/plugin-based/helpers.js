import { shallowEqual } from '@devexpress/dx-core';

export const getAvailableGetters = (
  pluginHost,
  getGetterValue = getterName => pluginHost.get(`${getterName}Getter`),
) => {
  const trackedDependencies = {};

  let getters;
  if (typeof Proxy !== 'undefined') {
    getters = new Proxy({}, {
      get(target, prop) {
        if (typeof prop !== 'string') return undefined;
        const boxedGetter = getGetterValue(prop);
        trackedDependencies[prop] = boxedGetter && boxedGetter.id;
        return boxedGetter && boxedGetter.value;
      },
      getOwnPropertyDescriptor(target, prop) {
        return { configurable: true, enumerable: true, value: this.get(target, prop) };
      },
      ownKeys() {
        return pluginHost.knownKeys('Getter');
      },
    });
  } else {
    getters = pluginHost.knownKeys('Getter')
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
  if (typeof Proxy !== 'undefined') {
    actions = new Proxy({}, {
      get(target, prop) {
        if (typeof prop !== 'string') return undefined;
        return getAction(prop);
      },
      getOwnPropertyDescriptor(target, prop) {
        return { configurable: true, enumerable: true, value: this.get(target, prop) };
      },
      ownKeys() {
        return pluginHost.knownKeys('Action');
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
