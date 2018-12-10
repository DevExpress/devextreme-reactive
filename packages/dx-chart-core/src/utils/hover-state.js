// Comparing by reference is not an option as Tracker always sends new objects.
// On the other side Tracker cannot persist references as it actually operates with simple scalars
// and constructs objects to provide info in a slightly more suitable way.
const compareTargets = (target1, target2) => (
  target1.series === target2.series && target1.point === target2.point
);

// Current value is chosen roughly and expected to be adjusted.
const DISTANCE_PRIORITY_RATIO = 4;

// If *currentTarget* is among *targets* then it has priority but only while its distance
// is not significantly greater (DISTANCE_PRIORITY_RATIO) than that of the best candidate.
const selectTarget = (targets, currentTarget) => {
  if (!currentTarget) {
    return targets.length ? targets[0] : undefined;
  }
  if (!targets.length) {
    return null;
  }
  const candidate = targets[0];
  // Skip complex checks if *currentTarget* has minimal distance.
  if (compareTargets(candidate, currentTarget)) {
    return undefined;
  }
  // Skip complex check if there is single candidate.
  if (targets.length === 1) {
    return candidate;
  }
  const current = targets.find(target => compareTargets(target, currentTarget));
  if (current) {
    // Here *current.distance* is exactly greater than *candidate.distance*.
    // The question is - how much greater?
    const ratio = current.distance / candidate.distance;
    return ratio > DISTANCE_PRIORITY_RATIO ? candidate : undefined;
  }
  return candidate;
};

export const processPointerMove = (targets, currentTarget, notify) => {
  const nextTarget = selectTarget(targets, currentTarget);
  if (nextTarget === undefined) {
    return undefined;
  }
  if (notify) {
    notify(nextTarget);
  }
  return nextTarget;
};
