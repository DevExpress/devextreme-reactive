import { shallow, mount } from '@vue/test-utils';
import { PageSizeSelector } from './page-size-selector';


describe('PageSizeSelector', () => {
  const defaultProps = () => ({
    pageSize: 10,
    pageSizes: [5, 10],
    getMessage: key => key,
    onPageSizeChange: () => undefined,
  });

  describe('#render', () => {
    it('can show info about page sizes', () => {
      const tree = mount({
        render() {
          return (
            <PageSizeSelector
              {...{ attrs: defaultProps() }}
            />
          );
        },
      });

      const mobileSelector = tree.findAll('select');
      const mobileSelectorItems = tree.findAll('option');
      const desktopSelectorItems = tree.findAll('li');

      expect(mobileSelector.at(0).element.value).toBe('10');
      expect(mobileSelectorItems).toHaveLength(2);

      expect(mobileSelectorItems.at(0).element.text).toBe('5');
      expect(mobileSelectorItems.at(1).element.text).toBe('10');

      expect(desktopSelectorItems).toHaveLength(2);
      expect(desktopSelectorItems.at(0).element.className).toBe('page-item');
      expect(desktopSelectorItems.at(0).element.textContent).toBe('5');
      expect(desktopSelectorItems.at(1).element.className).toBe('page-item active');
      expect(desktopSelectorItems.at(1).element.textContent).toBe('10');
    });

    it('can render the "All" item', () => {
      const tree = shallow({
        render() {
          return (
            <PageSizeSelector
              {...{ attrs: defaultProps() }}
              pageSizes={[5, 10, 0]}
            />
          );
        },
      });


      const mobileSelectorItems = tree.findAll('option');
      const desktopSelectorItems = tree.findAll('a');

      expect(mobileSelectorItems).toHaveLength(3);
      expect(mobileSelectorItems.at(2).element.value).toBe('0');
      expect(mobileSelectorItems.at(2).element.text).toBe('showAll');

      expect(desktopSelectorItems).toHaveLength(3);
      expect(desktopSelectorItems.at(2).element.textContent).toBe('showAll');
    });

    it('can handle the \'onPageSizeChange\' event', () => {
      const onPageSizeChange = jest.fn();
      const pageSizes = [5, 10, 0];
      const tree = shallow({
        render() {
          return (
            <PageSizeSelector
              {...{ attrs: defaultProps() }}
              pageSizes={pageSizes}
              onPageSizeChange={onPageSizeChange}
            />
          );
        },
      });

      const mobileSelector = tree.find('select');
      const desktopSelectorFirstItem = tree.findAll('a').at(0);

      mobileSelector.element.value = 10;
      mobileSelector.trigger('change');
      desktopSelectorFirstItem.trigger('click');

      expect(onPageSizeChange.mock.calls[0][0]).toBe(10);
      expect(onPageSizeChange.mock.calls[1][0]).toBe(pageSizes[0]);
    });
  });
});
