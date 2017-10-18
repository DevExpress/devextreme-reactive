import React from 'react';
import { createMount, getClasses } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { Header, Footer } from './layout';

describe('Layout', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['SheetsRegistry'] });
  });
  afterAll(() => {
    resetConsole();
  });

  describe('Header', () => {
    let mount;
    let classes;
    beforeAll(() => {
      classes = getClasses((
        <Header>
          <div />
        </Header>
      ));
      mount = createMount();
    });
    afterAll(() => {
      mount.cleanUp();
    });

    it('should have a correct css class', () => {
      const tree = mount((
        <Header>
          <div />
        </Header>
      ));

      expect(tree.find(Header).hasClass(classes.headingPanel)).toBeTruthy();
    });
  });

  describe('Footer', () => {
    let mount;
    let classes;
    beforeAll(() => {
      classes = getClasses((
        <Footer>
          <div />
        </Footer>
      ));
      mount = createMount();
    });
    afterAll(() => {
      mount.cleanUp();
    });

    it('should have a correct css class', () => {
      const tree = mount((
        <Footer>
          <div />
        </Footer>
      ));

      expect(tree.find(Footer).hasClass(classes.footerPanel)).toBeTruthy();
    });
  });
});
