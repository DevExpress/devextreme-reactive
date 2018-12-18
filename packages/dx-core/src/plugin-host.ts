import { insertPlugin } from './utils';

const getDependencyError = (
  pluginName, dependencyName,
  ) => new Error(
    `The '${pluginName}' plugin requires '${dependencyName}' to be defined before it.`,
  );

interface IPluginBase {
  position: Function;
  name?: string;
  dependencies?: { name: string, optional?: boolean }[];
}
interface IPluginWithGetter {
  [getterName: string]: (params: any) => any;
}
export type InnerPlugin = IPluginWithGetter & IPluginBase;

export class PluginHost {
  plugins: InnerPlugin[];
  subscriptions: Set<any>;
  gettersCache: object;
  knownKeysCache: object;
  validationRequired: boolean;

  constructor() {
    this.plugins = [];
    this.subscriptions = new Set();
    this.gettersCache = {};
  }

  ensureDependencies() {
    const defined: Set<string> = new Set();
    const knownOptionals: Map<string, string> = new Map();
    this.plugins
      .filter(plugin => plugin.container)
      .forEach((plugin) => {
        const pluginName = plugin.name || '';
        if (knownOptionals.has(pluginName)) {
          throw (getDependencyError(knownOptionals.get(pluginName), pluginName));
        }

        (plugin.dependencies || [])
          .forEach((dependency) => {
            if (defined.has(dependency.name)) return;
            if (dependency.optional) {
              if (!knownOptionals.has(dependency.name)) {
                knownOptionals.set(dependency.name, pluginName);
              }
              return;
            }
            throw (getDependencyError(pluginName, dependency.name));
          });

        defined.add(pluginName);
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

  collect(key, upTo?) {
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
    this.subscriptions.add(subscription);
  }

  unregisterSubscription(subscription) {
    this.subscriptions.delete(subscription);
  }

  broadcast(event, message?: any) {
    this.subscriptions.forEach(subscription => subscription[event] && subscription[event](message));
  }
}
