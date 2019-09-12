/** @internal */
export const easeOut = progress => Math.pow(progress - 1, 5) + 1;

/** @internal */
const getProgress = ({ elapsed, total }) => Math.min(elapsed / total, 1);

const runAnimation = (setAttributes, processAnimation, easing, duration) => {
  const time = {
    start: performance.now(),
    total: duration,
    elapsed: 0,
  };

  const step = (now) => {
    time.elapsed = now - time.start;
    const progress = getProgress(time);

    setAttributes(processAnimation(easing(progress)));

    if (progress < 1) requestAnimationFrame(step);
  };
  return requestAnimationFrame(step);
};

/** @internal */
export const buildAnimation = (easing, duration) => (
  startCoords, endCoords, processAnimation, setAttributes,
) => {
  let animationID = runAnimation(
    setAttributes, processAnimation(startCoords, endCoords), easing, duration,
  );

  return {
    update: (updatedStartCoords, updatedEndCoords) => {
      if (animationID) {
        cancelAnimationFrame(animationID);
      }
      animationID = runAnimation(
        setAttributes, processAnimation(updatedStartCoords, updatedEndCoords), easing, duration,
      );
    },
  };
};

export const processPointAnimation = (startCoords, endCoords) => {
  return (progress) => {
    return {
      x: startCoords.x + progress * (endCoords.x - startCoords.x),
      y: startCoords.y + progress * (endCoords.y - startCoords.y),
    };
  };
};

export const processLineAnimation = (startCoords, endCoords) => {
  return (progress) => {
    return {
      coordinates: endCoords.map((coord, index) => {
        const startCurCoord = startCoords[index];
        return {
          arg: startCurCoord.arg + progress * (coord.arg - startCurCoord.arg),
          val: startCurCoord.val + progress * (coord.val - startCurCoord.val),
        };
      }),
    };
  };
};

export const processAreaAnimation = (startCoords, endCoords) => {
  return (progress) => {
    return {
      coordinates: endCoords.map((coord, index) => {
        const startCurCoord = startCoords[index];
        return {
          arg: startCurCoord.arg + progress * (coord.arg - startCurCoord.arg),
          val: startCurCoord.val + progress * (coord.val - startCurCoord.val),
          startVal: startCurCoord.startVal + progress * (coord.startVal - startCurCoord.startVal),
        };
      }),
    };
  };
};

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
export const getStartY = (scales) => {
  return scales.valScale.copy().clamp!(true)(0);
};

/** @internal */
export const getStartCoordinates = (scales, coordinates) => {
  const startPosition = scales.valScale.copy().clamp!(true)(0);
  return coordinates.map((coord) => {
    return { arg: coord.arg, val: startPosition, startVal: startPosition };
  });
};
