import { insertWithSorting } from './utils';

const getDependencyErrorMessage = (pluginName, dependencyName) =>
  `The '${pluginName}' plugin requires '${dependencyName}' to be defined.`;

export class PluginHost {
  constructor() {
    this.plugins = [];
    this.subscriptions = [];
    this.gettersCache = {};
  }
  registerPlugin(plugin) {
    if (plugin.isContainer) {
      const undefinedPluginName = plugin.dependencies.reduce((acc, dep) => {
        const isDependencyDefined = !dep.optional
          && this.plugins.findIndex(p => p.pluginName === dep.pluginName) === -1;
        const pluginName = isDependencyDefined && dep.pluginName;
        return acc || pluginName;
      }, null);

      if (undefinedPluginName) {
        throw (new Error(getDependencyErrorMessage(plugin.pluginName, undefinedPluginName)));
      }
    }

    this.plugins = insertWithSorting(plugin, this.plugins);
    this.cleanPluginsCache();
  }
  unregisterPlugin(plugin) {
    if (plugin.isContainer) {
      const index = this.plugins.findIndex(p => p.pluginName === plugin.pluginName);
      const firstDep = this.plugins.slice(index)
        .filter(p => p.dependencies.findIndex(
          d => d.pluginName === plugin.pluginName) !== -1)[0];

      if (firstDep) {
        throw (new Error(getDependencyErrorMessage(firstDep.pluginName, plugin.pluginName)));
      }
    }
    this.plugins.splice(this.plugins.indexOf(plugin), 1);
    this.cleanPluginsCache();
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
