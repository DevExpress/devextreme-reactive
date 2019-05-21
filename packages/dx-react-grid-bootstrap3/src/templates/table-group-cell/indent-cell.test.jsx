import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { IndentCell } from './indent-cell';
import { ThemeColors } from '../layout';
import { getStickyPosition } from '../../utils/css-fallback-properties';

jest.mock('../../utils/css-fallback-properties', () => ({
  getStickyPosition: jest.fn(),
}));

describe('TableGroupCell', () => {
  describe('IndentCell', () => {
    let resetConsole;
    beforeAll(() => {
      resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    });

    beforeEach(() => {
      getStickyPosition.mockReturnValue('getStickyPosition');
    });

    afterAll(() => {
      resetConsole();
    });

    const themeColors = {
      backgroundColor: 'red',
    };

    it('should have correct styles', () => {
      const tree = mount((
        <ThemeColors.Provider value={themeColors}>
          <IndentCell />
        </ThemeColors.Provider>
      ));

      expect(tree.childAt(0).prop('style'))
        .toMatchObject({
          position: 'getStickyPosition',
          backgroundClip: 'padding-box',
          zIndex: 300,
        });
    });

    it('should apply left position', () => {
      const tree = mount((
        <ThemeColors.Provider value={themeColors}>
          <IndentCell left="13px" />
        </ThemeColors.Provider>
      ));

      expect(tree.childAt(0).prop('style'))
        .toMatchObject({
          left: '13px',
        });
    });

    it('should apply background color', () => {
      const tree = mount((
        <ThemeColors.Provider value={themeColors}>
          <IndentCell />
        </ThemeColors.Provider>
      ));

      expect(tree.childAt(0).prop('style'))
        .toMatchObject({
          backgroundColor: 'red',
        });
    });

    it('should merge custom style', () => {
      const tree = mount((
        <ThemeColors.Provider value={themeColors}>
          <IndentCell
            style={{ color: 'yellow' }}
            left="13px"
          />
        </ThemeColors.Provider>
      ));

      expect(tree.childAt(0).prop('style'))
        .toMatchObject({
          color: 'yellow',
          left: '13px',
        });
    });

    it('should pass rest props to root component', () => {
      const tree = mount((
        <ThemeColors.Provider value={themeColors}>
          <IndentCell data={{ a: 1 }} />
        </ThemeColors.Provider>
      ));

      expect(tree.childAt(0).prop('data'))
        .toEqual({
          a: 1,
        });
    });
  });
});
