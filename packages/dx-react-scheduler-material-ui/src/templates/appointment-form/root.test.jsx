import * as React from 'react';
import { createShallow, getClasses, createMount } from '@material-ui/core/test-utils';
import { Root } from './root';

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
    classes = getClasses(<Root><div /></Root>);
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  describe('Root', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Root data={{ a: 1 }} {...defaultProps}>
          <div />
        </Root>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass className to the root element', () => {
      const tree = shallow((
        <Root className="custom-class" {...defaultProps}>
          <div />
        </Root>
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.root}`))
        .toBeTruthy();
    });

    it('should pass children to the root component', () => {
      const tree = shallow((
        <Root {...defaultProps}>
          <div />
          <div />
        </Root>
      ));

      expect(tree.children())
        .toHaveLength(2);
    });

    it('should render correctly if frequency is "never"', () => {
      const tree = shallow((
        <Root {...defaultProps} frequency="never">
          <div />
        </Root>
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
        <Root {...defaultProps} frequency="daily">
          <div />
        </Root>
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
