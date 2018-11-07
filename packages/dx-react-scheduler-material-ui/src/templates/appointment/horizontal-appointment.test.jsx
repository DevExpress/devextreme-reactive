import * as React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { HorizontalAppointment } from './horizontal-appointment';

describe('HorizontalAppointment', () => {
  const defaultProps = {
    data: {
      title: 'title',
    },
  };

  let classes;
  let mount;
  beforeAll(() => {
    classes = getClasses(<HorizontalAppointment {...defaultProps} />);
    mount = createMount();
  });
  afterAll(() => {
    mount.cleanUp();
  });

  describe('HorizontalAppointment', () => {
    it('should render title', () => {
      const tree = mount((
        <HorizontalAppointment
          {...defaultProps}
        />
      ));

      expect(tree.find(`.${classes.title}`).text())
        .toBe('title');
    });

    it('should render children', () => {
      const child = mount((
        <HorizontalAppointment {...defaultProps}>
          <div className="child" />
        </HorizontalAppointment>
      )).find('.child');

      expect(child.exists())
        .toBeTruthy();
    });

    it('should pass className to the root element', () => {
      const tree = mount((
        <HorizontalAppointment {...defaultProps} className="custom-class" />
      ));

      expect(tree.find('.custom-class').exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.content}`).exists())
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = mount((
        <HorizontalAppointment {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
