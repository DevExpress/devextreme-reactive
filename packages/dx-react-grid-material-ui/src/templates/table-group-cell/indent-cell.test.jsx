import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { IndentCell } from './indent-cell';

describe('TableGroupCell', () => {
  describe('IndentCell', () => {
    let shallow;
    let classes;

    beforeAll(() => {
      shallow = createShallow({ dive: true });
      classes = getClasses(<IndentCell />);
    });

    it('should have correct classes', () => {
      const tree = shallow(<IndentCell />);

      expect(tree.is(`.${classes.indentCell}`))
        .toBeTruthy();
    });

    it('should pass the className prop to the root element', () => {
      const tree = shallow((
        <IndentCell className="custom-class" />
      ));

      expect(tree.is(`.${classes.indentCell}.custom-class`))
        .toBeTruthy();
    });

    it('should apply left position', () => {
      const tree = shallow(<IndentCell left="13px" />);

      expect(tree.prop('style'))
        .toMatchObject({
          left: '13px',
        });
    });

    it('should merge custom style', () => {
      const tree = shallow((
        <IndentCell
          style={{ background: 'yellow' }}
          left="13px"
        />
      ));

      expect(tree.prop('style'))
        .toMatchObject({
          background: 'yellow',
          left: '13px',
        });
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
