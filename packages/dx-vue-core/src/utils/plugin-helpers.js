export const getAvailableGetters = (
  pluginHost,
  getGetterValue = getterName => pluginHost.get(`${getterName}Getter`),
) =>
  pluginHost.knownKeys('Getter')
    .reduce((acc, getterName) => {
      Object.defineProperty(acc, getterName, {
        get: () => getGetterValue(getterName),
      });
      return acc;
    }, {});

export const getAvailableActions = (
  pluginHost,
  getAction = actionName => pluginHost.collect(`${actionName}Action`).slice().reverse()[0],
) =>
  pluginHost.knownKeys('Action')
    .reduce((acc, actionName) => {
      Object.defineProperty(acc, actionName, {
        get: () => getAction(actionName),
      });
      return acc;
    }, {});
