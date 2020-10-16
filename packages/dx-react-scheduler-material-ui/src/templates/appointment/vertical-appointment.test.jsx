import * as React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import { VerticalAppointment } from './vertical-appointment';
import { addCommaAndSpaceToString } from '../utils';

jest.mock('../utils', () => ({
  ...jest.requireActual('../utils'),
  addCommaAndSpaceToString: jest.fn(),
}));

describe('VerticalAppointment', () => {
  const defaultProps = {
    data: {
      title: 'title',
      startDate: new Date('2018-07-27 13:10'),
      endDate: new Date('2018-07-27 17:10'),
    },
    recurringIconComponent: () => <div />,
    formatDate: () => undefined,
    durationType: 'long',
  };

  let classes;
  let mount;
  beforeAll(() => {
    classes = getClasses(<VerticalAppointment {...defaultProps} />);
  });
  beforeEach(() => {
    mount = createMount({ dive: true });
  });
  afterEach(() => {
    mount.cleanUp();
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
      const tree = mount((
        <VerticalAppointment
          {...defaultProps}
        >
          <div className="child" />
        </VerticalAppointment>
      ));

      expect(tree.find('.child').exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.content}`).exists())
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

    it('should consider on middle appointment height type', () => {
      const tree = mount((
        <VerticalAppointment {...defaultProps} durationType="middle" />
      ));

      expect(tree.find(`.${classes.shortContent}`).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.middleContainer}`).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.shortContainer}`).exists())
        .toBeFalsy();
    });
    it('should consider on short appointment height type', () => {
      const tree = mount((
        <VerticalAppointment {...defaultProps} durationType="short" />
      ));

      expect(tree.find(`.${classes.shortContainer}`).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.shortTitle}`).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.shortContent}`).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.middleContainer}`).exists())
        .toBeFalsy();
    });
    it('should call addCommaAndSpaceToString', () => {
      mount((
        <VerticalAppointment {...defaultProps} durationType="short" />
      ));

      expect(addCommaAndSpaceToString)
        .toBeCalledWith('title');
    });
  });
});
