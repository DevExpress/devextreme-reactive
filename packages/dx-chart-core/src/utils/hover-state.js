
const selectTarget = targets => (targets.length > 0 ? targets[targets.length - 1] : null);

// Comparing by reference is not an option as Tracker always sends new objects.
// On the other side Tracker cannot persist references as it actually operates with simple scalars
// and constructs objects to provide info in a slightly more suitable way.
const compareTargets = (target1, target2) => (
  (target1 && target2 && target1.series === target2.series && target1.point === target2.point)
    || (!target1 && !target2)
);

export const processPointerMove = (targets, currentTarget, notify) => {
  const nextTarget = selectTarget(targets);
  if (compareTargets(currentTarget, nextTarget)) {
    return undefined;
  }
  if (notify) {
    notify(nextTarget);
  }
  return nextTarget;
};

// It handles the case when point is hovered and series does not contain visual points.
// Series then knows that it is also hovered and can represent the changed state.
export const getHoverTargets = (hover) => {
  if (!hover) {
    return [];
  }
  return hover.point >= 0 ? [{ series: hover.series }, hover] : [hover];
};
