import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Layout } from './layout';

describe('Appointment Tooltip', () => {
  let classes;
  let shallow;
  const defaultProps = {
    headComponent: () => null,
    commandButtonComponent: () => null,
    contentComponent: () => null,
    showOpenButton: false,
    showCloseButton: false,
    showDeleteButton: false,
    getAppointmentStartDate: () => new Date('2018-08-17 10:00'),
    getAppointmentEndDate: () => new Date('2018-08-17 11:00'),
    getAppointmentTitle: () => 'title',
    commandButtonIds: {
      open: 'open',
      close: 'close',
      delete: 'delete',
    },
  };
  beforeAll(() => {
    classes = getClasses(<Layout {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Layout', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Layout {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render Head component', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      expect(tree.find(defaultProps.headComponent).exists())
        .toBeTruthy();
    });

    it('should render OpenButton', () => {
      const onOpenButtonClick = jest.fn();
      const tree = shallow((
        <Layout {...defaultProps} showOpenButton onOpenButtonClick={onOpenButtonClick} />
      ));

      const { id, onClick } = tree
        .find(defaultProps.headComponent)
        .find(defaultProps.commandButtonComponent).props();

      onClick();

      expect(id).toBe('open');
      expect(onOpenButtonClick).toBeCalled();
    });

    it('should render CloseButton', () => {
      const onHideMock = jest.fn();
      const tree = shallow((
        <Layout
          {...defaultProps}
          showCloseButton
          onHide={onHideMock}
        />
      ));
      const { id, onClick } = tree
        .find(defaultProps.headComponent)
        .find(defaultProps.commandButtonComponent).props();

      onClick();

      expect(id).toBe('close');
      expect(onHideMock).toBeCalled();
    });

    it('should render DeleteButton', () => {
      const onDeleteButtonClick = jest.fn();
      const tree = shallow((
        <Layout
          {...defaultProps}
          showDeleteButton
          onDeleteButtonClick={onDeleteButtonClick}
        />
      ));

      const { id, onClick } = tree
        .find(defaultProps.headComponent)
        .find(defaultProps.commandButtonComponent).props();

      onClick();

      expect(id).toBe('delete');
      expect(onDeleteButtonClick).toBeCalled();
    });

    it('should render title', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      expect(tree.find(defaultProps.headComponent).find(`.${classes.title}`).exists())
        .toBeTruthy();
    });

    it('should render Content component', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));

      expect(tree.find(defaultProps.contentComponent).exists())
        .toBeTruthy();
    });

    it('should render appointment dates', () => {
      const tree = shallow((
        <Layout {...defaultProps} />
      ));
      const text = tree.find(defaultProps.contentComponent).find(`.${classes.text}`);

      expect(text.at(0).props().children)
        .toEqual('10:00 AM');
      expect(text.at(1).props().children)
        .toEqual('11:00 AM');
    });
  });
});
