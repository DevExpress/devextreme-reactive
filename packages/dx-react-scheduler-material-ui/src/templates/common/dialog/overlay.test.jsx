import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import Dialog from '@material-ui/core/Dialog';
import { Overlay } from './overlay';

describe('EditRecurrenceMenu', () => {
  let shallow;
  let classes;
  const defaultProps = {
    onHide: jest.fn(),
    target: React.createRef(),
    visible: true,
    className: 'custom-class',
  };
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Overlay {...defaultProps}><div /></Overlay>);
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
      const tree = shallow((
        <Overlay {...defaultProps}>
          <div />
        </Overlay>
      ));

      expect(tree.find(Dialog).props())
        .toMatchObject({
          open: defaultProps.visible,
          onClose: defaultProps.onHide,
          className: `${classes.modal} custom-class`,
          BackdropProps: { className: classes.modal },
          container: null,
          onBackdropClick: defaultProps.onHide,
        });
    });
  });
});
