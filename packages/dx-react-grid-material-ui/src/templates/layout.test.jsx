import React from 'react';
import { Paper } from 'material-ui';
import { mountWithStyles } from '../utils/testing';
import { Root, Header, Footer, styleSheet } from './layout';

describe('Layout', () => {
  describe('Root', () => {
    it('should have a correct css class', () => {
      const mounted = mountWithStyles(
        <Root
          headerTemplate={() => {}}
          bodyTemplate={() => {}}
          footerTemplate={() => {}}
        />,
        styleSheet,
      );

      expect(mounted.tree.find(Paper).hasClass(mounted.classes.root)).toBeTruthy();
    });
  });
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
