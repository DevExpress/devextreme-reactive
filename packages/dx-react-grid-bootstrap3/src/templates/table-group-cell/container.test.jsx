import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { Container } from './container';
import { StyleContext } from '../layout';

describe('TableGroupCell', () => {
  describe('Container', () => {
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
          <Container />
        </StyleContext.Provider>
      ));

      expect(tree.childAt(0).prop('style'))
        .toMatchObject({
          position: 'stickyPosition',
          backgroundClip: 'padding-box',
          zIndex: 300,
          display: 'inline-block',
        });
    });

    it('should apply position', () => {
      const tree = mount((
        <StyleContext.Provider value={styleVars}>
          <Container position="13px" />
        </StyleContext.Provider>
      ));

      expect(tree.childAt(0).prop('style'))
        .toMatchObject({
          left: '13px',
        });
    });

    it('should apply background color', () => {
      const tree = mount((
        <StyleContext.Provider value={styleVars}>
          <Container />
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
          <Container style={{ color: 'red' }} />
        </StyleContext.Provider>
      ));

      expect(tree.childAt(0).prop('style'))
        .toMatchObject({
          color: 'red',
          position: 'stickyPosition',
        });
    });

    it('should render children', () => {
      const tree = mount((
        <StyleContext.Provider value={styleVars}>
          <Container>
            <span className="child" />
          </Container>
        </StyleContext.Provider>
      ));

      expect(tree.find('.child'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = mount((
        <StyleContext.Provider value={styleVars}>
          <Container data={{ a: 1 }} />
        </StyleContext.Provider>
      ));

      expect(tree.childAt(0).props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
