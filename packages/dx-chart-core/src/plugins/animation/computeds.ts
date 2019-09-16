import {
  EasingFn, ProcessAnimationFn, SetAttributeFn,
  GetNewPositionsFn, Scales, PathPoints,
} from '../../types';

/** @internal */
export const linear = (progress: number) => progress;

/** @internal */
export const getDelay = (index: number, isStart: boolean) => isStart ? index * 30 : 0;

/** @internal */
const getProgress = ({ elapsed, total }: {elapsed: number, total: number}) =>
Math.min(elapsed / total, 1);

/** @internal */
const runAnimation = (setAttributes: SetAttributeFn, getNewPositions: GetNewPositionsFn,
  easing: EasingFn, duration: number, delay: number): number => {
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
  let result;
  promise().then(res => result = res);
  return result;
};

/** @internal */
export const buildAnimation = (easing: EasingFn, duration: number) => (
  startCoords: any, endCoords: any, processAnimation: ProcessAnimationFn,
  setAttributes: SetAttributeFn, delay: number = 0,
) => {
  let animationID = runAnimation(
    setAttributes, processAnimation(startCoords, endCoords), easing, duration, delay,
  );
  return {
    update: (updatedStartCoords: any, updatedEndCoords: any, updatedDelay: number = 0) => {
      if (animationID) {
        cancelAnimationFrame(animationID);
      }
      animationID = runAnimation(
        setAttributes, processAnimation(updatedStartCoords, updatedEndCoords),
        easing, duration, updatedDelay,
      );
    },
  };
};

/** @internal */
export const processPointAnimation = (startCoords, endCoords) => {
  return (progress) => {
    return {
      x: startCoords.x + progress * (endCoords.x - startCoords.x),
      y: startCoords.y + progress * (endCoords.y - startCoords.y),
    };
  };
};

/** @internal */
export const processBarAnimation = (startCoords, endCoords) => {
  return (progress) => {
    return {
      x: startCoords.x + progress * (endCoords.x - startCoords.x),
      y: startCoords.y + progress * (endCoords.y - startCoords.y),
      startY: startCoords.startY + progress * (endCoords.startY - startCoords.startY),
    };
  };
};

/** @internal */
export const processLineAnimation = (startCoords, endCoords) => {
  return (progress) => {
    return {
      coordinates: endCoords.map((coord, index) => {
        const startCurCoord = startCoords[index];
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
export const processAreaAnimation = (startCoords, endCoords) => {
  return (progress) => {
    return {
      coordinates: endCoords.map((coord, index) => {
        const startCurCoord = startCoords[index];
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
export const processPieAnimation = (start, end) => {
  return (progress) => {
    return {
      innerRadius: start.innerRadius + progress * (end.innerRadius - start.innerRadius),
      outerRadius: start.outerRadius + progress * (end.outerRadius - start.outerRadius),
      startAngle: start.startAngle + progress * (end.startAngle - start.startAngle),
      endAngle: start.endAngle + progress * (end.endAngle - start.endAngle),
    };
  };
};

/** @internal */
export const getStartY = (scales: Scales) => {
  return scales.valScale.copy().clamp!(true)(0);
};

/** @internal */
export const getStartCoordinates = (scales: Scales, coordinates: PathPoints) => {
  const startPosition = scales.valScale.copy().clamp!(true)(0);
  return coordinates.map((coord) => {
    return { arg: coord.arg, val: startPosition, startVal: startPosition };
  });
};
