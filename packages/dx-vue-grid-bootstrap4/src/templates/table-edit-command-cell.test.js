import { shallow } from '@vue/test-utils';
import { EditCommandHeadingCell, EditCommandCell, CommandButton } from './table-edit-command-cell';

describe('EditCommandCells', () => {
  describe('EditCommandCell', () => {
    it('should pass custom class to the root element', () => {
      const tree = shallow({
        render() {
          return (
            <EditCommandCell class="custom-class" />
          );
        },
      });

      expect(tree.is('.p-0.text-nowrap.text-center.custom-class'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow({
        render() {
          return (
            <EditCommandCell data="123" />
          );
        },
      });
      expect(tree.attributes().data)
        .toBe('123');
    });
  });

  describe('EditCommandHeadingCell', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow({
        render() {
          return (
            <EditCommandHeadingCell class="custom-class" />
          );
        },
      });

      expect(tree.is('.p-0.text-nowrap.text-center.custom-class'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow({
        render() {
          return (
            <EditCommandHeadingCell data="123" />
          );
        },
      });
      expect(tree.attributes().data)
        .toBe('123');
    });
  });

  describe('CommandButton', () => {
    it('should pass the className prop to the root element', () => {
      const tree = shallow({
        render() {
          return (
            <CommandButton
              onExecute={() => {}}
              text=""
              class="custom-class"
            />
          );
        },
      });

      expect(tree.is('.btn.btn-link.dx-g-bs4-table-edit-command-cell.custom-class'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow({
        render() {
          return (
            <CommandButton
              onExecute={() => {}}
              text=""
              data="123"
            />
          );
        },
      });

      expect(tree.attributes().data)
        .toBe('123');
    });
  });
});
