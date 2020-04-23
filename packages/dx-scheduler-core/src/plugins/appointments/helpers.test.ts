import moment from 'moment';
import {
  isTimeTableElementsMetaActual, isAllDayElementsMetaActual, sortAppointments,
  findOverlappedAppointments, adjustAppointments, unwrapGroups,
  calculateRectByDateAndGroupIntervals, createAppointmentForest,
} from './helpers';
import { VERTICAL_GROUP_ORIENTATION, HORIZONTAL_GROUP_ORIENTATION } from '../../constants';
import { calculateAppointmentLeftAndWidth } from '../../../dist/dx-scheduler-core.umd';

const matchFloat = expected => ({
  $$typeof: Symbol.for('jest.asymmetricMatcher'),

  asymmetricMatch: actual => Math.abs(actual - expected) < 0.01,

  toAsymmetricMatcher: () => `~${expected}`,
});

describe('Appointments helpers', () => {
  const appointmentsBase = [
    { start: moment('2018-07-02 10:00'), end: moment('2018-07-02 11:00') },
    { start: moment('2018-07-02 10:30'), end: moment('2018-07-02 12:00') },
    { start: moment('2018-07-01 10:00'), end: moment('2018-07-01 13:00') },
    { start: moment('2018-07-01 11:30'), end: moment('2018-07-01 12:00') },
    { start: moment('2018-07-01 10:00'), end: moment('2018-07-01 11:00') },
    { start: moment('2018-07-02 10:40'), end: moment('2018-07-02 13:00') },
    { start: moment('2018-07-03 11:00'), end: moment('2018-07-03 15:00') },
    { start: moment('2018-07-02 12:00'), end: moment('2018-07-02 15:00') },
    { start: moment('2018-07-02 12:00'), end: moment('2018-07-03 09:30') },
    { start: moment('2018-07-01 12:00'), end: moment('2018-07-02 00:00') },
    { start: moment('2018-07-01 00:00'), end: moment('2018-07-03 00:00') },
    { start: moment('2018-07-01 00:00'), end: moment('2018-07-02 00:00') },
    { start: moment('2018-07-02 00:00'), end: moment('2018-07-03 00:00') },
    { start: moment('2018-07-01 00:00'), end: moment('2018-07-02 00:00:01') },
  ];
  const sortedAppointmentsBase = [
    appointmentsBase[2], appointmentsBase[4], appointmentsBase[3],
    appointmentsBase[0], appointmentsBase[1], appointmentsBase[5], appointmentsBase[6],
  ];
  const overlappedAppointments = [
    [{ ...appointmentsBase[2] }, { ...appointmentsBase[4] }, { ...appointmentsBase[3] }],
    [{ ...appointmentsBase[0] }, { ...appointmentsBase[1] }, { ...appointmentsBase[5] }],
    [{ ...appointmentsBase[6] }],
  ];
  describe('#isTimeTableElementsMetaActual', () => {
    const viewCellsData = [[
      {}, {}, {},
    ], [
      {}, {}, {},
    ]];
    it('should return false if getCellRects doesn\'t exist', () => {
      expect(isTimeTableElementsMetaActual(viewCellsData, {}))
        .toBeFalsy();
    });

    it('should return false viewCellsData\'s and getCellRects are different', () => {
      const timeTableElementsMeta = {
        getCellRects: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
      };
      expect(isTimeTableElementsMetaActual(viewCellsData, timeTableElementsMeta))
        .toBeFalsy();
    });

    it('should return true viewCellsData\' and getCellRects\' sizes are equal', () => {
      const timeTableElementsMeta = {
        getCellRects: [{}, {}, {}, {}, {}, {}],
      };
      expect(isTimeTableElementsMetaActual(viewCellsData, timeTableElementsMeta))
        .toBeTruthy();
    });
  });

  describe('#isAllDayElementsMetaActual', () => {
    const viewCellsData = [[
      'test1',
      'test2',
      'test3',
    ]];
    it('should return true if getCellRects exists and its length is equal to the first row', () => {
      const allDayElementsMeta = {
        getCellRects: [
          'test1',
          'test2',
          'test3',
        ],
      };
      expect(isAllDayElementsMetaActual(
        viewCellsData, allDayElementsMeta, HORIZONTAL_GROUP_ORIENTATION, 1,
      ))
        .toBeTruthy();
    });

    it('should return false if getCellRects does not exist', () => {
      expect(isAllDayElementsMetaActual(viewCellsData, {}, HORIZONTAL_GROUP_ORIENTATION, 1))
        .toBeFalsy();
    });

    it('should return false if getCellRects length is not equal to the first row', () => {
      const allDayElementsMeta = {
        getCellRects: [
          'test1',
          'test2',
        ],
      };
      expect(isAllDayElementsMetaActual(
        viewCellsData, allDayElementsMeta, HORIZONTAL_GROUP_ORIENTATION, 1,
      ))
        .toBeFalsy();
    });

    it('should work with verticalGrouping', () => {
      const allDayElementsMeta = {
        getCellRects: [
          'test1',
          'test2',
          'test3',
          'test4',
          'test5',
          'test6',
        ],
      };

      let groupCount = 2;
      expect(isAllDayElementsMetaActual(
        viewCellsData, allDayElementsMeta, VERTICAL_GROUP_ORIENTATION, groupCount,
      ))
        .toBeTruthy();

      groupCount = 3;
      expect(isAllDayElementsMetaActual(
        viewCellsData, allDayElementsMeta, VERTICAL_GROUP_ORIENTATION, groupCount,
      ))
        .toBeFalsy();
    });
  });
  describe('#sortAppointments', () => {
    it('should sort appointments', () => {
      const appointments = [
        { start: moment('2018-07-02 10:00'), end: moment('2018-07-02 11:00') },
        { start: moment('2018-07-02 10:30'), end: moment('2018-07-02 12:00') },
        { start: moment('2018-07-01 10:00'), end: moment('2018-07-01 13:00') },
        { start: moment('2018-07-01 11:30'), end: moment('2018-07-01 12:00') },
        { start: moment('2018-07-01 10:00'), end: moment('2018-07-01 11:00') },
        { start: moment('2018-07-02 10:40'), end: moment('2018-07-02 13:00') },
        { start: moment('2018-07-03 11:00'), end: moment('2018-07-03 15:00') },
      ];
      const sortedAppointments = [
        appointments[2], appointments[4], appointments[3],
        appointments[0], appointments[1], appointments[5], appointments[6],
      ];
      expect(sortAppointments(appointments))
        .toEqual(sortedAppointments);
    });
    it('should place all-day appointments before ordinary ones if they are on the same day', () => {
      const appointments = [
        { start: moment('2018-07-02 09:30'), end: moment('2018-07-02 12:00') },
        { start: moment('2018-07-01 10:00'), end: moment('2018-07-01 13:00') },
        { start: moment('2018-07-02 10:00'), end: moment('2018-07-02 11:00'), allDay: true },
        { start: moment('2018-07-02 10:00'), end: moment('2018-07-04 11:00'), allDay: true },
      ];
      const sortedAppointments = [
        appointments[1], appointments[3], appointments[2], appointments[0],
      ];
      expect(sortAppointments(appointments))
        .toEqual(sortedAppointments);
    });
  });

  describe('#findOverlappedAppointments', () => {
    it('should detect overlapped appointments', () => {
      expect(findOverlappedAppointments(sortedAppointmentsBase))
        .toEqual(overlappedAppointments);
    });

    it('should detect overlapped appointments depend on', () => {
      const sortedAppointmentsForDay = [
        appointmentsBase[0], appointmentsBase[7],
      ];
      const overlappedAppointmentsForDay = [
        [{ ...appointmentsBase[0] }, { ...appointmentsBase[7] }],
      ];
      expect(findOverlappedAppointments(sortedAppointmentsForDay, true))
        .toEqual(overlappedAppointmentsForDay);
    });

    it('should detect if appointment ends at 12:00 AM', () => {
      const sortedAppointmentsForDay = [
        appointmentsBase[9], appointmentsBase[0],
      ];
      expect(findOverlappedAppointments(sortedAppointmentsForDay, true))
        .toEqual([
          [{ ...appointmentsBase[9] }],
          [{ ...appointmentsBase[0] }],
        ]);
    });
  });

  describe('#adjustAppointments', () => {
    it('should calculate appointment offset and reduce coefficient', () => {
      expect(adjustAppointments(overlappedAppointments))
        .toEqual([
          {
            items: [
              { ...appointmentsBase[2], offset: 0 },
              { ...appointmentsBase[4], offset: 1 },
              { ...appointmentsBase[3], offset: 1 },
            ],
            reduceValue: 2,
          },
          {
            items: [
              { ...appointmentsBase[0], offset: 0 },
              { ...appointmentsBase[1], offset: 1 },
              { ...appointmentsBase[5], offset: 2 },
            ],
            reduceValue: 3,
          },
          {
            items: [
              { ...appointmentsBase[6], offset: 0 },
            ],
            reduceValue: 1,
          },
        ]);
    });

    it('should consider if appointments start and end at the same time', () => {
      const groups = [
        [{ ...appointmentsBase[1] }, { ...appointmentsBase[7] }],
      ];
      expect(adjustAppointments(groups))
        .toEqual([
          {
            items: [
              { ...appointmentsBase[1], offset: 0 },
              { ...appointmentsBase[7], offset: 0 },
            ],
            reduceValue: 1,
          },
        ]);
    });

    it('should calculate appointment offset depend on day', () => {
      const groups = [
        [{ ...appointmentsBase[8] }, { ...appointmentsBase[6] }],
      ];
      expect(adjustAppointments(groups, true))
        .toEqual([
          {
            items: [
              { ...appointmentsBase[8], offset: 0 },
              { ...appointmentsBase[6], offset: 1 },
            ],
            reduceValue: 2,
          },
        ]);
    });

    it('should calculate appointment offset depend on midnight', () => {
      const groups = [
        [{ ...appointmentsBase[10] }, { ...appointmentsBase[11] }, { ...appointmentsBase[12] }],
      ];
      expect(adjustAppointments(groups, true))
        .toEqual([
          {
            items: [
              { ...appointmentsBase[10], offset: 0 },
              { ...appointmentsBase[11], offset: 1 },
              { ...appointmentsBase[12], offset: 1 },
            ],
            reduceValue: 2,
          },
        ]);
    });

    it('should calculate appointment offset when appointment ends after midnight', () => {
      const groups = [
        [{ ...appointmentsBase[10] }, { ...appointmentsBase[13] }, { ...appointmentsBase[12] }],
      ];
      expect(adjustAppointments(groups, true))
        .toEqual([
          {
            items: [
              { ...appointmentsBase[10], offset: 0 },
              { ...appointmentsBase[13], offset: 1 },
              { ...appointmentsBase[12], offset: 2 },
            ],
            reduceValue: 3,
          },
        ]);
    });
    it('shouldn\'t change appointments but should create new ones and change them instead', () => {
      const groups = [[{ ...appointmentsBase[0] }]];
      const result = adjustAppointments(groups, true);
      expect(result[0].items[0])
        .not.toBe(groups[0][0]);
    });
  });
  describe('#unwrapGroups', () => {
    it('should calculate appointment offset and reduce coefficient', () => {
      const appointmentsGroups = [
        {
          reduceValue: 1,
          items: [
            {
              start: moment('2017-07-20 08:00'),
              end: moment('2017-07-20 08:30'),
              dataItem: {
                startDate: new Date('2017-07-20 08:00'),
                endDate: new Date('2017-07-20 08:30'),
              },
              offset: 1,
            },
            {
              start: moment('2017-07-20 08:30'),
              end: moment('2017-07-20 09:00'),
              dataItem: {
                startDate: new Date('2017-07-20 08:30'),
                endDate: new Date('2017-07-20 09:30'),
              },
              offset: 2,
            },
          ],
        },
        {
          reduceValue: 2,
          items: [
            {
              start: moment('2017-04-20 08:00'),
              end: moment('2017-04-22 08:30'),
              dataItem: {
                startDate: new Date('2017-04-20 07:00'),
                endDate: new Date('2017-04-22 08:30'),
              },
              offset: 0,
            },
            {
              start: moment('2017-05-25 08:00'),
              end: moment('2017-05-25 09:15'),
              dataItem: {
                startDate: new Date('2017-05-25 07:59'),
                endDate: new Date('2017-05-25 09:17'),
              },
              offset: 1,
            },
          ],
        },
      ];
      expect(unwrapGroups(appointmentsGroups))
        .toEqual([
          {
            ...appointmentsGroups[0].items[0],
            fromPrev: false,
            toNext: false,
            reduceValue: 1,
          },
          {
            ...appointmentsGroups[0].items[1],
            fromPrev: false,
            toNext: true,
            reduceValue: 1,
          },
          {
            ...appointmentsGroups[1].items[0],
            fromPrev: true,
            toNext: false,
            reduceValue: 2,
          },
          {
            ...appointmentsGroups[1].items[1],
            fromPrev: false,
            toNext: true,
            reduceValue: 2,
          },
        ]);
    });
  });
  describe('#calculateRectByDateAndGroupIntervals', () => {
    it('should work with horizontal', () => {
      const rectByDatesMock = jest.fn();
      rectByDatesMock.mockImplementation(() => ({
        top: 10,
        left: 0,
        height: 50,
        width: 99,
        parentWidth: 300,
      }));
      const type = { growDirection: 'horizontal' };
      const rectByDatesMeta = {};
      const intervals = [[
        { start: moment('2018-09-12 10:00'), end: moment('2018-09-13 10:00'), dataItem: 'a' },
        { start: moment('2018-09-12 10:00'), end: moment('2018-09-12 15:00'), dataItem: 'b' },
      ]];

      const rects = calculateRectByDateAndGroupIntervals(
        type, intervals, rectByDatesMock, rectByDatesMeta,
      );

      expect(rects)
        .toHaveLength(2);
      expect(rects[0])
        .toMatchObject({
          top: 10,
          height: 25,
          left: 0,
          width: 33,
          dataItem: 'a',
          type: 'horizontal',
        });
      expect(rects[1])
        .toMatchObject({
          top: 35,
          height: 25,
          left: 0,
          width: 33,
          dataItem: 'b',
          type: 'horizontal',
        });
    });
    it('should work with vertical', () => {
      const rectByDatesMock = jest.fn();
      rectByDatesMock.mockImplementation(() => ({
        top: 10,
        left: 0,
        height: 50,
        width: 99,
        parentWidth: 300,
      }));
      const type = { growDirection: 'vertical' };
      const rectByDatesMeta = { cellDuration: 30 };
      const intervals = [[
        { start: moment('2018-09-12 10:00'), end: moment('2018-09-12 10:10'), dataItem: 'a' },
        { start: moment('2018-09-12 10:00'), end: moment('2018-09-12 10:30'), dataItem: 'b' },
        { start: moment('2018-09-12 10:00'), end: moment('2018-09-12 10:35'), dataItem: 'c' },
      ]];

      const rects = calculateRectByDateAndGroupIntervals(
        type, intervals, rectByDatesMock, rectByDatesMeta,
      );

      expect(rects)
        .toHaveLength(3);
      expect(rects[0])
        .toMatchObject({
          top: 10,
          height: 50,
          left: 0,
          width: 11,
          dataItem: 'c',
          type: 'vertical',
          durationType: 'long',
        });
      expect(rects[1])
        .toMatchObject({
          top: 10,
          height: 50,
          left: 11,
          width: 11,
          dataItem: 'b',
          type: 'vertical',
          durationType: 'middle',
        });
      expect(rects[2])
        .toMatchObject({
          top: 10,
          height: 50,
          left: 22,
          width: 11,
          dataItem: 'a',
          type: 'vertical',
          durationType: 'short',
        });
    });
    it('should group 2 all-day appointments if the first ends on the same day as the second starts, but earlier', () => {
      const rectByDatesMock = jest.fn();
      rectByDatesMock.mockImplementation(() => ({
        top: 10,
        left: 0,
        height: 50,
        width: 99,
        parentWidth: 300,
      }));
      const type = { growDirection: 'horizontal', multiline: false };
      const rectByDatesMeta = {};
      const intervals = [[
        { start: moment('2018-09-12 10:00'), end: moment('2018-09-13 10:00'), dataItem: 'a' },
        { start: moment('2018-09-13 11:00'), end: moment('2018-09-14 15:00'), dataItem: 'b' },
      ]];

      const rects = calculateRectByDateAndGroupIntervals(
        type, intervals, rectByDatesMock, rectByDatesMeta,
      );

      expect(rects)
        .toHaveLength(2);
      expect(rects[0])
        .toMatchObject({
          top: 10,
          height: 25,
          left: 0,
          width: 33,
          dataItem: 'a',
          type: 'horizontal',
        });
      expect(rects[1])
        .toMatchObject({
          top: 35,
          height: 25,
          left: 0,
          width: 33,
          dataItem: 'b',
          type: 'horizontal',
        });
    });
  });
  describe('#createAppointmentForest', () => {
    const CELL_DURATION = 30;
    it('should create a single tree if items.length === 1', () => {
      const appointmentsGroups = [{
        reduceValue: 1,
        items: [{
          start: moment('2017-07-20 08:00'),
          end: moment('2017-07-20 08:30'),
          dataItem: {},
          offset: 0,
        }],
      }];

      const expectedItems = [{
        ...appointmentsGroups[0].items[0],
        children: [],
        treeDepth: 0,
        hasDirectChild: false,
        isDirectChild: false,
      }];

      expect(createAppointmentForest(appointmentsGroups, CELL_DURATION))
        .toEqual([{
          items: [expectedItems[0]],
          reduceValue: 1,
          roots: [expectedItems[0]],
        }]);
    });

    it('should create a tree with a direct child (whose start is not later than parent\'s start plus cell duration)', () => {
      const appointmentGroups = [{
        reduceValue: 1,
        items: [{
          start: moment('2017-07-20 08:00'),
          end: moment('2017-07-20 08:30'),
          dataItem: { id: 0 },
          offset: 0,
        }, {
          start: moment('2017-07-20 08:00'),
          end: moment('2017-07-20 08:30'),
          dataItem: { id: 1 },
          offset: 1,
        }],
      }];

      const result = createAppointmentForest(appointmentGroups, CELL_DURATION);
      expect(result[0].items)
        .toHaveLength(2);

      const firstAppointment = result[0].items[0];
      const secondAppointment = result[0].items[1];
      expect(firstAppointment)
        .toEqual({
          ...appointmentGroups[0].items[0],
          hasDirectChild: true,
          isDirectChild: false,
          parent: undefined,
          children: [secondAppointment],
          treeDepth: 1,
        });
      expect(firstAppointment.children[0])
        .toBe(secondAppointment);

      expect(secondAppointment)
        .toEqual({
          ...appointmentGroups[0].items[1],
          hasDirectChild: false,
          isDirectChild: true,
          children: [],
          parent: firstAppointment,
          treeDepth: 0,
        });
      expect(secondAppointment.parent)
        .toBe(firstAppointment);

      expect(result[0].roots)
        .toHaveLength(1);
      expect(result[0].roots[0])
        .toBe(firstAppointment);
    });

    it('should create a tree with an indirect child (whose start is later than parent\'s start plus cell duration)', () => {
      const appointmentGroups = [{
        reduceValue: 1,
        items: [{
          start: moment('2017-07-20 08:00'),
          end: moment('2017-07-20 09:00'),
          dataItem: { id: 0 },
          offset: 0,
        }, {
          start: moment('2017-07-20 08:30'),
          end: moment('2017-07-20 09:00'),
          dataItem: { id: 1 },
          offset: 1,
        }],
      }];

      const result = createAppointmentForest(appointmentGroups, CELL_DURATION);
      expect(result[0].items)
        .toHaveLength(2);

      const firstAppointment = result[0].items[0];
      const secondAppointment = result[0].items[1];
      expect(firstAppointment)
        .toEqual({
          ...appointmentGroups[0].items[0],
          hasDirectChild: false,
          isDirectChild: false,
          parent: undefined,
          children: [secondAppointment],
          treeDepth: 1,
        });
      expect(firstAppointment.children[0])
        .toBe(secondAppointment);

      expect(secondAppointment)
        .toEqual({
          ...appointmentGroups[0].items[1],
          hasDirectChild: false,
          isDirectChild: false,
          children: [],
          parent: firstAppointment,
          treeDepth: 0,
        });
      expect(secondAppointment.parent)
        .toBe(firstAppointment);

      expect(result[0].roots)
        .toHaveLength(1);
      expect(result[0].roots[0])
        .toBe(firstAppointment);
    });

    it('should create a forest with 2 roots', () => {
      const appointmentGroups = [{
        reduceValue: 1,
        items: [{
          start: moment('2017-07-20 08:00'),
          end: moment('2017-07-20 09:00'),
          dataItem: { id: 0 },
          offset: 0,
        }, {
          start: moment('2017-07-20 08:30'),
          end: moment('2017-07-20 10:00'),
          dataItem: { id: 1 },
          offset: 1,
        }, {
          start: moment('2017-07-20 09:00'),
          end: moment('2017-07-20 10:00'),
          dataItem: { id: 2 },
          offset: 0,
        }],
      }];

      const result = createAppointmentForest(appointmentGroups, CELL_DURATION);
      expect(result[0].items)
        .toHaveLength(3);

      const firstAppointment = result[0].items[0];
      const secondAppointment = result[0].items[1];
      const thirdAppointment = result[0].items[2];

      expect(firstAppointment)
        .toEqual({
          ...appointmentGroups[0].items[0],
          hasDirectChild: false,
          isDirectChild: false,
          parent: undefined,
          children: [secondAppointment],
          treeDepth: 1,
        });
      expect(firstAppointment.children[0])
        .toBe(secondAppointment);

      expect(secondAppointment)
        .toEqual({
          ...appointmentGroups[0].items[1],
          hasDirectChild: false,
          isDirectChild: false,
          children: [],
          parent: firstAppointment,
          treeDepth: 0,
        });
      expect(secondAppointment.parent)
        .toBe(firstAppointment);

      expect(thirdAppointment)
        .toEqual({
          ...appointmentGroups[0].items[2],
          hasDirectChild: false,
          isDirectChild: false,
          parent: undefined,
          children: [],
          treeDepth: 0,
        });

      expect(result[0].roots)
        .toHaveLength(2);
      expect(result[0].roots[0])
        .toBe(firstAppointment);
      expect(result[0].roots[1])
        .toBe(thirdAppointment);
    });

    it('should create a forest and correctly assign parents and children props '
      + 'when there are appointments with smaller offset between a parent and its child', () => {
      // The last appointment's parent should be the appointment with id = 1
      const appointmentGroups = [{
        reduceValue: 1,
        items: [{
          start: moment('2017-07-20 08:00'),
          end: moment('2017-07-20 09:00'),
          dataItem: { id: 0 },
          offset: 0,
        }, {
          start: moment('2017-07-20 08:30'),
          end: moment('2017-07-20 12:00'),
          dataItem: { id: 1 },
          offset: 1,
        }, {
          start: moment('2017-07-20 09:00'),
          end: moment('2017-07-20 10:00'),
          dataItem: { id: 2 },
          offset: 0,
        }, {
          start: moment('2017-07-20 09:00'),
          end: moment('2017-07-20 10:00'),
          dataItem: { id: 3 },
          offset: 2,
        }],
      }];

      const result = createAppointmentForest(appointmentGroups, CELL_DURATION);
      expect(result[0].items)
        .toHaveLength(4);

      const firstAppointment = result[0].items[0];
      const secondAppointment = result[0].items[1];
      const thirdAppointment = result[0].items[2];
      const fourthAppointment = result[0].items[3];

      expect(firstAppointment)
        .toEqual({
          ...appointmentGroups[0].items[0],
          hasDirectChild: false,
          isDirectChild: false,
          parent: undefined,
          children: [secondAppointment],
          treeDepth: 2,
        });
      expect(firstAppointment.children[0])
        .toBe(secondAppointment);

      expect(secondAppointment)
        .toEqual({
          ...appointmentGroups[0].items[1],
          hasDirectChild: false,
          isDirectChild: false,
          children: [fourthAppointment],
          parent: firstAppointment,
          treeDepth: 1,
        });
      expect(secondAppointment.parent)
        .toBe(firstAppointment);
      expect(secondAppointment.children[0])
        .toBe(fourthAppointment);

      expect(thirdAppointment)
        .toEqual({
          ...appointmentGroups[0].items[2],
          hasDirectChild: false,
          isDirectChild: false,
          parent: undefined,
          children: [],
          treeDepth: 0,
        });

      expect(fourthAppointment)
        .toEqual({
          ...appointmentGroups[0].items[3],
          hasDirectChild: false,
          isDirectChild: false,
          children: [],
          parent: secondAppointment,
          treeDepth: 0,
        });
      expect(fourthAppointment.parent)
        .toBe(secondAppointment);

      expect(result[0].roots)
        .toHaveLength(2);
      expect(result[0].roots[0])
        .toBe(firstAppointment);
      expect(result[0].roots[1])
        .toBe(thirdAppointment);
    });

    it('should work correctly when there are several children', () => {
      const appointmentGroups = [{
        reduceValue: 1,
        items: [{
          start: moment('2017-07-20 08:00'),
          end: moment('2017-07-20 12:00'),
          dataItem: { id: 0 },
          offset: 0,
        }, {
          start: moment('2017-07-20 08:29'),
          end: moment('2017-07-20 09:00'),
          dataItem: { id: 1 },
          offset: 1,
        }, {
          start: moment('2017-07-20 10:30'),
          end: moment('2017-07-20 11:00'),
          dataItem: { id: 2 },
          offset: 1,
        }],
      }];

      const result = createAppointmentForest(appointmentGroups, CELL_DURATION);
      expect(result[0].items)
        .toHaveLength(3);

      const firstAppointment = result[0].items[0];
      const secondAppointment = result[0].items[1];
      const thirdAppointment = result[0].items[2];

      expect(firstAppointment)
        .toEqual({
          ...appointmentGroups[0].items[0],
          hasDirectChild: true,
          isDirectChild: false,
          parent: undefined,
          children: [secondAppointment, thirdAppointment],
          treeDepth: 1,
        });
      expect(firstAppointment.children[0])
        .toBe(secondAppointment);
      expect(firstAppointment.children[1])
        .toBe(thirdAppointment);

      expect(secondAppointment)
        .toEqual({
          ...appointmentGroups[0].items[1],
          hasDirectChild: false,
          isDirectChild: true,
          children: [],
          parent: firstAppointment,
          treeDepth: 0,
        });
      expect(secondAppointment.parent)
        .toBe(firstAppointment);

      expect(thirdAppointment)
        .toEqual({
          ...appointmentGroups[0].items[2],
          hasDirectChild: false,
          isDirectChild: false,
          children: [],
          parent: firstAppointment,
          treeDepth: 0,
        });
      expect(thirdAppointment.parent)
        .toBe(firstAppointment);

      expect(result[0].roots)
        .toHaveLength(1);
      expect(result[0].roots[0])
        .toBe(firstAppointment);
    });
  });

  describe('#calculateAppointmentLeftAndWidth', () => {
    const MAX_WIDTH = 1;
    it('should work when there are no parent and no direct children', () => {
      const appointment = {
        hasDirectChild: false,
        parent: undefined,
      };
      expect(calculateAppointmentLeftAndWidth(appointment, MAX_WIDTH))
        .toEqual({ left: 0, width: 1 });
    });

    it('should work when appointment has no parent but has a direct child', () => {
      const appointment = {
        hasDirectChild: true,
        parent: undefined,
        treeDepth: 1,
      };
      expect(calculateAppointmentLeftAndWidth(appointment, MAX_WIDTH))
        .toEqual({ left: 0, width: matchFloat(0.5) });
    });

    it('should work when appointment is a direct child, has a parent and does not have direct children', () => {
      const appointment = {
        hasDirectChild: false,
        isDirectChild: true,
        treeDepth: 0,
        parent: {
          hasDirectChild: true,
          width: 0.5,
          left: 0,
        },
      };
      expect(calculateAppointmentLeftAndWidth(appointment, MAX_WIDTH))
        .toEqual({ left: matchFloat(0.5), width: matchFloat(0.5) });
    });

    it('should work when appointment is not a direct child, has a parent and does not have direct children', () => {
      const appointment = {
        hasDirectChild: false,
        isDirectChild: false,
        treeDepth: 0,
        parent: {
          hasDirectChild: false,
          width: 1,
          left: 0,
        },
      };
      expect(calculateAppointmentLeftAndWidth(appointment, MAX_WIDTH))
        .toEqual({ left: matchFloat(0.05), width: matchFloat(0.95) });
    });

    it('should work when appointment is not a direct child, has a parent, which has a direct child, and does not have direct children', () => {
      const appointment = {
        hasDirectChild: false,
        isDirectChild: false,
        treeDepth: 0,
        parent: {
          hasDirectChild: true,
          width: 0.5,
          left: 0,
        },
      };
      expect(calculateAppointmentLeftAndWidth(appointment, MAX_WIDTH))
        .toEqual({ left: matchFloat(0.05), width: matchFloat(0.95) });
    });

    it('should work when appointment is a direct child, has a parent and has direct children', () => {
      const appointment = {
        hasDirectChild: true,
        isDirectChild: true,
        treeDepth: 1,
        parent: {
          hasDirectChild: true,
          width: 0.33,
          left: 0,
        },
      };
      expect(calculateAppointmentLeftAndWidth(appointment, MAX_WIDTH))
        .toEqual({ left: matchFloat(0.33), width: matchFloat(0.33) });
    });

    it('should work when appointment is not a direct child, has a parent and does not have direct children', () => {
      const appointment = {
        hasDirectChild: true,
        isDirectChild: false,
        treeDepth: 1,
        parent: {
          hasDirectChild: false,
          width: 1,
          left: 0,
        },
      };
      expect(calculateAppointmentLeftAndWidth(appointment, MAX_WIDTH))
        .toEqual({ left: matchFloat(0.05), width: matchFloat(0.475) });
    });

    it('should work when appointment is not a direct child, has a parent, which has a direct child, and does not have direct children', () => {
      const appointment = {
        hasDirectChild: true,
        isDirectChild: false,
        treeDepth: 1,
        parent: {
          hasDirectChild: true,
          width: 0.5,
          left: 0,
        },
      };
      expect(calculateAppointmentLeftAndWidth(appointment, MAX_WIDTH))
        .toEqual({ left: matchFloat(0.05), width: matchFloat(0.475) });
    });
  });
});
