import * as React from 'react';
import { shallow } from 'enzyme';
import { ContainerBase } from './container';

describe('Common', () => {
  const defaultProps = {
    classes: {
      container: 'container',
    },
  };
  describe('ContainerBase', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <ContainerBase {...defaultProps} className="custom-class">
          <div />
        </ContainerBase>
      ));

      expect(tree.find('.custom-class'))
        .toBeTruthy();
      expect(tree.find(`.${defaultProps.classes.container}`))
        .toBeTruthy();
    });

    it('should render children inside', () => {
      const tree = shallow((
        <ContainerBase {...defaultProps} data={{ a: 1 }}>
          <div className="child" />
        </ContainerBase>
      ));

      expect(tree.find('.child').exists())
        .toBeTruthy();
    });
  });
});
