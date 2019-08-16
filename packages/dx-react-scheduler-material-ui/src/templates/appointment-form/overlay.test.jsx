import * as React from 'react';
import { createShallow, getClasses, createMount } from '@material-ui/core/test-utils';
import { Overlay } from './overlay';

describe('AppointmentForm', () => {
  const defaultProps = {
    isRecurring: false,
    basicLayoutComponent: () => null,
    controlLayoutComponent: () => null,
    recurrenceLayoutComponent: () => null,
    container: {},
    frequency: 'never',
  };
  let classes;
  let shallow;
  let mount;
  beforeAll(() => {
    classes = getClasses(<Overlay><div /></Overlay>);
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
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

    it('should render correctly if frequency is "never"', () => {
      const tree = shallow((
        <Overlay {...defaultProps} frequency="never">
          <div />
        </Overlay>
      ));

      expect(tree.prop('PaperProps'))
        .toMatchObject({
          style: {
            position: 'absolute',
            width: '50%',
          },
        });
    });

    it('should render correctly if frequency is not "never"', () => {
      const tree = shallow((
        <Overlay {...defaultProps} frequency="daily">
          <div />
        </Overlay>
      ));

      expect(tree.prop('PaperProps'))
        .toMatchObject({
          style: {
            position: 'absolute',
            width: '100%',
          },
        });
    });
  });
});
