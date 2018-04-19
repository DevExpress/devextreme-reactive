import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { GroupPanelLayout } from './group-panel-layout';


const defaultProps = {
  containerComponent: ({ children }) => children,
  itemComponent: () => null,
  emptyMessageComponent: () => null,
};

describe('GroupPanelLayout', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should render group panel with items', () => {
    const items = [
      { column: { name: 'a' } },
      { column: { name: 'b' } },
      { column: { name: 'c' } },
      { column: { name: 'd' } },
    ];
    const tree = mount((
      <GroupPanelLayout
        {...defaultProps}
        items={items}
      />
    ));

    expect(tree.find(defaultProps.itemComponent).length)
      .toBe(items.length);
  });

  it('should render group panel with text when no grouping is specified', () => {
    const tree = mount((
      <GroupPanelLayout
        {...defaultProps}
        items={[]}
      />
    ));

    expect(tree.find(defaultProps.emptyMessageComponent).exists())
      .toBeTruthy();
  });
});
