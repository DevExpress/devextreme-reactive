import { mount } from '@vue/test-utils';
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
    mount({
      render() {
        return (
          <PluginHost>
            <Plugin />
          </PluginHost>
        );
      },
    });
  });
});
