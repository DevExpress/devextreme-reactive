import { shallow } from '@vue/test-utils';
import { EditCommandHeadingCell, EditCommandCell, CommandButton } from './table-edit-command-cell';

describe('EditCommandCells', () => {
  describe('EditCommandCell', () => {
    it('should pass correct class to the root element', () => {
      const tree = shallow({
        render() {
          return (
            <EditCommandCell />
          );
        },
      });

      expect(tree.is('.p-0.text-nowrap.text-center'))
        .toBeTruthy();
    });
  });

  describe('EditCommandHeadingCell', () => {
    it('should pass correct class to the root element', () => {
      const tree = shallow({
        render() {
          return (
            <EditCommandHeadingCell />
          );
        },
      });

      expect(tree.is('.p-0.text-nowrap.text-center'))
        .toBeTruthy();
    });
  });

  describe('CommandButton', () => {
    it('should pass correct the class to the root element', () => {
      const tree = shallow({
        render() {
          return (
            <CommandButton
              onExecute={() => {}}
              text=""
            />
          );
        },
      });

      expect(tree.is('.btn.btn-link.dx-g-bs4-table-edit-command-cell'))
        .toBeTruthy();
    });
  });
});
