import {
  EasingFn, SetAttributeFn, AnimationFn, GetNewPositionsFn,
  BarCoordinates, PointCoordinates,
  PathCoordinates, PieCoordinates, PathPoints,
} from '../types';

/** @internal */
const getProgress = ({ elapsed, total }: {elapsed: number, total: number}) =>
Math.min(elapsed / total, 1);

/** @internal */
const runAnimation = (
  setAttributes: SetAttributeFn,
  getNewPositions: GetNewPositionsFn,
  easing: EasingFn, duration: number, delay: number,
) => {
  const promise = () => new Promise((resolve) => {
    setTimeout(() => {
      const time = {
        start: new Date().getTime(),
        total: duration,
        elapsed: 0,
      };
      const step = () => {
        time.elapsed = new Date().getTime() - time.start;
        const progress = getProgress(time);
        setAttributes(getNewPositions(easing(progress)));

        if (progress < 1) requestAnimationFrame(step);
      };
      resolve(requestAnimationFrame(step));
    }, delay);
  });

  return promise().then((res) => {
    return res;
  });
};

/** @internal */
export const buildAnimation = (easing: EasingFn, duration: number): AnimationFn => (
  startCoords, endCoords, processAnimation, setAttributes, delay = 0,
) => {
  let animationID;

  animationID = runAnimation(
    setAttributes, processAnimation(startCoords, endCoords), easing, duration, delay,
  );

  return {
    update: (updatedStartCoords, updatedEndCoords, updatedDelay = 0, startVal) => {
      if (animationID) {
        cancelAnimationFrame(animationID);
        animationID = undefined;
      }
      animationID = runAnimation(
        setAttributes, processAnimation(updatedStartCoords, updatedEndCoords, startVal),
        easing, duration, updatedDelay,
      );
    },
    stop: () => {
      if (animationID) {
        cancelAnimationFrame(animationID);
        animationID = undefined;
      }
    },
  };
};

/** @internal */
export const processPointAnimation = (
  startCoords: PointCoordinates, endCoords: PointCoordinates,
) => {
  return (progress: number) => {
    return {
      x: startCoords.x + progress * (endCoords.x - startCoords.x),
      y: startCoords.y + progress * (endCoords.y - startCoords.y),
    };
  };
};

/** @internal */
export const processBarAnimation = (startCoords: BarCoordinates, endCoords: BarCoordinates) => {
  return (progress: number) => {
    return {
      x: startCoords.x + progress * (endCoords.x - startCoords.x),
      y: startCoords.y + progress * (endCoords.y - startCoords.y),
      startY: startCoords.startY + progress * (endCoords.startY - startCoords.startY),
    };
  };
};

/** @internal */
export const processLineAnimation = (
  startCoords: PathCoordinates, endCoords: PathPoints, startVal?: number,
) => {
  return (progress: number) => {
    return {
      coordinates: endCoords.map((coord, index) => {
        const startCurCoord = startCoords[index] || { arg: coord.arg, val: startVal };
        return {
          ...coord,
          arg: startCurCoord.arg + progress * (coord.arg - startCurCoord.arg),
          val: startCurCoord.val + progress * (coord.val - startCurCoord.val),
        };
      }),
    };
  };
};

/** @internal */
export const processAreaAnimation = (
  startCoords: PathCoordinates, endCoords: PathPoints, startVal?: number,
) => {
  return (progress: number) => {
    return {
      coordinates: endCoords.map((coord, index) => {
        const startCurCoord = startCoords[index] || { arg: coord.arg, val: startVal, startVal };
        return {
          ...coord,
          arg: startCurCoord.arg + progress * (coord.arg - startCurCoord.arg),
          val: startCurCoord.val + progress * (coord.val - startCurCoord.val),
          startVal: startCurCoord.startVal + progress * (coord.startVal - startCurCoord.startVal),
        };
      }),
    };
  };
};

/** @internal */
export const processPieAnimation = (start: PieCoordinates, end: PieCoordinates) => {
  return (progress: number) => {
    return {
      innerRadius: start.innerRadius + progress * (end.innerRadius - start.innerRadius),
      outerRadius: start.outerRadius + progress * (end.outerRadius - start.outerRadius),
      startAngle: start.startAngle + progress * (end.startAngle - start.startAngle),
      endAngle: start.endAngle + progress * (end.endAngle - start.endAngle),
    };
  };
};
