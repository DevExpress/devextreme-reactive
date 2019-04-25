import * as React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { VerticalAppointment } from './vertical-appointment';

describe('VerticalAppointment', () => {
  const defaultProps = {
    data: {
      title: 'title',
      startDate: new Date('2018-07-27 13:10'),
      endDate: new Date('2018-07-27 17:10'),
    },
    recurringIconComponent: () => <div />,
    formatDate: () => undefined,
  };

  let classes;
  let mount;
  beforeAll(() => {
    classes = getClasses(<VerticalAppointment {...defaultProps} />);
    mount = createMount({ dive: true });
  });
  describe('VerticalAppointment', () => {
    it('should render title', () => {
      const tree = mount((
        <VerticalAppointment
          {...defaultProps}
        />
      ));

      expect(tree.find(`.${classes.title}`).text())
        .toBe('title');
    });

    it('should call time format function', () => {
      const formatDate = jest.fn();
      formatDate.mockImplementation(() => 'time');
      const tree = mount((
        <VerticalAppointment
          {...defaultProps}
          formatDate={formatDate}
        />
      ));

      expect(formatDate)
        .toHaveBeenCalledWith(defaultProps.data.startDate, { hour: 'numeric', minute: 'numeric' });
      expect(formatDate)
        .toHaveBeenCalledWith(defaultProps.data.startDate, { hour: 'numeric', minute: 'numeric' });
      expect(tree.find(`.${classes.time}`).at(0).props().children)
        .toBeTruthy();
      expect(tree.find(`.${classes.time}`).at(2).props().children)
        .toBeTruthy();
    });

    it('should render children', () => {
      const child = mount((
        <VerticalAppointment
          {...defaultProps}
        >
          <div className="child" />
        </VerticalAppointment>
      )).find('.child');

      expect(child.exists())
        .toBeTruthy();
    });

    it('should pass className to the root element', () => {
      const tree = mount((
        <VerticalAppointment {...defaultProps} className="custom-class" />
      ));

      expect(tree.find('.custom-class').exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.content}`).exists())
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = mount((
        <VerticalAppointment {...defaultProps} customData={{ a: 1 }} />
      ));

      expect(tree.props().customData)
        .toMatchObject({ a: 1 });
    });

    it('should render icon if appointment is recurring', () => {
      const data = {
        title: 'title',
        startDate: new Date('2018-07-27 13:10'),
        endDate: new Date('2018-07-27 17:10'),
        rRule: 'FREQ=DAILY;COUNT=6',
      };
      const tree = mount((
        <VerticalAppointment {...defaultProps} data={data} />
      ));

      expect(tree.find(defaultProps.recurringIconComponent).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.recurringContainer}`).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.container}`).exists())
        .toBeFalsy();
    });

    it('should not render recurring icon if appointment is simple', () => {
      const tree = mount((
        <VerticalAppointment {...defaultProps} />
      ));

      expect(tree.find(defaultProps.recurringIconComponent).exists())
        .toBeFalsy();
      expect(tree.find(`.${classes.recurringContainer}`).exists())
        .toBeFalsy();
      expect(tree.find(`.${classes.container}`).exists())
        .toBeTruthy();
    });
  });
});
