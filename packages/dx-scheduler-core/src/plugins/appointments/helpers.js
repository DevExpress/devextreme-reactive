import moment from 'moment';

/*
appointments => stretch => [{ ...appointment, leftOffset, stretchValue }, ...]

appointment = { start, end, dataItem };

appointments = [
  {
    x: 1,
    y:
    width:
    height.
  }
]
+
appointments = [
  {
    dataItem
    offset,
    reduceValue
  }
];

= [
  {
    x: 1,
    y:
    width:
    height,
    dataItem
  }
].map(<Appointment />)

*/

const sortAppointments = appointments =>
  appointments.slice().sort((a, b) => {
    if (a.start.isBefore(b.start)) return -1;
    if (a.start.isAfter(b.start)) return 1;
    if (a.start.isSame(b.start)) {
      if (a.end.isBefore(b.end)) return 1;
      if (a.end.isAfter(b.end)) return -1;
    }
    return 0;
  });

const link = 'http://jsfiddle.net/MaximKudryavtsev/aLou7q52/268/';

/* !!!!!!! */
const makeGroups = (arr) => {
  const groups = [];
  let totalIndex = 0;

  while (totalIndex < arr.length) {
    groups.push([]);
    const current = arr[totalIndex];
    const currentGroup = groups[groups.length - 1];
    let next = arr[totalIndex + 1];
    let maxBoundary = current[1];

    currentGroup.push(current);
    totalIndex += 1;
    while (next && maxBoundary > next[0]) {
      currentGroup.push(next);
      if (maxBoundary < next[1]) maxBoundary = next[1];
      totalIndex += 1;
      next = arr[totalIndex];
    }
  }
  return groups;
};

const setOffset = groups => groups.map((group) => {
  let offset = 0;
  let reduceValue = 1;
  const groupLength = group.length;
  for (let startIndex = 0; startIndex < groupLength; startIndex += 1) {
    const appointment = group[startIndex];
    if (appointment[3] !== undefined) continue;

    let maxBoundary = appointment[1];
    appointment[3] = offset;
    for (let index = startIndex + 1; index < groupLength; index += 1) {
      if (group[index][3] === undefined) {
        if (maxBoundary <= group[index][0]) {
          maxBoundary = group[index][1];
          group[index][3] = offset;
        }
      }
    }

    offset += 1;
    if (reduceValue < offset) reduceValue = offset;
  }
  return { items: group, reduceValue };
});

export const appointmentWithOffset = (appointments) => {
  const sortedAppointments = sortAppointments(appointments.map(({ start, end, dataItem }) =>
    ({ start: moment(start), end: moment(end), dataItem })));
  const appointmentsWithIntersections = overlappedAppointments(sortedAppointments);
  const groupedAppointments = groupAppointments(appointmentsWithIntersections);

  const appointmentsWithOffset = setOffset(groupedAppointments);
  debugger
  return appointmentsWithOffset.reduce((acc, group) => {
    const items = group.map(({ start, end, ...restFields }) => ({
      start: start.creationData().input,
      end: end.creationData().input,
      ...restFields,
    }));
    acc.push(...items);
    return acc;
  }, []);
};
