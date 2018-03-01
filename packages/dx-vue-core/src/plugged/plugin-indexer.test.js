import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginIndexer } from './plugin-indexer';

const Test = {
  inject: ['positionContext'],
  render() {
    return <span />;
  },
};

xdescribe('PluginIndexer', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

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

    expect(wrapper.find(Test).vm.positionContext())
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

    const tree = mount({
      data() {
        return { enabled: false };
      },
      render() {
        return (
          <Test1 enableGetter={this.enabled} />
        );
      },
    });

    tree.setData({ enabled: true });

    const tests = tree.findAll(Test);
    expect([tests.at(0), tests.at(1)]
      .map(wrapper => JSON.parse(wrapper.find('span').text())))
      .toEqual([[0], [1]]);
  });

  it('should correctly determine plugin position within another component', () => {
    const tree = mount((
      <PluginIndexer>
        <div>
          <PluginIndexer>
            <Test />
            <Test />
          </PluginIndexer>
        </div>
        <Test />
      </PluginIndexer>
    ));

    const tests = tree.find(Test);
    expect([tests.at(0), tests.at(1), tests.at(2)]
      .map(wrapper => wrapper.prop('position')()))
      .toEqual([[0, 0], [0, 1], [1]]);
  });
});
