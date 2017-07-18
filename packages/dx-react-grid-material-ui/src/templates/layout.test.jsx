import React from 'react';
import { mountWithStyles } from '../utils/testing';
import { Header, Footer, styleSheet } from './layout';

describe('Layout', () => {
  describe('Header', () => {
    it('should have a correct css class', () => {
      const mounted = mountWithStyles(
        <Header>
          <div />
        </Header>,
        styleSheet,
      );

      expect(mounted.tree.find(Header).hasClass(mounted.classes.headingPanel)).toBeTruthy();
    });
  });
  describe('Footer', () => {
    it('should have a correct css class', () => {
      const mounted = mountWithStyles(
        <Footer>
          <div />
        </Footer>,
        styleSheet,
      );

      expect(mounted.tree.find(Footer).hasClass(mounted.classes.footerPanel)).toBeTruthy();
    });
  });
});
