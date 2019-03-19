import * as React from 'react';
import { shallow } from 'enzyme';
import { Overlay } from './overlay';
import { Popover } from '../../../../dx-react-bootstrap4/components';

const defaultProps = {
  onHide: () => {},
  target: {},
};

describe('Overlay', () => {
  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Overlay
        className="custom-class"
        {...defaultProps}
      >
        <div />
      </Overlay>
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Overlay
        data={{ a: 1 }}
        {...defaultProps}
      >
        <div />
      </Overlay>
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should not render popover in body', () => {
    const renderInBody = shallow((
      <Overlay
        {...defaultProps}
      >
        <div />
      </Overlay>
    )).find(Popover).prop('renderInBody');

    expect(renderInBody)
      .toBeFalsy();
  });

  describe('onHide', () => {
    it('should be called on toggle if overlay is visible', () => {
      const onHide = jest.fn();
      const tree = shallow((
        <Overlay
          {...defaultProps}
          onHide={onHide}
          visible
        >
          <div />
        </Overlay>
      ));

      tree.find(Popover).prop('toggle')();

      expect(onHide).toHaveBeenCalled();
    });

    it('should not be called on toggle if overlay is not visible', () => {
      const onHide = jest.fn();
      const tree = shallow((
        <Overlay
          {...defaultProps}
          onHide={onHide}
          visible={false}
        >
          <div />
        </Overlay>
      ));

      tree.find(Popover).prop('toggle')();

      expect(onHide).not.toHaveBeenCalled();
    });
  });
});
