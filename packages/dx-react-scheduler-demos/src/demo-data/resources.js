import {
  red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal,
  green, lightGreen, lime, yellow, amber, orange, deepOrange,
} from '@material-ui/core/colors';

export const appointments = [
  {
    title: 'Watercolor Landscape',
    roomId: [1],
    startDate: new Date(2017, 4, 1, 9, 30),
    endDate: new Date(2017, 4, 1, 11),
    rRule: 'FREQ=WEEKLY;BYDAY=TU,FR;COUNT=10',
  }, {
    title: 'Oil Painting for Beginners',
    roomId: [2],
    startDate: new Date(2017, 4, 1, 9, 30),
    endDate: new Date(2017, 4, 1, 11),
    rRule: 'FREQ=WEEKLY;BYDAY=MO,TH;COUNT=10',
  }, {
    title: 'Testing',
    roomId: [3],
    startDate: new Date(2017, 4, 1, 12, 0),
    endDate: new Date(2017, 4, 1, 13, 0),
    rRule: 'FREQ=WEEKLY;BYDAY=MO;WKST=TU;INTERVAL=2;COUNT=2',
  }, {
    title: 'Meeting of Instructors',
    roomId: [4],
    startDate: new Date(2017, 4, 1, 9, 0),
    endDate: new Date(2017, 4, 1, 9, 15),
    rRule: 'FREQ=DAILY;BYDAY=WE;UNTIL=20170601',
  }, {
    title: 'Recruiting students',
    roomId: [5],
    startDate: new Date(2017, 4, 26, 10, 0),
    endDate: new Date(2017, 4, 26, 11, 0),
    rRule: 'FREQ=YEARLY;BYWEEKNO=23',
    recurrenceException: '20170611T100000',
  }, {
    title: 'Final exams',
    roomId: [3],
    startDate: new Date(2017, 4, 26, 12, 0),
    endDate: new Date(2017, 4, 26, 13, 35),
    rRule: 'FREQ=YEARLY;BYWEEKNO=24;BYDAY=TH,FR',
  }, {
    title: 'Monthly Planning',
    roomId: [4],
    startDate: new Date(2017, 4, 26, 14, 30),
    endDate: new Date(2017, 4, 26, 15, 45),
    rRule: 'FREQ=MONTHLY;BYMONTHDAY=27;COUNT=1',
  }, {
    title: 'Open Day',
    roomId: [5],
    startDate: new Date(2017, 4, 1, 9, 30),
    endDate: new Date(2017, 4, 1, 13),
    rRule: 'FREQ=YEARLY;BYYEARDAY=148',
  },
];

export const resourcesData = [
  {
    title: 'Room 101',
    id: 1,
    color: amber,
  }, {
    title: 'Room 102',
    id: 2,
    color: pink,
  }, {
    title: 'Room 103',
    id: 3,
    color: purple,
  }, {
    title: 'Meeting room',
    id: 4,
    color: deepOrange,
  }, {
    title: 'Conference hall',
    id: 5,
    color: teal,
  },
];
