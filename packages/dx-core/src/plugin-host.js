import { insertWithSorting } from './utils';

const getErrorMessage = (pluginName, dependencyName) =>
  `The '${pluginName}' plugin requires '${dependencyName}' to be defined.`;

export class PluginHost {
  constructor() {
    this.plugins = [];
    this.subscriptions = [];
    this.gettersCache = {};
  }
  registerPlugin(plugin) {
    this.plugins = insertWithSorting(plugin, this.plugins);
    this.cleanPluginsCache();
  }
  unregisterPlugin(plugin) {
    this.plugins.splice(this.plugins.indexOf(plugin), 1);
    this.cleanPluginsCache();
  }
  registerPluginContainer(pluginContainer) {
    const undefinedPluginName = pluginContainer.dependencies.reduce((acc, dep) => {
      const isDependencyDefined = !dep.optional
        && this.plugins.findIndex(p => p.pluginName === dep.pluginName) === -1;
      const pluginName = isDependencyDefined && dep.pluginName;
      return acc || pluginName;
    }, null);

    if (undefinedPluginName) {
      throw (new Error(getErrorMessage(pluginContainer.pluginName, undefinedPluginName)));
    }

    this.registerPlugin(pluginContainer);
  }
  unregisterPluginContainer(pluginContainer) {
    const index = this.plugins.findIndex(p => p.pluginName === pluginContainer.pluginName);
    const firstDep = this.plugins.slice(index)
      .filter(p => p.dependencies.findIndex(
        d => d.pluginName === pluginContainer.pluginName) !== -1)[0];

    if (firstDep) {
      throw (new Error(getErrorMessage(firstDep.pluginName, pluginContainer.pluginName)));
    }

    this.unregisterPlugin(pluginContainer);
  }
  cleanPluginsCache() {
    this.gettersCache = {};
  }
  collect(key, upTo) {
    if (!this.gettersCache[key]) {
      this.gettersCache[key] = this.plugins.map(plugin => plugin[key]).filter(plugin => !!plugin);
    }
    if (!upTo) return this.gettersCache[key];

    const upToIndex = this.plugins.indexOf(upTo);
    return this.gettersCache[key].filter((getter) => {
      const pluginIndex = this.plugins.findIndex(plugin => plugin[key] === getter);
      return pluginIndex < upToIndex;
    });
  }
  get(key, upTo) {
    const plugins = this.collect(key, upTo);

    if (!plugins.length) return undefined;

    let result = plugins[0]();
    plugins.slice(1).forEach((plugin) => {
      result = plugin(result);
    });
    return result;
  }
  registerSubscription(subscription) {
    const index = this.subscriptions.indexOf(subscription);
    if (index === -1) { this.subscriptions.push(subscription); }
  }
  unregisterSubscription(subscription) {
    const index = this.subscriptions.indexOf(subscription);
    if (index !== -1) { this.subscriptions.splice(this.subscriptions.indexOf(subscription), 1); }
  }
  broadcast(event, message) {
    this.subscriptions.forEach(subscription => subscription[event] && subscription[event](message));
  }
}
