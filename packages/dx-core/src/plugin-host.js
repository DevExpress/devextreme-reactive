import { insertPlugin } from './utils';

const getDependencyError = (pluginName, dependencyName) => new Error(`The '${pluginName}' plugin requires '${dependencyName}' to be defined before it.`);

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
        if (knownOptionals.has(plugin.name)) {
          throw (getDependencyError(knownOptionals.get(plugin.name), plugin.name));
        }

        plugin.dependencies
          .forEach((dependency) => {
            if (defined.has(dependency.name)) return;
            if (dependency.optional) {
              if (!knownOptionals.has(dependency.name)) {
                knownOptionals.set(dependency.name, plugin.name);
              }
              return;
            }
            throw (getDependencyError(plugin.name, dependency.name));
          });

        defined.add(plugin.name);
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
    this.knownKeysCache = {};
  }

  knownKeys(postfix) {
    if (!this.knownKeysCache[postfix]) {
      this.knownKeysCache[postfix] = Array.from(this.plugins
        .map(plugin => Object.keys(plugin))
        .map(keys => keys.filter(key => key.endsWith(postfix))[0])
        .filter(key => !!key)
        .reduce((acc, key) => acc.add(key), new Set()))
        .map(key => key.replace(postfix, ''));
    }
    return this.knownKeysCache[postfix];
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
