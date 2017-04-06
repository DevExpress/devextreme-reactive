export const getAction = (pluginHost, actionName) => {
  const actions = pluginHost.collect(`${actionName}Action`).reverse();
  return params => actions.forEach(action => action(params));
};
