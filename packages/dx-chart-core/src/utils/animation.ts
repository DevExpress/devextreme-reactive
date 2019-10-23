import {
  EasingFn, SetAttributeFn, AnimationFn, GetNewPositionsFn,
  RangePointCoordinates, PointCoordinates,
  PieCoordinates, PathStartCoordinates, PathEndCoordinates,
} from '../types';

/** @internal */
const getProgress = ({ elapsed, total }: {elapsed: number, total: number}) =>
Math.min(elapsed / total, 1);

/** @internal */
const runAnimation = (
  setAttributes: SetAttributeFn,
  getNewPositions: GetNewPositionsFn,
  easing: EasingFn, duration: number, delay: number,
) => new Promise((resolve) => {
  setTimeout(() => {
    const time = {
      start: Date.now(),
      total: duration,
      elapsed: 0,
    };
    const step = () => {
      time.elapsed = Date.now() - time.start;
      const progress = getProgress(time);
      setAttributes(getNewPositions(easing(progress)));

      if (progress < 1) requestAnimationFrame(step);
    };
    resolve(requestAnimationFrame(step));
  }, delay);
});

/** @internal */
export const buildAnimation = (easing: EasingFn, duration: number): AnimationFn => (
  startCoords, endCoords, processAnimation, setAttributes, delay = 0,
) => {
  let animationID;

  animationID = runAnimation(
    setAttributes, processAnimation(startCoords, endCoords), easing, duration, delay,
  ).then((res) => {
    animationID = res;
  });

  const stop = () => {
    if (animationID) {
      cancelAnimationFrame(animationID);
      animationID = undefined;
    }
  };

  return {
    update: (updatedStartCoords, updatedEndCoords, updatedDelay = 0) => {
      stop();
      animationID = runAnimation(
        setAttributes, processAnimation(updatedStartCoords, updatedEndCoords),
        easing, duration, updatedDelay,
      ).then((res) => {
        animationID = res;
      });
    },
    stop,
  };
};

const lerp = (a: number, b: number, t: number) => a + t * (b - a);

/** @internal */
export const processPointAnimation = (
  startCoords: PointCoordinates, endCoords: PointCoordinates,
) => {
  return (progress: number) => {
    return {
      arg: lerp(startCoords.arg, endCoords.arg, progress),
      val: lerp(startCoords.val, endCoords.val, progress),
    };
  };
};

/** @internal */
export const processBarAnimation = (
  startCoords: RangePointCoordinates, endCoords: RangePointCoordinates,
) => {
  return (progress: number) => {
    return {
      arg: lerp(startCoords.arg, endCoords.arg, progress),
      val: lerp(startCoords.val, endCoords.val, progress),
      startVal: lerp(startCoords.startVal, endCoords.startVal, progress),
    };
  };
};

/** @internal */
export const processLineAnimation = (
  { coordinates }: PathStartCoordinates,
  { coordinates: endCoordinates }: PathEndCoordinates,
) => {
  return (progress: number) => {
    return {
      coordinates: endCoordinates.map((coord, index) => {
        const startCurCoord = coordinates[index];
        return {
          ...coord,
          arg: lerp(startCurCoord.arg, coord.arg, progress),
          val: lerp(startCurCoord.val, coord.val, progress),
        };
      }),
    };
  };
};

/** @internal */
export const processAreaAnimation = (
  { coordinates }: PathStartCoordinates,
  { coordinates: endCoordinates }: PathEndCoordinates,
) => {
  return (progress: number) => {
    return {
      coordinates: endCoordinates.map((coord, index) => {
        const startCurCoord = coordinates[index];
        return {
          ...coord,
          arg: lerp(startCurCoord.arg, coord.arg, progress),
          val: lerp(startCurCoord.val, coord.val, progress),
          startVal: lerp(startCurCoord.startVal, coord.startVal, progress),
        };
      }),
    };
  };
};

/** @internal */
export const processPieAnimation = (start: PieCoordinates, end: PieCoordinates) => {
  return (progress: number) => {
    return {
      innerRadius: lerp(start.innerRadius, end.innerRadius, progress),
      outerRadius: lerp(start.outerRadius, end.outerRadius, progress),
      startAngle: lerp(start.startAngle, end.startAngle, progress),
      endAngle: lerp(start.endAngle, end.endAngle, progress),
    };
  };
};
