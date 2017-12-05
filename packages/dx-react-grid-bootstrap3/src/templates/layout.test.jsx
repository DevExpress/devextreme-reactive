import React from 'react';
import { shallow } from 'enzyme';
import { Root, Header, Footer } from './layout';

const children = <div>test</div>;

describe('Grids components:', () => {
  describe('Root:', () => {
    it('should render without exceptions', () => {
      const tree = shallow((
        <Root
          value=""
          onValueChange={() => { }}
        />
      ));
      expect(tree.find('.panel-default').exists())
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Root className="custom-class" data={{ a: 1 }} />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.panel-default'))
        .toBeTruthy();
      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
  describe('Header:', () => {
    it('should render without exceptions', () => {
      const tree = shallow((
        <Header
          value=""
          onValueChange={() => { }}
        >
          { children }
        </Header>
      ));
      expect(tree.find('.panel-heading').exists())
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Header
          className="custom-class"
          data={{ a: 1 }}
        >
          { children }
        </Header>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.panel-heading'))
        .toBeTruthy();
      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
  describe('Header:', () => {
    it('should render without exceptions', () => {
      const tree = shallow((
        <Footer
          value=""
          onValueChange={() => { }}
        >
          { children }
        </Footer>
      ));
      expect(tree.find('.panel-footer').exists())
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Footer
          className="custom-class"
          data={{ a: 1 }}
        >
          { children }
        </Footer>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.panel-footer'))
        .toBeTruthy();
      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
