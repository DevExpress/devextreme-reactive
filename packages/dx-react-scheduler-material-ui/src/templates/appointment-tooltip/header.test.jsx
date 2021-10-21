import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import { Header } from './header';

describe('Appointment Tooltip', () => {
  let classes;
  let shallow;
  const defaultProps = {
    commandButtonComponent: () => null,
    showOpenButton: true,
    showCloseButton: true,
    showDeleteButton: true,
    appointmentData: {
      startDate: new Date('2018-08-17 10:00'),
      endDate: new Date('2018-08-17 11:00'),
      title: 'title',
    },
    commandButtonIds: {
      open: 'open',
      close: 'close',
      delete: 'delete',
    },
  };
  beforeAll(() => {
    classes = getClasses(<Header />);
    shallow = createShallow({ dive: true });
  });
  describe('Header', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Header className="custom-class" {...defaultProps} />
      ));

      expect(tree.is(`.${classes.head}.${classes.flexContainer}.custom-class`))
        .toBeTruthy();
      expect(tree.find(`.${classes.line}`).exists())
        .toBeTruthy();
      expect(tree.find(`.${classes.flexContainer}`))
        .toHaveLength(2);
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Header data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('shouldn\'t render openButtonComponent if showOpenButton is false', () => {
      const tree = shallow((
        <Header {...defaultProps} showOpenButton={false} />
      ));

      const buttons = tree.find(defaultProps.commandButtonComponent);
      expect(buttons)
        .toHaveLength(2);
      expect(buttons.at(0).prop('id'))
        .toBe('delete');
      expect(buttons.at(1).prop('id'))
        .toBe('close');
    });

    it('shouldn\'t render closeButtonComponent if showCloseButton is false', () => {
      const tree = shallow((
        <Header {...defaultProps} showCloseButton={false} />
      ));

      const buttons = tree.find(defaultProps.commandButtonComponent);
      expect(buttons)
        .toHaveLength(2);
      expect(buttons.at(0).prop('id'))
        .toBe('open');
      expect(buttons.at(1).prop('id'))
        .toBe('delete');
    });

    it('shouldn\'t render deleteButtonComponent if showDeleteButton is false', () => {
      const tree = shallow((
        <Header {...defaultProps} showDeleteButton={false} />
      ));

      const buttons = tree.find(defaultProps.commandButtonComponent);
      expect(buttons)
        .toHaveLength(2);
      expect(buttons.at(0).prop('id'))
        .toBe('open');
      expect(buttons.at(1).prop('id'))
        .toBe('close');
    });

    it('should render children', () => {
      const tree = shallow((
        <Header {...defaultProps}>
          <div className="header-content" />
        </Header>
      ));

      expect(tree.find('.header-content').exists()).toBeTruthy();
    });

    it('should handle onHide', () => {
      const onHide = jest.fn();
      const tree = shallow((
        <Header onHide={onHide} {...defaultProps} />
      ));

      tree.find(defaultProps.commandButtonComponent).at(2).prop('onExecute')();
      expect(onHide)
        .toHaveBeenCalled();
    });

    it('should handle onOpenButtonClick', () => {
      const onOpenButtonClick = jest.fn();
      const tree = shallow((
        <Header onOpenButtonClick={onOpenButtonClick} {...defaultProps} />
      ));

      tree.find(defaultProps.commandButtonComponent).at(0).prop('onExecute')();
      expect(onOpenButtonClick)
        .toHaveBeenCalled();
    });

    it('should handle onDeleteButtonClick', () => {
      const onDeleteButtonClick = jest.fn();
      const tree = shallow((
        <Header onDeleteButtonClick={onDeleteButtonClick} {...defaultProps} />
      ));

      tree.find(defaultProps.commandButtonComponent).at(1).prop('onExecute')();
      expect(onDeleteButtonClick)
        .toHaveBeenCalled();
    });
  });
});
