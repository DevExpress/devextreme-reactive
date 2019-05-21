import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { Container } from './container';
import { ThemeColors } from '../layout';
import { getStickyPosition } from '../../utils/css-fallback-properties';

jest.mock('../../utils/css-fallback-properties', () => ({
  getStickyPosition: jest.fn(),
}));

describe('TableGroupCell', () => {
  describe('Container', () => {
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
          <Container />
        </ThemeColors.Provider>
      ));

      expect(tree.childAt(0).prop('style'))
        .toMatchObject({
          position: 'getStickyPosition',
          backgroundClip: 'padding-box',
          zIndex: 300,
          display: 'inline-block',
        });
    });

    it('should apply background color', () => {
      const tree = mount((
        <ThemeColors.Provider value={themeColors}>
          <Container />
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
          <Container style={{ left: '13px' }} />
        </ThemeColors.Provider>
      ));

      expect(tree.childAt(0).prop('style'))
        .toMatchObject({
          left: '13px',
          position: 'getStickyPosition',
        });
    });

    it('should render children', () => {
      const tree = mount((
        <ThemeColors.Provider value={themeColors}>
          <Container>
            <span className="child" />
          </Container>
        </ThemeColors.Provider>
      ));

      expect(tree.find('.child'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = mount((
        <ThemeColors.Provider value={themeColors}>
          <Container data={{ a: 1 }} />
        </ThemeColors.Provider>
      ));

      expect(tree.childAt(0).props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
