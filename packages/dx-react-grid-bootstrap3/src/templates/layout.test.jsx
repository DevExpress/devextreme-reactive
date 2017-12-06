import React from 'react';
import { shallow } from 'enzyme';
import { Root, Header, Footer } from './layout';

describe('Layout', () => {
  const children = <div />;

  describe('Root', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Root className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.panel-default'))
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

  describe('Header', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Header
          className="custom-class"
          data={{ a: 1 }}
        >
          {children}
        </Header>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.panel-heading'))
        .toBeTruthy();
    });

    it('should combine style on the root element', () => {
      const tree = shallow((
        <Header
          style={{ color: 'red' }}
        >
          {children}
        </Header>
      ));

      expect(tree.props().style)
        .toMatchObject({ paddingBottom: '5px', color: 'red' });
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Header
          data={{ a: 1 }}
        >
          {children}
        </Header>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });

  describe('Footer', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Footer
          data={{ a: 1 }}
          className="custom-class"
        >
          {children}
        </Footer>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.panel-footer'))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Footer
          data={{ a: 1 }}
        >
          {children}
        </Footer>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
