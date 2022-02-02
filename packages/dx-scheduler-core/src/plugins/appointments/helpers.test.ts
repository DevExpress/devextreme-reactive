import moment from 'moment';
import {
  isTimeTableElementsMetaActual, isAllDayElementsMetaActual, sortAppointments,
  findOverlappedAppointments, calculateAppointmentOffsets, unwrapGroups,
  calculateRectByDateAndGroupIntervals, createAppointmentForest,
  calculateAppointmentLeftAndWidth, isPossibleChild, findMaxReduceValue,
  calculateAppointmentsMetaData, isOverlappingSubTreeRoot,
  findChildrenMaxEndDate, prepareToGroupIntoBlocks, groupAppointmentsIntoBlocks,
  findBlockIndexByAppointment, findIncludedBlocks, findChildBlocks,
  calculateIncludedBlockMaxRight, calculateBlocksTotalSize, calculateBlocksLeftLimit,
  updateBlocksProportions, updateBlocksLeft, adjustByBlocks,
} from './helpers';
import { VERTICAL_GROUP_ORIENTATION, HORIZONTAL_GROUP_ORIENTATION } from '../../constants';

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
  const INDIRECT_CHILD_LEFT_OFFSET = 0.05;
  const MAX_RIGHT = 1;

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

  describe('#calculateAppointmentOffsets', () => {
    it('should calculate appointment offset and reduce coefficient', () => {
      expect(calculateAppointmentOffsets(overlappedAppointments))
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
      expect(calculateAppointmentOffsets(groups))
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
      expect(calculateAppointmentOffsets(groups, true))
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
      expect(calculateAppointmentOffsets(groups, true))
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
      expect(calculateAppointmentOffsets(groups, true))
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
      const result = calculateAppointmentOffsets(groups, true);
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
          top: 35,
          height: 25,
          left: 0,
          width: 33,
          dataItem: 'b',
          type: 'horizontal',
        });
      expect(rects[1])
        .toMatchObject({
          top: 10,
          height: 25,
          left: 0,
          width: 33,
          dataItem: 'a',
          type: 'horizontal',
        });
    });
    it('should work with old vertical', () => {
      const rectByDatesMock = jest.fn();
      rectByDatesMock.mockImplementation(() => ({
        top: 10,
        left: 0,
        height: 50,
        width: 99,
        parentWidth: 300,
      }));
      const type = { growDirection: 'vertical' };
      const rectByDatesMeta = { cellDuration: 30, placeAppointmentsNextToEachOther: true };
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
          left: 22,
          width: 11,
          dataItem: 'a',
          type: 'vertical',
          durationType: 'short',
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
          left: 0,
          width: 11,
          dataItem: 'c',
          type: 'vertical',
          durationType: 'long',
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
          width: matchFloat(18.33),
          dataItem: 'c',
          type: 'vertical',
          durationType: 'long',
        });
      expect(rects[1])
        .toMatchObject({
          top: 10,
          height: 50,
          left: 11,
          width: matchFloat(18.33),
          dataItem: 'b',
          type: 'vertical',
          durationType: 'middle',
        });
      expect(rects[2])
        .toMatchObject({
          top: 10,
          height: 50,
          left: matchFloat(22),
          width: matchFloat(11),
          dataItem: 'a',
          type: 'vertical',
          durationType: 'short',
        });
    });
    it('should work with separated by start date vertical', () => {
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
        { start: moment('2018-09-12 10:00'), end: moment('2018-09-12 15:00'), dataItem: 'a' },
        { start: moment('2018-09-12 11:00'), end: moment('2018-09-12 12:30'), dataItem: 'b' },
      ]];

      const rects = calculateRectByDateAndGroupIntervals(
        type, intervals, rectByDatesMock, rectByDatesMeta,
      );

      expect(rects)
        .toHaveLength(2);
      expect(rects[0])
        .toMatchObject({
          top: 10,
          height: 50,
          left: 0,
          width: matchFloat(33),
          dataItem: 'a',
          type: 'vertical',
          durationType: 'long',
        });
      expect(rects[1])
        .toMatchObject({
          top: 10,
          height: 50,
          left: matchFloat(1.65),
          width: matchFloat(31.35),
          dataItem: 'b',
          type: 'vertical',
          durationType: 'long',
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
          top: 35,
          height: 25,
          left: 0,
          width: 33,
          dataItem: 'b',
          type: 'horizontal',
        });
      expect(rects[1])
        .toMatchObject({
          top: 10,
          height: 25,
          left: 0,
          width: 33,
          dataItem: 'a',
          type: 'horizontal',
        });
    });
  });

  describe('#createAppointmentForest', () => {
    const CELL_DURATION = 30;
    it('should create a single tree if items.length === 1', () => {
      const appointmentGroups = [{
        reduceValue: 1,
        items: [{
          start: moment('2017-07-20 08:00'),
          end: moment('2017-07-20 08:30'),
          dataItem: {},
          offset: 0,
        }],
      }];

      const expectedItems = [{
        data: appointmentGroups[0].items[0],
        children: [],
        treeDepth: 0,
        hasDirectChild: false,
        isDirectChild: false,
      }];

      expect(createAppointmentForest(appointmentGroups, CELL_DURATION))
        .toEqual([{
          items: expectedItems,
          reduceValue: 1,
          roots: [0],
        }]);
    });

    it('should create a tree with a direct child (whose start is not later than parent\'s start plus cell duration)', () => {
      const appointmentGroups = [{
        reduceValue: 2,
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

      const expectedItems = [{
        data: appointmentGroups[0].items[0],
        children: [1],
        treeDepth: 1,
        hasDirectChild: true,
        isDirectChild: false,
      }, {
        data: appointmentGroups[0].items[1],
        children: [],
        treeDepth: 0,
        hasDirectChild: false,
        isDirectChild: true,
        parent: 0,
      }];

      const result = createAppointmentForest(appointmentGroups, CELL_DURATION);
      expect(result[0].items)
        .toHaveLength(2);

      expect(result)
        .toEqual([{
          items: expectedItems,
          reduceValue: 2,
          roots: [0],
        }]);
    });

    it('should create a tree with an indirect child (whose start is later than parent\'s start plus cell duration)', () => {
      const appointmentGroups = [{
        reduceValue: 2,
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

      const expectedItems = [{
        data: appointmentGroups[0].items[0],
        children: [1],
        treeDepth: 1,
        hasDirectChild: false,
        isDirectChild: false,
      }, {
        data: appointmentGroups[0].items[1],
        children: [],
        treeDepth: 0,
        hasDirectChild: false,
        isDirectChild: false,
        parent: 0,
      }];

      const result = createAppointmentForest(appointmentGroups, CELL_DURATION);
      expect(result[0].items)
        .toHaveLength(2);

      expect(result)
        .toEqual([{
          items: expectedItems,
          reduceValue: 2,
          roots: [0],
        }]);
    });

    it('should create a forest with 2 roots', () => {
      const appointmentGroups = [{
        reduceValue: 2,
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

      const expectedItems = [{
        data: appointmentGroups[0].items[0],
        children: [1],
        treeDepth: 1,
        hasDirectChild: false,
        isDirectChild: false,
      }, {
        data: appointmentGroups[0].items[1],
        children: [],
        treeDepth: 0,
        hasDirectChild: false,
        isDirectChild: false,
        parent: 0,
      }, {
        data: appointmentGroups[0].items[2],
        children: [],
        treeDepth: 0,
        hasDirectChild: false,
        isDirectChild: false,
      }];

      const result = createAppointmentForest(appointmentGroups, CELL_DURATION);
      expect(result[0].items)
        .toHaveLength(3);

      expect(result)
        .toEqual([{
          items: expectedItems,
          reduceValue: 2,
          roots: [0, 2],
        }]);
    });

    it('should create a forest and correctly assign parents and children props '
      + 'when there are appointments with smaller offset between a parent and its child', () => {
      // The last appointment's parent should be the appointment with id = 1
      const appointmentGroups = [{
        reduceValue: 3,
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

      const expectedItems = [{
        data: appointmentGroups[0].items[0],
        children: [1],
        treeDepth: 2,
        hasDirectChild: false,
        isDirectChild: false,
      }, {
        data: appointmentGroups[0].items[1],
        children: [3],
        treeDepth: 1,
        hasDirectChild: false,
        isDirectChild: false,
        parent: 0,
      }, {
        data: appointmentGroups[0].items[2],
        children: [],
        treeDepth: 0,
        hasDirectChild: false,
        isDirectChild: false,
      }, {
        data: appointmentGroups[0].items[3],
        children: [],
        treeDepth: 0,
        hasDirectChild: false,
        isDirectChild: false,
        parent: 1,
      }];

      const result = createAppointmentForest(appointmentGroups, CELL_DURATION);
      expect(result[0].items)
        .toHaveLength(4);

      expect(result)
        .toEqual([{
          items: expectedItems,
          reduceValue: 3,
          roots: [0, 2],
        }]);
    });

    it('should work correctly when there are several children', () => {
      const appointmentGroups = [{
        reduceValue: 2,
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

      const expectedItems = [{
        data: appointmentGroups[0].items[0],
        children: [1, 2],
        treeDepth: 1,
        hasDirectChild: true,
        isDirectChild: false,
      }, {
        data: appointmentGroups[0].items[1],
        children: [],
        treeDepth: 0,
        hasDirectChild: false,
        isDirectChild: true,
        parent: 0,
      }, {
        data: appointmentGroups[0].items[2],
        children: [],
        treeDepth: 0,
        hasDirectChild: false,
        isDirectChild: false,
        parent: 0,
      }];

      const result = createAppointmentForest(appointmentGroups, CELL_DURATION);
      expect(result[0].items)
        .toHaveLength(3);

      expect(result)
        .toEqual([{
          items: expectedItems,
          reduceValue: 2,
          roots: [0],
        }]);
    });
  });

  describe('#isPossibleChild', () => {
    const baseAppointments = [
      { data: { start: moment('2018-07-02 10:00'), end: moment('2018-07-02 11:00'), offset: 0 } },
      { data: { start: moment('2018-07-02 10:30'), end: moment('2018-07-02 12:00'), offset: 1 } },
      { data: { start: moment('2018-07-01 10:30'), end: moment('2018-07-01 13:30'), offset: 2 } },
    ];

    it('should return true if this appointment or one of the following may be a child', () => {
      const { end: parentEnd, end: parentOFfset } = baseAppointments[0].data;

      expect(isPossibleChild(baseAppointments, 1, parentEnd, parentOFfset))
        .toBe(true);
      expect(isPossibleChild(baseAppointments, 2, parentEnd, parentOFfset))
        .toBe(true);
    });

    it('should return false if the appointment with provided index does not exist', () => {
      const { end: parentEnd, end: parentOFfset } = baseAppointments[0].data;

      expect(isPossibleChild(baseAppointments, 3, parentEnd, parentOFfset))
        .toBe(false);
    });

    it('should return false if appointment\'s start is after parent\'s end', () => {
      const appointments = [
        ...baseAppointments,
        { data: { start: moment('2018-07-02 13:00'), end: moment('2018-07-02 14:00'), offset: 3 } },
      ];
      const { end: parentEnd, end: parentOFfset } = appointments[1].data;

      expect(isPossibleChild(appointments, 3, parentEnd, parentOFfset))
        .toBe(false);
    });

    it('should return false if appointment\'s offset is equal to that of the parent', () => {
      const appointments = [
        ...baseAppointments,
        { data: { start: moment('2018-07-02 11:00'), end: moment('2018-07-02 12:00'), offset: 0 } },
      ];
      const { end: parentEnd, end: parentOFfset } = appointments[0].data;

      expect(isPossibleChild(appointments, 3, parentEnd, parentOFfset))
        .toBe(false);
    });
  });

  describe('#findMaxReduceValue', () => {
    it('should work', () => {
      const appointmentGroups = [
        { reduceValue: 3 },
        { reduceValue: 5 },
        { reduceValue: 2 },
        { reduceValue: 7 },
      ];

      expect(findMaxReduceValue(appointmentGroups))
        .toBe(7);
    });
  });

  describe('#calculateAppointmentLeftAndWidth', () => {
    it('should work when there are no parent and no direct children', () => {
      const appointment = {
        hasDirectChild: false,
        parent: undefined,
        children: [],
      };
      expect(calculateAppointmentLeftAndWidth(
        [], undefined, appointment, MAX_RIGHT, INDIRECT_CHILD_LEFT_OFFSET, undefined,
      ))
        .toEqual({ left: 0, width: 1 });
    });

    it('should work when appointment has no parent but has a direct child', () => {
      const appointment = {
        hasDirectChild: true,
        parent: undefined,
        treeDepth: 1,
        children: [],
      };
      expect(calculateAppointmentLeftAndWidth(
        [], undefined, appointment, MAX_RIGHT, INDIRECT_CHILD_LEFT_OFFSET, undefined,
      ))
        .toEqual({ left: 0, width: matchFloat(0.5) });
    });

    it('should work when appointment is a direct child, has a parent and does not have direct children', () => {
      const appointments = [{
        hasDirectChild: true,
        isDirectChild: false,
        treeDepth: 1,
        children: [1],
        data: { left: 0, width: 0.5 },
      }, {
        hasDirectChild: false,
        isDirectChild: true,
        treeDepth: 0,
        children: [],
        parent: 0,
      }];

      expect(calculateAppointmentLeftAndWidth(
        appointments, undefined, appointments[1], MAX_RIGHT, INDIRECT_CHILD_LEFT_OFFSET, undefined,
      ))
        .toEqual({ left: matchFloat(0.5), width: matchFloat(0.5) });
    });

    it('should work when appointment is not a direct child, has a parent and does not have direct children', () => {
      const appointments = [{
        hasDirectChild: false,
        isDirectChild: false,
        treeDepth: 1,
        children: [1],
        data: { left: 0, width: 1 },
      }, {
        hasDirectChild: false,
        isDirectChild: false,
        treeDepth: 0,
        children: [],
        parent: 0,
      }];

      expect(calculateAppointmentLeftAndWidth(
        appointments, undefined, appointments[1], MAX_RIGHT, INDIRECT_CHILD_LEFT_OFFSET, undefined,
      ))
        .toEqual({ left: matchFloat(0.05), width: matchFloat(0.95) });
    });

    // tslint:disable-next-line: max-line-length
    it('should work when appointment is not a direct child, has a parent, which has a direct child', () => {
      const appointments = [{
        hasDirectChild: true,
        isDirectChild: false,
        treeDepth: 1,
        children: [1],
        data: { left: 0, width: 1 },
      }, {
        hasDirectChild: false,
        isDirectChild: false,
        treeDepth: 0,
        children: [],
        parent: 0,
      }];

      expect(calculateAppointmentLeftAndWidth(
        appointments, undefined, appointments[1], MAX_RIGHT, INDIRECT_CHILD_LEFT_OFFSET, undefined,
      ))
        .toEqual({ left: matchFloat(0.05), width: matchFloat(0.95) });
    });

    // tslint:disable-next-line: max-line-length
    it('should work when appointment is a direct child, has a parent and has direct children', () => {
      const appointments = [{
        hasDirectChild: true,
        isDirectChild: false,
        treeDepth: 2,
        children: [1],
        data: { left: 0, width: 0.33 },
      }, {
        hasDirectChild: true,
        isDirectChild: true,
        treeDepth: 1,
        children: [2],
        parent: 0,
      }, {
        hasDirectChild: false,
        isDirectChild: true,
        treeDepth: 0,
        children: [],
        parent: 1,
      }];

      expect(calculateAppointmentLeftAndWidth(
        appointments, undefined, appointments[1], MAX_RIGHT, INDIRECT_CHILD_LEFT_OFFSET, undefined,
      ))
        .toEqual({ left: matchFloat(0.33), width: matchFloat(0.33) });
    });

    it('should work when appointment is not a direct child, has a parent and does not have direct children', () => {
      const appointments = [{
        hasDirectChild: false,
        isDirectChild: false,
        treeDepth: 2,
        children: [1],
        data: { left: 0, width: 1 },
      }, {
        hasDirectChild: true,
        isDirectChild: false,
        treeDepth: 1,
        children: [2],
        parent: 0,
      }, {
        hasDirectChild: false,
        isDirectChild: true,
        treeDepth: 0,
        children: [],
        parent: 1,
      }];

      expect(calculateAppointmentLeftAndWidth(
        appointments, undefined, appointments[1], MAX_RIGHT, INDIRECT_CHILD_LEFT_OFFSET, undefined,
      ))
        .toEqual({ left: matchFloat(0.05), width: matchFloat(0.475) });
    });

    it('should work when appointment is not a direct child, does not have direct children and has a parent, which has a direct child', () => {
      const appointments = [{
        hasDirectChild: true,
        isDirectChild: false,
        treeDepth: 2,
        children: [1],
        data: { left: 0, width: 1 },
      }, {
        hasDirectChild: true,
        isDirectChild: false,
        treeDepth: 1,
        children: [2],
        parent: 0,
      }, {
        hasDirectChild: false,
        isDirectChild: true,
        treeDepth: 0,
        children: [],
        parent: 1,
      }];

      expect(calculateAppointmentLeftAndWidth(
        appointments, undefined, appointments[1], MAX_RIGHT, INDIRECT_CHILD_LEFT_OFFSET, undefined,
      ))
        .toEqual({ left: matchFloat(0.05), width: matchFloat(0.475) });
    });

    it('should take into account maxRight', () => {
      const appointment = {
        hasDirectChild: false,
        parent: undefined,
        children: [],
      };
      expect(calculateAppointmentLeftAndWidth(
        [], undefined, appointment, 0.5, INDIRECT_CHILD_LEFT_OFFSET, undefined,
      ))
        .toEqual({ left: 0, width: 0.5 });
    });

    it('should take into account indirectChildLeft', () => {
      const appointments = [{
        hasDirectChild: false,
        isDirectChild: false,
        treeDepth: 1,
        children: [1],
        data: { left: 0, width: 1 },
      }, {
        hasDirectChild: false,
        isDirectChild: false,
        treeDepth: 0,
        children: [],
        parent: 0,
      }];

      expect(calculateAppointmentLeftAndWidth(
        appointments, undefined, appointments[1], MAX_RIGHT, 0.03, undefined,
      ))
        .toEqual({ left: matchFloat(0.03), width: matchFloat(0.97) });
    });

    it('should take into account defaultLeft', () => {
      const appointments = [{
        hasDirectChild: true,
        isDirectChild: false,
        treeDepth: 1,
        children: [1],
        data: { left: 0, width: 0.5 },
      }, {
        hasDirectChild: false,
        isDirectChild: true,
        treeDepth: 0,
        children: [],
        parent: 0,
      }];
      const defaultLeft = 0.95;

      expect(calculateAppointmentLeftAndWidth(
        appointments, undefined, appointments[1],
        MAX_RIGHT, INDIRECT_CHILD_LEFT_OFFSET, defaultLeft,
      ))
        .toEqual({ left: matchFloat(0.95), width: matchFloat(0.05) });
    });

    it('should ignore defaultLeft if it is less than calculated left', () => {
      const appointments = [{
        hasDirectChild: true,
        isDirectChild: false,
        treeDepth: 1,
        children: [1],
        data: { left: 0, width: 0.5 },
      }, {
        hasDirectChild: false,
        isDirectChild: true,
        treeDepth: 0,
        children: [],
        parent: 0,
      }];
      const defaultLeft = 0.33;

      expect(calculateAppointmentLeftAndWidth(
        appointments, undefined, appointments[1],
        MAX_RIGHT, INDIRECT_CHILD_LEFT_OFFSET, defaultLeft,
      ))
        .toEqual({ left: matchFloat(0.5), width: matchFloat(0.5) });
    });

    it('should work with block indexes', () => {
      const appointments = [{
        hasDirectChild: true,
        isDirectChild: false,
        treeDepth: 2,
        children: [1],
        data: { left: 0, width: 0.33 },
      }, {
        hasDirectChild: true,
        isDirectChild: true,
        treeDepth: 1,
        children: [2],
        parent: 0,
        blockIndex: 1,
      }, {
        hasDirectChild: false,
        isDirectChild: true,
        treeDepth: 0,
        children: [],
        parent: 1,
        blockIndex: 1,
      }];

      expect(calculateAppointmentLeftAndWidth(
        appointments, undefined, appointments[1],
        MAX_RIGHT, INDIRECT_CHILD_LEFT_OFFSET, undefined,
      ))
        .toEqual({ left: matchFloat(0.33), width: matchFloat(0.33) });
    });

    it('should work with blocks', () => {
      const appointments = [{
        hasDirectChild: true,
        isDirectChild: false,
        treeDepth: 2,
        children: [1],
        data: { left: 0, width: 0.33 },
      }, {
        hasDirectChild: true,
        isDirectChild: true,
        treeDepth: 1,
        children: [2],
        parent: 0,
        blockIndex: 1,
      }, {
        hasDirectChild: false,
        isDirectChild: true,
        treeDepth: 0,
        children: [],
        parent: 1,
        blockIndex: 2,
      }];
      const blocks = [
        { includedInto: undefined }, { includedInto: undefined }, { includedInto: undefined },
      ];

      expect(calculateAppointmentLeftAndWidth(
        appointments, blocks, appointments[1],
        MAX_RIGHT, INDIRECT_CHILD_LEFT_OFFSET, undefined,
      ))
        .toEqual({ left: matchFloat(0.33), width: matchFloat(0.33) });
    });

    it('should work with blocks and custom maxRight', () => {
      const appointments = [{
        hasDirectChild: true,
        isDirectChild: false,
        treeDepth: 2,
        children: [1],
        data: { left: 0, width: 0.33 },
      }, {
        hasDirectChild: true,
        isDirectChild: true,
        treeDepth: 1,
        children: [2],
        parent: 0,
        blockIndex: 1,
      }, {
        hasDirectChild: false,
        isDirectChild: true,
        treeDepth: 0,
        children: [],
        parent: 1,
        blockIndex: 2,
      }];
      const blocks = [
        { includedInto: undefined }, { includedInto: undefined }, { includedInto: undefined },
      ];

      expect(calculateAppointmentLeftAndWidth(
        appointments, blocks, appointments[1],
        0.9, INDIRECT_CHILD_LEFT_OFFSET, undefined,
      ))
        .toEqual({ left: matchFloat(0.33), width: matchFloat(0.57) });
    });
  });

  describe('#calculateAppointmentsMetaData', () => {
    it('should work when there is only root', () => {
      const appointmentForest = [{
        roots: [0],
        items: [{
          data: {},
          hasDirectChild: false,
          isDirectChild: false,
          children: [],
          treeDepth: 0,
        }],
        reduceValue: 1,
      }];

      expect(calculateAppointmentsMetaData(appointmentForest, INDIRECT_CHILD_LEFT_OFFSET))
        .toEqual([{
          ...appointmentForest[0],
          items: [{
            ...appointmentForest[0].items[0],
            data: { left: 0, width: 1 },
          }],
        }]);
    });

    it('should work with children', () => {
      const appointmentForest = [{
        roots: [0],
        items: [{
          data: {},
          hasDirectChild: true,
          isDirectChild: false,
          children: [1, 2],
          treeDepth: 2,
        }, {
          data: {},
          hasDirectChild: false,
          isDirectChild: true,
          children: [],
          treeDepth: 0,
          parent: 0,
        }, {
          data: {},
          hasDirectChild: true,
          isDirectChild: false,
          children: [3],
          treeDepth: 1,
          parent: 0,
        }, {
          data: {},
          hasDirectChild: false,
          isDirectChild: true,
          children: [],
          treeDepth: 0,
          parent: 2,
        }],
        reduceValue: 3,
      }];

      expect(calculateAppointmentsMetaData(appointmentForest, INDIRECT_CHILD_LEFT_OFFSET))
        .toEqual([{
          ...appointmentForest[0],
          items: [{
            ...appointmentForest[0].items[0],
            data: { left: 0, width: matchFloat(0.33) },
          }, {
            ...appointmentForest[0].items[1],
            data: { left: matchFloat(0.33), width: matchFloat(0.67) },
          }, {
            ...appointmentForest[0].items[2],
            data: { left: matchFloat(0.05), width: matchFloat(0.475) },
          }, {
            ...appointmentForest[0].items[3],
            data: { left: matchFloat(0.525), width: matchFloat(0.475) },
          }],
        }]);
    });

    it('should work with several roots', () => {
      const appointmentForest = [{
        roots: [0, 2],
        items: [{
          data: {},
          hasDirectChild: true,
          isDirectChild: false,
          children: [1],
          treeDepth: 1,
        }, {
          data: {},
          hasDirectChild: false,
          isDirectChild: true,
          children: [],
          treeDepth: 0,
          parent: 0,
        }, {
          data: {},
          hasDirectChild: false,
          isDirectChild: false,
          children: [],
          treeDepth: 0,
        }],
        reduceValue: 2,
      }];

      expect(calculateAppointmentsMetaData(appointmentForest, INDIRECT_CHILD_LEFT_OFFSET))
        .toEqual([{
          ...appointmentForest[0],
          items: [{
            ...appointmentForest[0].items[0],
            data: { left: 0, width: matchFloat(0.5) },
          }, {
            ...appointmentForest[0].items[1],
            data: { left: matchFloat(0.5), width: matchFloat(0.5) },
          }, {
            ...appointmentForest[0].items[2],
            data: { left: 0, width: 1 },
          }],
        }]);
    });

    it('should work if all roots have children', () => {
      const appointmentForest = [{
        roots: [0, 2],
        items: [{
          data: {},
          hasDirectChild: true,
          isDirectChild: false,
          children: [1],
          treeDepth: 1,
        }, {
          data: {},
          hasDirectChild: false,
          isDirectChild: true,
          children: [],
          treeDepth: 0,
          parent: 0,
        }, {
          data: {},
          hasDirectChild: false,
          isDirectChild: false,
          children: [3],
          treeDepth: 1,
        }, {
          data: {},
          hasDirectChild: false,
          isDirectChild: false,
          children: [],
          treeDepth: 0,
          parent: 2,
        }],
        reduceValue: 2,
      }];

      expect(calculateAppointmentsMetaData(appointmentForest, INDIRECT_CHILD_LEFT_OFFSET))
        .toEqual([{
          ...appointmentForest[0],
          items: [{
            ...appointmentForest[0].items[0],
            data: { left: 0, width: matchFloat(0.5) },
          }, {
            ...appointmentForest[0].items[1],
            data: { left: matchFloat(0.5), width: matchFloat(0.5) },
          }, {
            ...appointmentForest[0].items[2],
            data: { left: 0, width: 1 },
          }, {
            ...appointmentForest[0].items[3],
            data: { left: matchFloat(0.05), width: matchFloat(0.95) },
          }],
        }]);
    });
  });

  describe('#findChildrenMaxEndDate', () => {
    it('should return max end date from the chosen appointment and its children', () => {
      const appointments = [
        { data: { end: moment('2020-05-06 16:00') }, children: [1] },
        { data: { end: moment('2020-05-06 16:40') }, children: [2, 3, 4] },
        { data: { end: moment('2020-05-06 16:20') }, children: [] },
        { data: { end: moment('2020-05-06 16:50') }, children: [] },
        { data: { end: moment('2020-05-06 16:30') }, children: [] },
      ];

      expect(findChildrenMaxEndDate(appointments, appointments[0]))
        .toEqual(moment('2020-05-06 16:50'));
    });
  });

  describe('#isOverlappingSubTreeRoot', () => {
    it('should return false if nextAppointment\'s offset is greater then current', () => {
      const appointment = { data: { offset: 5 } };
      const nextAppointment = { data: { offset: 6 } };

      expect(isOverlappingSubTreeRoot(appointment, nextAppointment, undefined, undefined))
        .toBe(false);
    });

    it('should return false if nextAppointment is already an overlappingSubTreeRoot', () => {
      const appointment = { data: { offset: 5 } };
      const nextAppointment = { data: { offset: 3 }, overlappingSubTreeRoot: true };

      expect(isOverlappingSubTreeRoot(appointment, nextAppointment, undefined, undefined))
        .toBe(false);
    });

    it('should return false if nextAppointment\'s maxOffset is less than offset', () => {
      const appointment = { data: { offset: 5 } };
      const nextAppointment = { data: { offset: 3 }, overlappingSubTreeRoot: false,  maxOffset: 4 };

      expect(isOverlappingSubTreeRoot(appointment, nextAppointment, undefined, undefined))
        .toBe(false);
    });

    it('should return false if nextAppointment\'s offset is greater than that of the previous subTreeRoot', () => {
      const appointment = { data: { offset: 5 } };
      const nextAppointment = { data: { offset: 3 }, overlappingSubTreeRoot: false };
      const previousSubTreeRoot = { data: { offset: 2 } };

      expect(isOverlappingSubTreeRoot(appointment, nextAppointment, previousSubTreeRoot, undefined))
        .toBe(false);
    });

    it('should return false if nextAppointment\'s start is before than block end', () => {
      const appointment = { data: { offset: 5 } };
      const nextAppointment = {
        data: { offset: 3, start: moment('2020-05-06 16:00') },
        overlappingSubTreeRoot: false,
      };
      const previousSubTreeRoot = { data: { offset: 4 } };
      const blockEnd = moment('2020-05-06 18:00');

      expect(isOverlappingSubTreeRoot(appointment, nextAppointment, previousSubTreeRoot, blockEnd))
        .toBe(false);
    });

    it('should return true if 1) there is no previous sub tree root, '
    + '2) next offset is less than current offset, 3) next appointment is not overlapping subtree root and '
    + '4) next appointment\'s maxOffset is undefined', () => {
      const appointment = { data: { offset: 5 } };
      const nextAppointment = {
        data: { offset: 3, start: moment('2020-05-06 16:00') },
        overlappingSubTreeRoot: false,
      };
      const previousSubTreeRoot = undefined;
      const blockEnd = moment('2020-05-06 18:00');

      expect(isOverlappingSubTreeRoot(appointment, nextAppointment, previousSubTreeRoot, blockEnd))
        .toBe(true);
    });

    it('should return true if 1) there is no previous sub tree root, '
    + '2) next offset is less than current offset, 3) next appointment is not overlapping subtree root and '
    + '4) next appointment\'s maxOffset is greater than or equal to current offset', () => {
      const appointment = { data: { offset: 5 } };
      const nextAppointment = {
        data: { offset: 3, start: moment('2020-05-06 16:00') },
        overlappingSubTreeRoot: false,
        maxOffset: 5,
      };
      const previousSubTreeRoot = undefined;
      const blockEnd = moment('2020-05-06 18:00');

      expect(isOverlappingSubTreeRoot(appointment, nextAppointment, previousSubTreeRoot, blockEnd))
        .toBe(true);
    });

    it('should return true if 1) previous subtree root\'s offset is greater than or equal to nextAppointment\'s offset, '
    + '2) next offset is less than current offset, 3) next appointment is not overlapping subtree root, '
    + '4) next appointment\'s maxOffset is greater than or equal to current offset and '
    + '5) block end date is before next appointment\'s start', () => {
      const appointment = { data: { offset: 5 } };
      const nextAppointment = {
        data: { offset: 3, start: moment('2020-05-06 19:00') },
        overlappingSubTreeRoot: false,
        maxOffset: 5,
      };
      const previousSubTreeRoot = { data: { offset: 4 } };
      const blockEnd = moment('2020-05-06 18:00');

      expect(isOverlappingSubTreeRoot(appointment, nextAppointment, previousSubTreeRoot, blockEnd))
        .toBe(true);
    });
  });

  describe('#prepareToGroupIntoBlocks', () => {
    it('should not find overlapping subtree roots', () => {
      const appointmentForest = [{
        reduceValue: 2,
        items: [{
          data: {
            start: moment('2017-07-20 08:00'),
            end: moment('2017-07-20 08:30'),
            offset: 0,
          },
          children: [1],
        }, {
          data: {
            start: moment('2017-07-20 08:00'),
            end: moment('2017-07-20 08:30'),
            offset: 1,
          },
          children: [],
          parent: 0,
        }],
      }];

      const expectedItems = [{
        ...appointmentForest[0].items[0],
        overlappingSubTreeRoots: [],
      }, {
        ...appointmentForest[0].items[1],
        overlappingSubTreeRoots: [],
      }];

      expect(prepareToGroupIntoBlocks(appointmentForest))
        .toEqual([{
          ...appointmentForest[0],
          items: expectedItems,
        }]);
    });

    it('should find one overlapping subtree roots', () => {
      const appointmentForest = [{
        reduceValue: 2,
        items: [
          {
            data: {
              start: moment('2017-07-20 08:00'),
              end: moment('2017-07-20 08:30'),
              offset: 0,
            },
            children: [1],
          },
          {
            data: {
              start: moment('2017-07-20 08:00'),
              end: moment('2017-07-20 11:30'),
              offset: 1,
            },
            children: [],
            parent: 0,
          },
          // should be an overlapping subtree root because it overlaps the second appointment
          // and its offset is less than second appointment's offset
          {
            data: {
              start: moment('2017-07-20 09:00'),
              end: moment('2017-07-20 11:00'),
              offset: 0,
            },
            children: [],
          }],
      }];

      const expectedItems = [{
        ...appointmentForest[0].items[0],
        overlappingSubTreeRoots: [],
      }, {
        ...appointmentForest[0].items[1],
        overlappingSubTreeRoots: [2],
      }, {
        ...appointmentForest[0].items[2],
        overlappingSubTreeRoots: [],
        overlappingSubTreeRoot: true,
        maxOffset: 1,
      }];

      expect(prepareToGroupIntoBlocks(appointmentForest))
        .toEqual([{
          ...appointmentForest[0],
          items: expectedItems,
        }]);
    });

    it('should work when there are several overlapping subtree roots', () => {
      const appointmentForest = [{
        reduceValue: 3,
        items: [
          {
            data: {
              start: moment('2017-07-20 08:00'),
              end: moment('2017-07-20 09:30'),
              offset: 0,
            },
            children: [1],
          },
          {
            data: {
              start: moment('2017-07-20 08:00'),
              end: moment('2017-07-20 08:30'),
              offset: 1,
            },
            children: [2],
            parent: 0,
          },
          {
            data: {
              start: moment('2017-07-20 08:15'),
              end: moment('2017-07-20 12:30'),
              offset: 2,
            },
            children: [],
            parent: 1,
          },
          // should be an overlapping subtree root because it overlaps the third appointment
          // and its offset is less than third appointment's offset
          {
            data: {
              start: moment('2017-07-20 09:00'),
              end: moment('2017-07-20 11:00'),
              offset: 1,
            },
            children: [],
            parent: 0,
          },
          // should be an overlapping subtree root because it overlaps the fourth appointment
          // and its offset is less than fourth appointment's offset
          {
            data: {
              start: moment('2017-07-20 10:00'),
              end: moment('2017-07-20 12:00'),
              offset: 0,
            },
            children: [],
          },
        ],
      }];

      const expectedItems = [{
        ...appointmentForest[0].items[0],
        overlappingSubTreeRoots: [],
      }, {
        ...appointmentForest[0].items[1],
        overlappingSubTreeRoots: [],
      }, {
        ...appointmentForest[0].items[2],
        overlappingSubTreeRoots: [3],
      }, {
        ...appointmentForest[0].items[3],
        overlappingSubTreeRoots: [4],
        overlappingSubTreeRoot: true,
        maxOffset: 2,
      }, {
        ...appointmentForest[0].items[4],
        overlappingSubTreeRoots: [],
        overlappingSubTreeRoot: true,
        maxOffset: 2,
      }];

      expect(prepareToGroupIntoBlocks(appointmentForest))
        .toEqual([{
          ...appointmentForest[0],
          items: expectedItems,
        }]);
    });

    it('should work with complex cases', () => {
      const appointmentForest = [{
        reduceValue: 3,
        items: [
          {
            data: {
              start: moment('2020-05-07 10:00'),
              end: moment('2020-05-07 13:30'),
              offset: 0,
            },
            children: [1],
          },
          {
            data: {
              start: moment('2020-05-07 10:30'),
              end: moment('2020-05-07 13:30'),
              offset: 1,
            },
            children: [2],
            parent: 0,
          },
          {
            data: {
              start: moment('2020-05-07 11:00'),
              end: moment('2020-05-07 13:30'),
              offset: 2,
            },
            children: [3],
            parent: 1,
          },
          {
            data: {
              start: moment('2020-05-07 13:00'),
              end: moment('2020-05-07 15:30'),
              offset: 3,
            },
            children: [],
            parent: 2,
          },
          // Should be an overlapping subtree root because it overlaps the appointment with index 3
          // and its offset is less than the other one's
          {
            data: {
              start: moment('2020-05-07 14:00'),
              end: moment('2020-05-07 15:30'),
              offset: 0,
            },
            children: [5, 7],
          },
          {
            data: {
              start: moment('2020-05-07 14:30'),
              end: moment('2020-05-07 15:00'),
              offset: 1,
            },
            children: [6],
            parent: 4,
          },
          // Cannot be an overlapping subtree root because it will be a part of the block
          // wich root - the appointment with index 4
          {
            data: {
              start: moment('2020-05-07 14:45'),
              end: moment('2020-05-07 15:15'),
              offset: 2,
            },
            children: [],
            parent: 5,
          },
          // Overlapping subtree root for the previous appointment because overlaps with it
          // and its offset is less than the previous one
          {
            data: {
              start: moment('2020-05-07 15:00'),
              end: moment('2020-05-07 15:30'),
              offset: 1,
            },
            children: [],
            parent: 4,
          },
        ],
      }];

      const expectedItems = [{
        ...appointmentForest[0].items[0],
        overlappingSubTreeRoots: [],
      }, {
        ...appointmentForest[0].items[1],
        overlappingSubTreeRoots: [],
      }, {
        ...appointmentForest[0].items[2],
        overlappingSubTreeRoots: [],
      }, {
        ...appointmentForest[0].items[3],
        overlappingSubTreeRoots: [4],
      }, {
        ...appointmentForest[0].items[4],
        overlappingSubTreeRoots: [],
        overlappingSubTreeRoot: true,
        maxOffset: 3,
      }, {
        ...appointmentForest[0].items[5],
        overlappingSubTreeRoots: [],
        maxOffset: 3,
      }, {
        ...appointmentForest[0].items[6],
        overlappingSubTreeRoots: [7],
        maxOffset: 3,
      }, {
        ...appointmentForest[0].items[7],
        overlappingSubTreeRoots: [],
        overlappingSubTreeRoot: true,
        maxOffset: 3,
      }];

      expect(prepareToGroupIntoBlocks(appointmentForest))
        .toEqual([{
          ...appointmentForest[0],
          items: expectedItems,
        }]);
    });
  });

  describe('#groupAppointmentsIntoBlocks', () => {
    it('should create one block for simple cases that will contain all of the appointments', () => {
      const appointmentForests = [{
        reduceValue: 2,
        items: [{
          data: {
            start: moment('2020-05-07 08:00'),
            end: moment('2020-05-07 08:30'),
            offset: 0,
          },
          children: [1],
          overlappingSubTreeRoots: [],
        }, {
          data: {
            start: moment('2020-05-07 08:00'),
            end: moment('2020-05-07 08:30'),
            offset: 1,
          },
          children: [],
          parent: 0,
          overlappingSubTreeRoots: [],
        }],
      }];

      const expectedAppointmentFoerst = {
        ...appointmentForests[0],
        items: [{
          ...appointmentForests[0].items[0],
          blockIndex: 0,
        }, {
          ...appointmentForests[0].items[1],
          blockIndex: 0,
        }],
      };
      const expectedBlocks = [{
        start: moment('2020-05-07 08:00'),
        end: moment('2020-05-07 08:30'),
        endForChildren: moment('2020-05-07 08:30'),
        minOffset: 0,
        maxOffset: 1,
        size: 2,
        items: [0, 1],
      }];

      expect(groupAppointmentsIntoBlocks(appointmentForests))
        .toEqual([{
          appointmentForest: expectedAppointmentFoerst,
          blocks: expectedBlocks,
        }]);
    });

    it('should create three blocks - one external and two overlapping', () => {
      const appointmentForests = [{
        reduceValue: 2,
        items: [{
          data: {
            start: moment('2020-05-07 08:00'),
            end: moment('2020-05-07 09:00'),
            offset: 0,
          },
          children: [1],
          overlappingSubTreeRoots: [],
          treeDepth: 1,
        }, {
          data: {
            start: moment('2020-05-07 08:30'),
            end: moment('2020-05-07 09:30'),
            offset: 1,
          },
          children: [],
          parent: 0,
          overlappingSubTreeRoots: [2],
          treeDepth: 0,
        }, {
          data: {
            start: moment('2020-05-07 09:00'),
            end: moment('2020-05-07 10:00'),
            offset: 0,
          },
          children: [],
          overlappingSubTreeRoots: [],
          overlappingSubTreeRoot: true,
          treeDepth: 0,
        }],
      }];

      const expectedAppointmentFoerst = {
        ...appointmentForests[0],
        items: [{
          ...appointmentForests[0].items[0],
          blockIndex: 0,
        }, {
          ...appointmentForests[0].items[1],
          blockIndex: 0,
        }, {
          ...appointmentForests[0].items[2],
          blockIndex: 1,
        }],
      };
      const expectedBlocks = [{
        start: moment('2020-05-07 08:00'),
        end: moment('2020-05-07 09:00'),
        endForChildren: moment('2020-05-07 09:00'),
        minOffset: 0,
        maxOffset: 1,
        size: 2,
        items: [0, 1],
      }, {
        start: moment('2020-05-07 09:00'),
        end: moment('2020-05-07 09:30'),
        endForChildren: moment('2020-05-07 10:00'),
        minOffset: 0,
        maxOffset: 0,
        size: 1,
        items: [2],
      }];

      expect(groupAppointmentsIntoBlocks(appointmentForests))
        .toEqual([{
          appointmentForest: expectedAppointmentFoerst,
          blocks: expectedBlocks,
        }]);
    });

    it('should work ocrrectly if block root has children', () => {
      const appointmentForests = [{
        reduceValue: 3,
        items: [{
          data: {
            start: moment('2020-05-07 08:00'),
            end: moment('2020-05-07 09:00'),
            offset: 0,
          },
          children: [1],
          overlappingSubTreeRoots: [],
          treeDepth: 2,
        }, {
          data: {
            start: moment('2020-05-07 08:30'),
            end: moment('2020-05-07 09:30'),
            offset: 1,
          },
          children: [],
          parent: 0,
          overlappingSubTreeRoots: [3],
          treeDepth: 1,
        }, {
          data: {
            start: moment('2020-05-07 08:45'),
            end: moment('2020-05-07 12:30'),
            offset: 2,
          },
          children: [],
          parent: 0,
          overlappingSubTreeRoots: [],
          treeDepth: 0,
        }, {
          data: {
            start: moment('2020-05-07 09:00'),
            end: moment('2020-05-07 10:00'),
            offset: 0,
          },
          children: [],
          overlappingSubTreeRoots: [],
          overlappingSubTreeRoot: true,
          treeDepth: 0,
        }],
      }];

      const expectedAppointmentFoerst = {
        ...appointmentForests[0],
        items: [{
          ...appointmentForests[0].items[0],
          blockIndex: 0,
        }, {
          ...appointmentForests[0].items[1],
          blockIndex: 0,
        }, {
          ...appointmentForests[0].items[2],
          blockIndex: 0,
        }, {
          ...appointmentForests[0].items[3],
          blockIndex: 1,
        }],
      };
      const expectedBlocks = [{
        start: moment('2020-05-07 08:00'),
        end: moment('2020-05-07 09:00'),
        endForChildren: moment('2020-05-07 09:00'),
        minOffset: 0,
        maxOffset: 2,
        size: 3,
        items: [0, 1, 2],
      }, {
        start: moment('2020-05-07 09:00'),
        end: moment('2020-05-07 09:30'),
        endForChildren: moment('2020-05-07 10:00'),
        minOffset: 0,
        maxOffset: 0,
        size: 1,
        items: [3],
      }];

      expect(groupAppointmentsIntoBlocks(appointmentForests))
        .toEqual([{
          appointmentForest: expectedAppointmentFoerst,
          blocks: expectedBlocks,
        }]);
    });

    it('should work when several blocks are inside another block', () => {
      const appointmentForests = [{
        reduceValue: 4,
        items: [{
          data: {
            start: moment('2020-05-07 08:00'),
            end: moment('2020-05-07 09:00'),
            offset: 0,
          },
          children: [1],
          overlappingSubTreeRoots: [],
          treeDepth: 3,
        }, {
          data: {
            start: moment('2020-05-07 08:30'),
            end: moment('2020-05-07 09:00'),
            offset: 1,
          },
          children: [2],
          parent: 0,
          overlappingSubTreeRoots: [],
          treeDepth: 2,
        }, {
          data: {
            start: moment('2020-05-07 08:30'),
            end: moment('2020-05-07 09:00'),
            offset: 1,
          },
          children: [3],
          parent: 2,
          overlappingSubTreeRoots: [],
          treeDepth: 1,
        }, {
          data: {
            start: moment('2020-05-07 09:00'),
            end: moment('2020-05-07 12:00'),
            offset: 3,
          },
          children: [],
          parent: 2,
          overlappingSubTreeRoots: [4],
          treeDepth: 0,
        }, {
          data: {
            start: moment('2020-05-07 09:00'),
            end: moment('2020-05-07 12:00'),
            offset: 0,
          },
          children: [5, 7],
          overlappingSubTreeRoots: [],
          overlappingSubTreeRoot: true,
          treeDepth: 2,
        }, {
          data: {
            start: moment('2020-05-07 10:00'),
            end: moment('2020-05-07 10:30'),
            offset: 1,
          },
          parent: 4,
          children: [6],
          overlappingSubTreeRoots: [],
          treeDepth: 1,
        }, {
          data: {
            start: moment('2020-05-07 10:15'),
            end: moment('2020-05-07 10:45'),
            offset: 2,
          },
          parent: 5,
          children: [],
          overlappingSubTreeRoots: [7],
          treeDepth: 0,
        }, {
          data: {
            start: moment('2020-05-07 10:30'),
            end: moment('2020-05-07 11:00'),
            offset: 1,
          },
          children: [],
          overlappingSubTreeRoots: [],
          overlappingSubTreeRoot: true,
          treeDepth: 0,
        }],
      }];

      const expectedAppointmentFoerst = {
        ...appointmentForests[0],
        items: [{
          ...appointmentForests[0].items[0],
          blockIndex: 0,
        }, {
          ...appointmentForests[0].items[1],
          blockIndex: 0,
        }, {
          ...appointmentForests[0].items[2],
          blockIndex: 0,
        }, {
          ...appointmentForests[0].items[3],
          blockIndex: 1,
        }, {
          ...appointmentForests[0].items[4],
          blockIndex: 2,
        }, {
          ...appointmentForests[0].items[5],
          blockIndex: 2,
        }, {
          ...appointmentForests[0].items[6],
          blockIndex: 2,
        }, {
          ...appointmentForests[0].items[7],
          blockIndex: 3,
        }],
      };
      const expectedBlocks = [{
        start: moment('2020-05-07 08:00'),
        end: moment('2020-05-07 09:00'),
        endForChildren: moment('2020-05-07 09:00'),
        minOffset: 0,
        maxOffset: 3,
        size: 4,
        items: [0, 1, 2],
      }, {
        start: moment('2020-05-07 09:00'),
        end: moment('2020-05-07 12:00'),
        endForChildren: moment('2020-05-07 12:00'),
        minOffset: 3,
        maxOffset: 3,
        size: 1,
        items: [3],
      }, {
        start: moment('2020-05-07 09:00'),
        end: moment('2020-05-07 12:00'),
        endForChildren: moment('2020-05-07 12:00'),
        minOffset: 0,
        maxOffset: 2,
        size: 3,
        items: [4, 5, 6],
      }, {
        start: moment('2020-05-07 10:30'),
        end: moment('2020-05-07 10:45'),
        endForChildren: moment('2020-05-07 11:00'),
        minOffset: 1,
        maxOffset: 1,
        size: 1,
        items: [7],
      }];

      expect(groupAppointmentsIntoBlocks(appointmentForests))
        .toEqual([{
          appointmentForest: expectedAppointmentFoerst,
          blocks: expectedBlocks,
        }]);
    });
  });

  describe('#findBlockIndexByAppointment', () => {
    it('should work', () => {
      const blocks = [{
        start: moment('2020-05-07 08:00'),
        end: moment('2020-05-07 09:00'),
        minOffset: 0,
        maxOffset: 5,
        items: [],
      }, {
        start: moment('2020-05-07 09:00'),
        end: moment('2020-05-07 12:00'),
        minOffset: 4,
        maxOffset: 5,
        items: [],
      }, {
        start: moment('2020-05-07 10:00'),
        end: moment('2020-05-07 12:00'),
        minOffset: 1,
        maxOffset: 4,
        items: [],
      }, {
        start: moment('2020-05-07 17:00'),
        end: moment('2020-05-07 18:00'),
        minOffset: 1,
        maxOffset: 4,
        items: [1],
      }];
      const appointments = [{
        data: { offset: 0, start: moment('2020-05-07 08:00') },
      }, {
        data: { offset: 4, start: moment('2020-05-07 09:00') },
      }, {
        data: { offset: 5, start: moment('2020-05-07 10:00') },
      }, {
        data: { offset: 2, start: moment('2020-05-07 11:00') },
      }, {
        data: { offset: 3, start: moment('2020-05-07 13:00') },
      }, {
        data: { offset: 3, start: moment('2020-05-07 11:00') },
        overlappingSubTreeRoot: true,
      }, {
        data: { offset: 2, start: moment('2020-05-07 17:00') },
        overlappingSubTreeRoot: true,
      }];

      expect(findBlockIndexByAppointment(blocks, appointments[0]))
        .toBe(0);
      expect(findBlockIndexByAppointment(blocks, appointments[1]))
        .toBe(1);
      expect(findBlockIndexByAppointment(blocks, appointments[2]))
        .toBe(1);
      expect(findBlockIndexByAppointment(blocks, appointments[3]))
        .toBe(2);
      expect(findBlockIndexByAppointment(blocks, appointments[4]))
        .toBe(-1);
      expect(findBlockIndexByAppointment(blocks, appointments[5]))
        .toBe(2);
      expect(findBlockIndexByAppointment(blocks, appointments[6]))
        .toBe(-1);
    });
  });

  describe('#findIncludedBlocks', () => {
    const blocksBase = [{
      start: moment('2020-05-07 08:00'),
      end: moment('2020-05-07 09:00'),
      minOffset: 0,
      maxOffset: 5,
    }, {
      start: moment('2020-05-07 09:00'),
      end: moment('2020-05-07 10:00'),
      minOffset: 4,
      maxOffset: 5,
    }, {
      start: moment('2020-05-07 09:30'),
      end: moment('2020-05-07 12:00'),
      minOffset: 1,
      maxOffset: 4,
    }];

    it('should not find included blocks in a simple case', () => {
      const data = [{
        blocks: blocksBase,
      }];

      const expectedBlocks = [{
        ...blocksBase[0],
        includedBlocks: [],
      }, {
        ...blocksBase[1],
        includedBlocks: [],
      }, {
        ...blocksBase[2],
        includedBlocks: [],
      }];

      expect(findIncludedBlocks(data))
        .toEqual([{
          blocks: expectedBlocks,
        }]);
    });

    it('should find included blocks when one block is inside another', () => {
      const blocks = [
        ...blocksBase,
        {
          start: moment('2020-05-07 10:00'),
          end: moment('2020-05-07 11:30'),
          minOffset: 4,
          maxOffset: 4,
        },
        {
          start: moment('2020-05-07 10:30'),
          end: moment('2020-05-07 11:30'),
          minOffset: 1,
          maxOffset: 3,
        },
      ];
      const data = [{
        blocks,
      }];

      const expectedBlocks = [{
        ...blocks[0],
        includedBlocks: [],
      }, {
        ...blocks[1],
        includedBlocks: [],
      }, {
        ...blocks[2],
        includedBlocks: [3, 4],
      }, {
        ...blocks[3],
        includedBlocks: [],
        includedInto: 2,
      }, {
        ...blocks[4],
        includedBlocks: [],
        includedInto: 2,
      }];

      expect(findIncludedBlocks(data))
        .toEqual([{
          blocks: expectedBlocks,
        }]);
    });
  });

  describe('#findChildBlocks', () => {
    const blocksBase = [{
      start: moment('2020-05-07 08:00'),
      end: moment('2020-05-07 09:00'),
      minOffset: 0,
      maxOffset: 5,
      includedBlocks: [],
    }, {
      start: moment('2020-05-07 09:00'),
      end: moment('2020-05-07 10:00'),
      endForChildren: moment('2020-05-07 10:00'),
      minOffset: 4,
      maxOffset: 5,
      includedBlocks: [],
    }, {
      start: moment('2020-05-07 09:30'),
      end: moment('2020-05-07 12:00'),
      endForChildren: moment('2020-05-07 12:00'),
      minOffset: 1,
      maxOffset: 3,
      includedBlocks: [3, 4],
    }, {
      start: moment('2020-05-07 10:00'),
      end: moment('2020-05-07 11:30'),
      endForChildren: moment('2020-05-07 11:30'),
      minOffset: 3,
      maxOffset: 3,
      ncludedBlocks: [],
      includedInto: 2,
    }, {
      start: moment('2020-05-07 10:30'),
      end: moment('2020-05-07 11:30'),
      endForChildren: moment('2020-05-07 11:30'),
      minOffset: 1,
      maxOffset: 2,
      ncludedBlocks: [],
      includedInto: 2,
    }];

    it('should not find children in the simples case', () => {
      const data = [{
        blocks: [blocksBase[0]],
      }];

      const expectedBlocks = [{
        ...blocksBase[0],
        children: [],
      }];

      expect(findChildBlocks(data))
        .toEqual([{
          blocks: expectedBlocks,
        }]);
    });

    it('should find one child without included blocks', () => {
      const data = [{
        blocks: [
          blocksBase[0],
          blocksBase[1],
          {
            ...blocksBase[2],
            includedBlocks: [],
          },
        ],
      }];

      const expectedBlocks = [{
        ...blocksBase[0],
        children: [],
      }, {
        ...blocksBase[1],
        children: [2],
      }, {
        ...blocksBase[2],
        includedBlocks: [],
        parent: 1,
        children: [],
      }];

      expect(findChildBlocks(data))
        .toEqual([{
          blocks: expectedBlocks,
        }]);
    });

    it('should work with included', () => {
      const data = [{
        blocks: blocksBase,
      }];

      const expectedBlocks = [{
        ...blocksBase[0],
        children: [],
      }, {
        ...blocksBase[1],
        children: [2],
      }, {
        ...blocksBase[2],
        parent: 1,
        children: [],
      }, {
        ...blocksBase[3],
        children: [4],
      }, {
        ...blocksBase[4],
        parent: 3,
        children: [],
      }];

      expect(findChildBlocks(data))
        .toEqual([{
          blocks: expectedBlocks,
        }]);
    });
  });

  describe('#calculateIncludedBlockMaxRight', () => {
    it('should work', () => {
      const blocks = [{
        right: 0.5,
      }, {
        right: 0.5,
        includedInto: 0,
      }, {
        includedInto: 1,
        right: 0.5,
      }];

      expect(calculateIncludedBlockMaxRight(blocks, blocks[2]))
        .toBe(0.25);
    });
  });

  describe('#calculateBlocksTotalSize', () => {
    it('should work', () => {
      const blocks = [{
        size: 3,
        children: [1, 2],
      }, {
        size: 3,
        children: [],
      }, {
        size: 2,
        children: [3],
      }, {
        size: 2,
        children: [],
      }];

      expect(calculateBlocksTotalSize(blocks))
        .toEqual([{
          ...blocks[0],
          totalSize: 7,
          leftOffset: 4,
        }, {
          ...blocks[1],
          totalSize: 3,
          leftOffset: 0,
        }, {
          ...blocks[2],
          totalSize: 4,
          leftOffset: 2,
        }, {
          ...blocks[3],
          totalSize: 2,
          leftOffset: 0,
        }]);
    });
  });

  describe('#calculateBlocksLeftLimit', () => {
    const appointments = [
      { data: { left: 0.6 } },
      { data: { left: 0.2 } },
      { data: { left: 0.3 } },
      { data: { left: 0.1 } },
    ];

    it('should work', () => {
      const blocks = [{
        size: 3,
        children: [1, 2],
        totalSize: 7,
        items: [0],
      }, {
        size: 3,
        children: [],
        totalSize: 3,
        items: [1],
      }, {
        size: 2,
        children: [3],
        totalSize: 4,
        items: [2],
      }, {
        size: 2,
        children: [],
        totalSize: 2,
        items: [3],
      }];

      expect(calculateBlocksLeftLimit(blocks, appointments))
        .toEqual([{
          ...blocks[0],
          leftLimit: 0.1,
        }, {
          ...blocks[1],
          leftLimit: 0.2,
        }, {
          ...blocks[2],
          leftLimit: 0.1,
        }, {
          ...blocks[3],
          leftLimit: 0.1,
        }]);
    });

    it('should work when block lefts are defined', () => {
      const blocks = [{
        size: 3,
        children: [1, 2],
        totalSize: 7,
        items: [0],
        left: 0.5,
      }, {
        size: 3,
        children: [],
        totalSize: 3,
        items: [1],
        left: 0.05,
      }, {
        size: 2,
        children: [3],
        totalSize: 4,
        items: [2],
        left: 0.25,
      }, {
        size: 2,
        children: [],
        totalSize: 2,
        items: [3],
        left: 0,
      }];

      expect(calculateBlocksLeftLimit(blocks, appointments))
        .toEqual([{
          ...blocks[0],
          leftLimit: 0,
        }, {
          ...blocks[1],
          leftLimit: 0.05,
        }, {
          ...blocks[2],
          leftLimit: 0,
        }, {
          ...blocks[3],
          leftLimit: 0,
        }]);
    });
  });

  describe('#updateBlocksProportions', () => {
    it('should work', () => {
      const blocks = [{
        size: 3,
        children: [1, 2],
        totalSize: 7,
        leftOffset: 4,
        leftLimit: 0,
      }, {
        size: 3,
        children: [],
        totalSize: 3,
        leftOffset: 0,
        leftLimit: 0.1,
        parent: 0,
      }, {
        size: 2,
        children: [3],
        totalSize: 4,
        leftOffset: 2,
        leftLimit: 0,
        parent: 0,
      }, {
        size: 2,
        children: [],
        totalSize: 2,
        leftOffset: 0,
        leftLimit: 0,
        parent: 2,
      }];

      expect(updateBlocksProportions(blocks))
        .toEqual([{
          ...blocks[0],
          left: matchFloat(4 / 7),
          right: 1,
          totalSize: 7,
        }, {
          ...blocks[1],
          left: matchFloat(0.1),
          right: matchFloat(4 / 7),
          totalSize: 7,
        }, {
          ...blocks[2],
          left: matchFloat(2 / 7),
          right: matchFloat(4 / 7),
          totalSize: 7,
        }, {
          ...blocks[3],
          left: 0,
          right: matchFloat(2 / 7),
          totalSize: 7,
        }]);
    });
  });

  describe('#updateBlocksLeft', () => {
    it('should work', () => {
      const blocks = [{
        children: [],
        items: [0],
        left: 0,
      }, {
        children: [2],
        items: [1],
        left: 0.2,
      }, {
        children: [],
        items: [2],
        left: 0,
        parent: 1,
      }, {
        children: [],
        items: [3],
        left: 0.5,
      }];
      const appointments = [
        { blockIndex: 0 },
        { blockIndex: 1 },
        { blockIndex: 2 },
        { blockIndex: 3, parent: 2 },
      ];

      expect(updateBlocksLeft(blocks, appointments))
        .toEqual([{
          ...blocks[0],
        }, {
          ...blocks[1],
        }, {
          ...blocks[2],
        }, {
          ...blocks[3],
          left: 0.2,
        }]);
    });
  });

  describe('#adjustByBlocks', () => {
    it('should work in case with one block', () => {
      const groupedIntoBlocks = [{
        blocks: [{
          children: [],
          items: [0, 1],
          size: 2,
        }],
        appointmentForest: {
          items: [{
            data: { left: 0, width: 0.5 },
            hasDirectChild: true,
            isDirectChild: false,
            children: [1],
          }, {
            data: { left: 0.5, width: 0.5 },
            hasDirectChild: false,
            isDirectChild: true,
            children: [],
            parent: 0,
          }],
        },
      }];

      expect(adjustByBlocks(groupedIntoBlocks, INDIRECT_CHILD_LEFT_OFFSET))
        .toEqual([groupedIntoBlocks[0].appointmentForest]);
    });

    it('should work with several blocks', () => {
      const groupedIntoBlocks = [{
        blocks: [{
          children: [],
          items: [0, 1],
          size: 3,
          included: [],
        }, {
          children: [2],
          items: [2],
          size: 1,
          included: [],
        }, {
          children: [3],
          items: [3],
          size: 1,
          included: [],
          parent: 1,
        }, {
          children: [],
          items: [4],
          size: 1,
          included: [],
          parent: 2,
        }],
        appointmentForest: {
          items: [{
            data: { left: 0, width: 1 },
            hasDirectChild: false,
            isDirectChild: false,
            children: [1],
            blockIndex: 0,
            treeDepth: 2,
          }, {
            data: { left: 0.05, width: 0.95 },
            hasDirectChild: false,
            isDirectChild: false,
            children: [2],
            parent: 0,
            blockIndex: 0,
            treeDepth: 1,
          }, {
            data: { left: 0.1, width: 0.9 },
            hasDirectChild: false,
            isDirectChild: false,
            children: [],
            parent: 1,
            blockIndex: 1,
            treeDepth: 0,
          }, {
            data: { left: 0.05, width: 0.95 },
            hasDirectChild: false,
            isDirectChild: false,
            children: [],
            parent: 0,
            blockIndex: 2,
            treeDepth: 0,
          }, {
            data: { left: 0, width: 1 },
            hasDirectChild: false,
            isDirectChild: false,
            children: [],
            blockIndex: 3,
            treeDepth: 0,
          }],
        },
      }];

      expect(adjustByBlocks(groupedIntoBlocks, INDIRECT_CHILD_LEFT_OFFSET))
        .toEqual([{
          items: [{
            ...groupedIntoBlocks[0].appointmentForest.items[0],
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[1],
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[2],
            data: { left: matchFloat(2 / 3), width: matchFloat(1 / 3) },
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[3],
            data: { left: matchFloat(1 / 3), width: matchFloat(1 / 3) },
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[4],
            data: { left: 0, width: matchFloat(1 / 3) },
          }],
        }]);
    });

    it('should work with included blocks', () => {
      const groupedIntoBlocks = [{
        blocks: [{
          children: [],
          items: [0, 1, 2],
          size: 4,
          included: [],
        }, {
          children: [2],
          items: [3],
          size: 1,
          included: [],
        }, {
          children: [],
          items: [4, 5],
          size: 3,
          included: [3, 4],
          parent: 1,
        }, {
          children: [4],
          items: [6],
          size: 1,
          included: [],
          includedInto: 2,
        }, {
          children: [],
          items: [7],
          size: 1,
          included: [],
          parent: 3,
          includedInto: 2,
        }],
        appointmentForest: {
          items: [{
            data: { left: 0, width: 1 },
            hasDirectChild: false,
            isDirectChild: false,
            children: [1],
            blockIndex: 0,
            treeDepth: 3,
          }, {
            data: { left: 0.05, width: 0.95 },
            hasDirectChild: false,
            isDirectChild: false,
            children: [2],
            parent: 0,
            blockIndex: 0,
            treeDepth: 2,
          }, {
            data: { left: 0.1, width: 0.9 },
            hasDirectChild: false,
            isDirectChild: false,
            children: [3],
            parent: 1,
            blockIndex: 0,
            treeDepth: 1,
          }, {
            data: { left: 0.15, width: 0.85 },
            hasDirectChild: false,
            isDirectChild: false,
            children: [],
            parent: 2,
            blockIndex: 1,
            treeDepth: 0,
          }, {
            data: { left: 0, width: 1 },
            hasDirectChild: false,
            isDirectChild: false,
            children: [5, 7],
            blockIndex: 2,
            treeDepth: 2,
          }, {
            data: { left: 0.05, width: 0.475 },
            hasDirectChild: true,
            isDirectChild: false,
            children: [6],
            blockIndex: 2,
            treeDepth: 1,
            parent: 4,
          }, {
            data: { left: 0.525, width: 0.475 },
            hasDirectChild: false,
            isDirectChild: true,
            children: [],
            blockIndex: 3,
            treeDepth: 0,
            parent: 5,
          }, {
            data: { left: 0.05, width: 0.95 },
            hasDirectChild: false,
            isDirectChild: false,
            children: [],
            blockIndex: 4,
            treeDepth: 0,
            parent: 4,
          }],
        },
      }];

      expect(adjustByBlocks(groupedIntoBlocks, INDIRECT_CHILD_LEFT_OFFSET))
        .toEqual([{
          items: [{
            ...groupedIntoBlocks[0].appointmentForest.items[0],
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[1],
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[2],
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[3],
            data: { left: matchFloat(0.75), width: matchFloat(0.25) },
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[4],
            data: { left: 0, width: matchFloat(0.75) },
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[5],
            data: { left: matchFloat(0.05), width: matchFloat(0.35) },
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[6],
            data: { left: matchFloat(0.4), width: matchFloat(0.35) },
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[7],
            data: { left: matchFloat(0.05), width: matchFloat(0.35) },
          }],
        }]);
    });

    it('should distribute blocks correctly', () => {
      const groupedIntoBlocks = [{
        blocks: [{
          children: [],
          items: [0, 1, 2],
          size: 3,
          included: [],
        }, {
          children: [2],
          items: [3],
          size: 1,
          included: [],
        }, {
          children: [],
          items: [4],
          size: 1,
          included: [],
          parent: 1,
        }],
        appointmentForest: {
          items: [{
            data: { left: 0, width: 0.25 },
            hasDirectChild: true,
            isDirectChild: false,
            children: [1],
            blockIndex: 0,
            treeDepth: 3,
          }, {
            data: { left: 0.25, width: 0.25 },
            hasDirectChild: true,
            isDirectChild: true,
            children: [2],
            parent: 0,
            blockIndex: 0,
            treeDepth: 2,
          }, {
            data: { left: 0.5, width: 0.25 },
            hasDirectChild: true,
            isDirectChild: true,
            children: [3],
            parent: 1,
            blockIndex: 1,
            treeDepth: 1,
          }, {
            data: { left: 0.75, width: 0.25 },
            hasDirectChild: false,
            isDirectChild: true,
            children: [],
            parent: 2,
            blockIndex: 2,
            treeDepth: 0,
          }, {
            data: { left: 0, width: 1 },
            hasDirectChild: false,
            isDirectChild: false,
            children: [],
            blockIndex: 3,
            treeDepth: 0,
          }],
        },
      }];

      expect(adjustByBlocks(groupedIntoBlocks, INDIRECT_CHILD_LEFT_OFFSET))
        .toEqual([{
          items: [{
            ...groupedIntoBlocks[0].appointmentForest.items[0],
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[1],
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[2],
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[3],
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[4],
            data: { left: 0, width: matchFloat(0.75) },
          }],
        }]);
    });

    it('should update items in the first block (with index 0)', () => {
      const groupedIntoBlocks = [{
        blocks: [{
          children: [],
          items: [0, 4],
          size: 3,
          included: [],
        }, {
          children: [2],
          items: [1, 2],
          size: 2,
          included: [],
        }, {
          children: [],
          items: [3],
          size: 1,
          included: [],
          parent: 1,
        }],
        appointmentForest: {
          items: [{
            data: { left: 0, width: 1 / 3 },
            hasDirectChild: true,
            isDirectChild: false,
            children: [1],
            blockIndex: 0,
            treeDepth: 2,
          }, {
            data: { left: 1 / 3, width: 1 / 3 },
            hasDirectChild: true,
            isDirectChild: true,
            children: [2],
            parent: 0,
            blockIndex: 1,
            treeDepth: 1,
          }, {
            data: { left: 2 / 3, width: 1 / 3 },
            hasDirectChild: false,
            isDirectChild: true,
            children: [],
            parent: 1,
            blockIndex: 1,
            treeDepth: 0,
          }, {
            data: { left: 0, width: 0.5 },
            hasDirectChild: true,
            isDirectChild: false,
            children: [4],
            blockIndex: 2,
            treeDepth: 1,
          }, {
            data: { left: 0.5, width: 0.5 },
            hasDirectChild: false,
            isDirectChild: true,
            children: [],
            blockIndex: 0,
            treeDepth: 0,
            parent: 3,
          }],
        },
      }];

      expect(adjustByBlocks(groupedIntoBlocks, INDIRECT_CHILD_LEFT_OFFSET))
        .toEqual([{
          items: [{
            ...groupedIntoBlocks[0].appointmentForest.items[0],
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[1],
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[2],
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[3],
            data: { left: 0, width: matchFloat(1 / 3) },
          }, {
            ...groupedIntoBlocks[0].appointmentForest.items[4],
            data: { left: matchFloat(1 / 3), width: matchFloat(2 / 3) },
          }],
        }]);
    });
  });

});
