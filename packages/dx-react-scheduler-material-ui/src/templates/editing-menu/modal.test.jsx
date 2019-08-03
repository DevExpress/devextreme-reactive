import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import Dialog from '@material-ui/core/Dialog';
import { Modal } from './modal';

describe('EditingMenu', () => {
  let shallow;
  let classes;
  const defaultProps = {
    handleClose: jest.fn(),
    containerRef: React.createRef(),
    open: true,
    className: 'custom-class',
  };
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Modal {...defaultProps}><div /></Modal>);
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Modal', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Modal {...defaultProps} data={{ testData: 'testData' }}>
          <div />
        </Modal>
      ));

      expect(tree.props().data)
        .toMatchObject({ testData: 'testData' });
    });
    it('should render children inside', () => {
      const tree = shallow((
        <Modal {...defaultProps}>
          <div className="child" />
        </Modal>
      ));

      expect(tree.find('.child').exists())
        .toBeTruthy();
    });
    it('should pass expected properties into Dialog', () => {
      const tree = shallow((
        <Modal {...defaultProps}>
          <div />
        </Modal>
      ));

      expect(tree.find(Dialog).props())
        .toMatchObject({
          open: defaultProps.open,
          onClose: defaultProps.handleClose,
          className: `${classes.modal} custom-class`,
          BackdropProps: { className: classes.modal },
          container: null,
          onBackdropClick: defaultProps.handleClose,
        });
    });
  });
});
