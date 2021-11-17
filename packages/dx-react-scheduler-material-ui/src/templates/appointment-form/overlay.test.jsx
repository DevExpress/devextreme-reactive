import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { Overlay, classes } from './overlay';

describe('AppointmentForm', () => {
  const defaultProps = {
    isRecurring: false,
    basicLayoutComponent: () => null,
    controlLayoutComponent: () => null,
    recurrenceLayoutComponent: () => null,
    container: {},
    fullSize: true,
    onHide: jest.fn(),
    target: React.createRef(),
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('Overlay', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Overlay data={{ a: 1 }} {...defaultProps}>
          <div />
        </Overlay>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <Overlay className="custom-class" {...defaultProps}>
          <div />
        </Overlay>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.root}`))
        .toBeTruthy();
    });

    it('should pass children to the root component', () => {
      const tree = shallow((
        <Overlay {...defaultProps}>
          <div />
          <div />
        </Overlay>
      ));

      expect(tree.children())
        .toHaveLength(2);
    });

    it('should render correctly if not full-size', () => {
      const tree = shallow((
        <Overlay {...defaultProps} fullSize={false}>
          <div />
        </Overlay>
      ));

      expect(tree.prop('PaperProps'))
        .toMatchObject({
          className: `${classes.absolutePosition} ${classes.paper} ${classes.halfSize}`,
        });
    });

    it('should render correctly if full-size', () => {
      const tree = shallow((
        <Overlay {...defaultProps}>
          <div />
        </Overlay>
      ));

      expect(tree.prop('PaperProps'))
        .toMatchObject({
          className: `${classes.absolutePosition} ${classes.paper} ${classes.fullSize}`,
        });
    });

    it('should handle backdrop click', () => {
      const tree = shallow((
        <Overlay {...defaultProps}>
          <div />
        </Overlay>
      ));

      tree.simulate('backdropClick');
      expect(defaultProps.onHide)
        .toBeCalledTimes(1);
    });

    it('should pass onEntered and onExited in SlideProps', () => {
      const tree = shallow((
        <Overlay {...defaultProps}>
          <div />
        </Overlay>
      ));

      expect(tree.prop('SlideProps'))
        .toMatchObject({
          onEntered: expect.any(Function),
          onExited: expect.any(Function),
        });
    });
  });
});
