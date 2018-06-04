import { mount } from '@vue/test-utils';
import { Item } from './item';


describe('Item', () => {
  it('should mark checkbox as checked if "hidden" property is false', () => {
    const tree = mount({
      render() {
        return (
          <Item
            item={{
              column: { name: 'a', title: 'A' },
              hidden: false,
            }}
            onToggle={() => {}}
          />
        );
      },
    });
    expect(tree.find('input[type="checkbox"]').element.checked)
      .toBe(true);
  });

  it('shouldn\'t mark checkbox as checked if "hidden" property is true', () => {
    const tree = mount({
      render() {
        return (
          <Item
            item={{
              column: { name: 'a', title: 'A' },
              hidden: true,
            }}
            onToggle={() => {}}
          />
        );
      },
    });
    expect(tree.find('input[type="checkbox"]').element.checked)
      .toBe(false);
  });
});
