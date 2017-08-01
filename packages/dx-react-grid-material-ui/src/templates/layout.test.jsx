import React from 'react';
import { createMount, getClasses } from 'material-ui/test-utils';
import { Header, Footer, styleSheet } from './layout';

describe('Layout', () => {
  let mount;
  beforeAll(() => {
    mount = createMount();
  });
  afterAll(() => {
    mount.cleanUp();
  });

  describe('Header', () => {
    it('should have a correct css class', () => {
      const tree = mount(
        <Header>
          <div />
        </Header>,
      );
      const classes = getClasses(styleSheet);

      expect(tree.find(Header).hasClass(classes.headingPanel)).toBeTruthy();
    });
  });
  describe('Footer', () => {
    it('should have a correct css class', () => {
      const tree = mount(
        <Footer>
          <div />
        </Footer>,
      );
      const classes = getClasses(styleSheet);

      expect(tree.find(Footer).hasClass(classes.footerPanel)).toBeTruthy();
    });
  });
});
