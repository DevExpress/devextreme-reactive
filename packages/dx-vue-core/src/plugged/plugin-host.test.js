import Vue from 'vue';
import { PluginHost } from './plugin-host';

describe('PluginHost', () => {
  it('is provided through context', () => {
    expect.assertions(1);

    const Plugin = {
      inject: ['pluginHost'],
      render() {
        expect(this.pluginHost).toBeDefined();
        return null;
      },
    };
    const Constructor = Vue.extend({
      render() {
        return (
          <PluginHost>
            <Plugin />
          </PluginHost>
        );
      },
    });
    new Constructor().$mount();
  });
});
