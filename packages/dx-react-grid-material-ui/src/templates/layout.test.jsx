import React from 'react';
import { shallow } from 'enzyme';
import { getClasses, createShallow } from 'material-ui/test-utils';
import { Header, Footer, Root } from './layout';

describe('Layout', () => {
  let shallowWrapper;
  const children = <div />;
  beforeAll(() => {
    shallowWrapper = createShallow({ dive: true });
  });

  describe('Header', () => {
    let classes;
    beforeAll(() => {
      classes = getClasses((
        <Header>
          {children}
        </Header>
      ));
    });
    it('should pass className to the root element', () => {
      const tree = shallowWrapper((
        <Header className="custom-class">
          {children}
        </Header>
      ));

      expect(tree.is(`.${classes.headingPanel}`))
        .toBeTruthy();
      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallowWrapper((
        <Header data={{ a: 1 }}>
          {children}
        </Header>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });

  describe('Footer', () => {
    let classes;
    beforeAll(() => {
      classes = getClasses((
        <Footer>
          {children}
        </Footer>
      ));
    });
    it('should pass className to the root element', () => {
      const tree = shallowWrapper((
        <Footer className="custom-class">
          {children}
        </Footer>
      ));

      expect(tree.is(`.${classes.footerPanel}`))
        .toBeTruthy();
      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallowWrapper((
        <Header data={{ a: 1 }}>
          {children}
        </Header>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });

  describe('Root', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Root className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Root data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
