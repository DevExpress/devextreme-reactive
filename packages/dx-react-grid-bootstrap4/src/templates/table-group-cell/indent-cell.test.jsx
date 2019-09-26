import * as React from 'react';
import { shallow } from 'enzyme';
import { IndentCell } from './indent-cell';

describe('TableGroupCell', () => {
  describe('IndentCell', () => {
    it('should have correct classes', () => {
      const tree = shallow(<IndentCell />);

      expect(tree.is('.position-sticky.dx-g-bs4-fixed-cell'))
        .toBeTruthy();
    });

    it('should apply left position', () => {
      const tree = shallow(<IndentCell position={13} />);

      expect(tree.prop('style'))
        .toMatchObject({
          left: 13,
        });
    });

    it('should merge custom style', () => {
      const tree = shallow((
        <IndentCell
          style={{ background: 'yellow' }}
          position={13}
        />
      ));

      expect(tree.prop('style'))
        .toMatchObject({
          background: 'yellow',
          left: 13,
        });
    });

    it('should pass custom class to the root element', () => {
      const tree = shallow((
        <IndentCell
          className="custom-class"
        />
      ));

      expect(tree.is('.position-sticky.dx-g-bs4-fixed-cell.custom-class'))
        .toBeTruthy();
    });

    it('should pass rest props to root component', () => {
      const tree = shallow((<IndentCell data={{ a: 1 }} />));

      expect(tree.prop('data'))
        .toEqual({
          a: 1,
        });
    });
  });
});
