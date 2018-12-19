import { shallowEqual } from '@devexpress/dx-core';

/** @internal */
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
        const result = getGetterValue(prop);
        trackedDependencies[prop] = result;
        return result;
      },
      getOwnPropertyDescriptor(target, prop) {
        return {
          configurable: true,
          enumerable: true,
          value: this.get!(target as any, prop, undefined),
        };
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

/** @internal */
export const isTrackedDependenciesChanged = (
  pluginHost,
  prevTrackedDependencies,
  getGetterValue = getterName => pluginHost.get(`${getterName}Getter`),
) => {
  const trackedDependencies = Object.keys(prevTrackedDependencies)
    // tslint:disable-next-line: prefer-object-spread
    .reduce((acc, getterName) => Object.assign(acc, {
      [getterName]: getGetterValue(getterName),
    }), {});

  return !shallowEqual(prevTrackedDependencies, trackedDependencies);
};

/** @internal */
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
        return {
          configurable: true,
          enumerable: true,
          value: this.get!(target as any, prop, undefined),
        };
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
