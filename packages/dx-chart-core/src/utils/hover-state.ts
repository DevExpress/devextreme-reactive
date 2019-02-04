import { Target, TargetList } from '../types';

// Comparing by reference is not an option as Tracker always sends new objects.
// Tracker cannot persist references as it actually operates with simple scalars
// and constructs objects to provide info in a slightly more suitable way.
const compareTargets = (target1: Target, target2: Target) => (
  target1.series === target2.series && target1.point === target2.point
);

type ProcessedTarget = Target | null | undefined;

// If *currentTarget* is among *targets* then it has priority but only while its distance
// is not significantly greater (DISTANCE_PRIORITY_RATIO) than that of the best candidate.
const selectTarget = (targets: TargetList, currentTarget: Target): ProcessedTarget => {
  const candidate = targets[0];
  if (!currentTarget) {
    return candidate;
  }
  if (!candidate) {
    return null;
  }
  return compareTargets(candidate, currentTarget) ? undefined : candidate;
};

export const processPointerMove = (
  targets: TargetList, currentTarget: Target, notify: (target: Target | null) => void,
) => {
  const nextTarget = selectTarget(targets, currentTarget);
  if (nextTarget === undefined) {
    return undefined;
  }
  if (notify) {
    notify(nextTarget);
  }
  return nextTarget;
};
