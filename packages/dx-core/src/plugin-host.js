import { insertPlugin } from './utils';

const getDependencyError = (pluginName, dependencyName) =>
  new Error(`The '${pluginName}' plugin requires '${dependencyName}' to be defined before it.`);

export class PluginHost {
  constructor() {
    this.plugins = [];
    this.subscriptions = [];
    this.gettersCache = {};
  }
  ensureDependencies() {
    const defined = new Set();
    const knownOptionals = new Map();
    this.plugins
      .filter(plugin => plugin.container)
      .forEach((plugin) => {
        if (knownOptionals.has(plugin.pluginName)) {
          throw (getDependencyError(knownOptionals.get(plugin.pluginName), plugin.pluginName));
        }

        plugin.dependencies
          .forEach((dependency) => {
            if (defined.has(dependency.pluginName)) return;
            if (dependency.optional) {
              if (!knownOptionals.has(dependency.pluginName)) {
                knownOptionals.set(dependency.pluginName, plugin.pluginName);
              }
              return;
            }
            throw (getDependencyError(plugin.pluginName, dependency.pluginName));
          });

        defined.add(plugin.pluginName);
      });
  }
  registerPlugin(plugin) {
    this.plugins = insertPlugin(this.plugins, plugin);
    this.cleanPluginsCache();
  }
  unregisterPlugin(plugin) {
    this.plugins.splice(this.plugins.indexOf(plugin), 1);
    this.cleanPluginsCache();
  }
  cleanPluginsCache() {
    this.validationRequired = true;
    this.gettersCache = {};
  }
  collect(key, upTo) {
    if (this.validationRequired) {
      this.ensureDependencies();
      this.validationRequired = false;
    }

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
