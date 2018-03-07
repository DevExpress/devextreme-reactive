import { mount } from '@vue/test-utils';
import { PluginIndexer } from './plugin-indexer';
import { POSITION_CONTEXT } from './constants';

const Test = {
  inject: { positionContext: { from: POSITION_CONTEXT } },
  render() {
    return <span>{JSON.stringify(this.positionContext())}</span>;
  },
};

describe('PluginIndexer', () => {
  it('should correctly determine plugin position', () => {
    const wrapper = mount({
      render() {
        return (
          <PluginIndexer>
            <Test />
          </PluginIndexer>
        );
      },
    });

    expect(JSON.parse(wrapper.find(Test).text()))
      .toEqual([0]);
  });

  it('should correctly determine plugin position after children change', () => {
    const Test1 = {
      props: { enableGetter: {} },
      render() {
        return (
          <PluginIndexer>
            {this.enableGetter && <Test />}
            <Test />
          </PluginIndexer>
        );
      },
    };

    const wrapper = mount({
      data() {
        return { enabled: false };
      },
      render() {
        return (
          <Test1 enableGetter={this.enabled} />
        );
      },
    });

    wrapper.setData({ enabled: true });

    const tests = wrapper.findAll('span');
    expect([tests.at(0), tests.at(1)]
      .map(element => JSON.parse(element.text())))
      .toEqual([[0], [1]]);
  });

  it('should correctly determine plugin position within another component', () => {
    const wrapper = mount({
      render() {
        return (
          <PluginIndexer>
            <PluginIndexer>
              <Test />
              <Test />
            </PluginIndexer>
            <Test />
          </PluginIndexer>
        );
      },
    });

    const tests = wrapper.findAll('span');
    expect([tests.at(0), tests.at(1), tests.at(2)]
      .map(element => JSON.parse(element.text())))
      .toEqual([[0, 0], [0, 1], [1]]);
  });
});
