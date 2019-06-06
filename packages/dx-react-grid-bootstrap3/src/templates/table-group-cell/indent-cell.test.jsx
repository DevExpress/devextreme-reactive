import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { IndentCell } from './indent-cell';
import { StyleContext } from '../layout';

describe('TableGroupCell', () => {
  describe('IndentCell', () => {
    let resetConsole;
    beforeAll(() => {
      resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    });

    afterAll(() => {
      resetConsole();
    });

    const styleVars = {
      backgroundColor: 'red',
      stickyPosition: 'stickyPosition',
    };

    it('should have correct styles', () => {
      const tree = mount((
        <StyleContext.Provider value={styleVars}>
          <IndentCell />
        </StyleContext.Provider>
      ));

      expect(tree.childAt(0).prop('style'))
        .toMatchObject({
          position: 'stickyPosition',
          backgroundClip: 'padding-box',
          zIndex: 300,
        });
    });

    it('should apply left position', () => {
      const tree = mount((
        <StyleContext.Provider value={styleVars}>
          <IndentCell position={13} />
        </StyleContext.Provider>
      ));

      expect(tree.childAt(0).prop('style'))
        .toMatchObject({
          left: 13,
        });
    });

    it('should apply background color', () => {
      const tree = mount((
        <StyleContext.Provider value={styleVars}>
          <IndentCell />
        </StyleContext.Provider>
      ));

      expect(tree.childAt(0).prop('style'))
        .toMatchObject({
          backgroundColor: 'red',
        });
    });

    it('should merge custom style', () => {
      const tree = mount((
        <StyleContext.Provider value={styleVars}>
          <IndentCell
            style={{ color: 'yellow' }}
            position={13}
          />
        </StyleContext.Provider>
      ));

      expect(tree.childAt(0).prop('style'))
        .toMatchObject({
          color: 'yellow',
          left: 13,
        });
    });

    it('should pass rest props to root component', () => {
      const tree = mount((
        <StyleContext.Provider value={styleVars}>
          <IndentCell data={{ a: 1 }} />
        </StyleContext.Provider>
      ));

      expect(tree.childAt(0).prop('data'))
        .toEqual({
          a: 1,
        });
    });
  });
});
