import * as React from 'react';
import { createShallow, getClasses, createMount } from '@devexpress/dx-testing';
import Popover from '@mui/material/Popover';
import { Layout } from './layout';

describe('Appointment Tooltip', () => {
  let shallow;
  let classes;
  let mount;
  const defaultProps = {
    headerComponent: () => null,
    commandButtonComponent: () => null,
    contentComponent: () => null,
    showOpenButton: false,
    showCloseButton: false,
    showDeleteButton: false,
    appointmentMeta: {
      data: {
        startDate: new Date('2018-08-17 10:00'),
        endDate: new Date('2018-08-17 11:00'),
        title: 'title',
      },
      target: {},
    },
    commandButtonIds: {
      open: 'open',
      close: 'close',
      delete: 'delete',
    },
    formatDate: jest.fn(),
  };
  beforeAll(() => {
    classes = getClasses(<Layout {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    jest.resetAllMocks();
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  describe('Layout', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render Popover component', () => {
      const tree = mount((
        <Layout className="custom-class" visible {...defaultProps} />
      ));

      const popover = tree.find(Popover).at(0);
      expect(popover.exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.popover}`).exists())
        .toBeTruthy();
    });

    it('should handle onHide', () => {
      const onHide = jest.fn();
      const tree = shallow((
        <Layout onHide={onHide} {...defaultProps} />
      ));

      tree.prop('onClose')();
      tree.find(defaultProps.headerComponent).prop('onHide')();
      expect(onHide)
        .toHaveBeenCalledTimes(2);
    });

    it('should render Header component', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      const header = tree.find(defaultProps.headerComponent).at(0);
      expect(header.exists())
        .toBeTruthy();
      expect(header.props())
        .toMatchObject({
          appointmentData: defaultProps.appointmentMeta.data,
          commandButtonComponent: defaultProps.commandButtonComponent,
          showOpenButton: defaultProps.showOpenButton,
          showCloseButton: defaultProps.showCloseButton,
          showDeleteButton: defaultProps.showDeleteButton,
          commandButtonIds: defaultProps.commandButtonIds,
          onOpenButtonClick: expect.any(Function),
          onDeleteButtonClick: expect.any(Function),
          onHide: expect.any(Function),
        });
    });

    it('should render Content component', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      const content = tree.find(defaultProps.contentComponent).at(0);
      expect(content.exists())
        .toBeTruthy();
      expect(content.props())
        .toMatchObject({
          appointmentData: defaultProps.appointmentMeta.data,
          formatDate: defaultProps.formatDate,
        });
    });

    it('should handle onOpenButtonClick', () => {
      const onOpenButtonClick = jest.fn();
      const tree = shallow((
        <Layout onOpenButtonClick={onOpenButtonClick} {...defaultProps} />
      ));

      tree.find(defaultProps.headerComponent).prop('onOpenButtonClick')();
      expect(onOpenButtonClick)
        .toHaveBeenCalled();
    });

    it('should handle onDeleteButtonClick', () => {
      const onDeleteButtonClick = jest.fn();
      const tree = shallow((
        <Layout onDeleteButtonClick={onDeleteButtonClick} {...defaultProps} />
      ));

      tree.find(defaultProps.headerComponent).prop('onDeleteButtonClick')();
      expect(onDeleteButtonClick)
        .toHaveBeenCalled();
    });
  });
});
