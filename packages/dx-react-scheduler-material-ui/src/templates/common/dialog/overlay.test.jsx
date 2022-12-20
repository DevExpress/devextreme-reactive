import * as React from 'react';
import { createShallow, createMount } from '@devexpress/dx-testing';
import { Dialog } from '@mui/material';
import { Overlay, classes } from './overlay';

describe('Common Dialog', () => {
  let shallow;
  let mount;
  const defaultProps = {
    onHide: jest.fn(),
    target: React.createRef(),
    visible: true,
    className: 'custom-class',
  };
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Overlay', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Overlay {...defaultProps} data={{ testData: 'testData' }}>
          <div />
        </Overlay>
      ));

      expect(tree.props().data)
        .toMatchObject({ testData: 'testData' });
    });
    it('should render children inside', () => {
      const tree = shallow((
        <Overlay {...defaultProps}>
          <div className="child" />
        </Overlay>
      ));

      expect(tree.find('.child').exists())
        .toBeTruthy();
    });
    it('should pass expected properties into Dialog', () => {
      const tree = mount((
        <Overlay {...defaultProps}>
          <div />
        </Overlay>
      ));

      expect(tree.find(Dialog).is('.custom-class')).toBeTruthy();
      expect(tree.find(Dialog).is(`.${classes.root}`)).toBeTruthy();
      expect(tree.find(Dialog).is(`.${classes.modal}`)).toBeTruthy();

      expect(tree.find(Dialog).props())
        .toMatchObject({
          open: defaultProps.visible,
          onClose: defaultProps.onHide,
          BackdropProps: { className: classes.modal },
          container: null,
          onBackdropClick: defaultProps.onHide,
        });
    });
  });
});
