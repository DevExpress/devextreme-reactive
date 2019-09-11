/** @internal */
export const buildAnimation = (
  processAnimation, setState, animationID,
) => {
  if (animationID) {
    cancelAnimationFrame(animationID);
  }
  const getProgress = ({ elapsed, total }) => Math.min(elapsed / total, 1);
  const easeOut = progress => Math.pow(progress - 1, 5) + 1;
  const time = {
    start: performance.now(),
    total: 1000,
    elapsed: 0,
  };

  const tick = (now) => {
    time.elapsed = now - time.start;
    const progress = getProgress(time);
    const easing = easeOut(progress);

    setState(processAnimation(easing));

    if (progress < 1) requestAnimationFrame(tick);
  };

  const animationId = requestAnimationFrame(tick);
  return animationId;
};

export const processPointAnimation = (startCoords, endCoords, scales) => {
  let startX;
  let startY;
  if (!startCoords) {
    startX = endCoords.x;
    startY = scales.valScale.copy().clamp!(true)(0);
  } else {
    startX = startCoords.x;
    startY = startCoords.y;
  }
  return (progress) => {
    return {
      x: startX + progress * (endCoords.x - startX),
      y: startY + progress * (endCoords.y - startY),
    };
  };
};

export const processLineAnimation = (startCoords, endCoords, scales) => {
  const startPosition = scales.valScale.copy().clamp!(true)(0);
  let fromCoords = startCoords && startCoords.slice();
  if (!fromCoords) {
    fromCoords = endCoords.map((coord) => {
      return { arg: coord.arg, val: startPosition };
    });
  }

  return (progress) => {
    return {
      coordinates: endCoords.map((coord, index) => {
        const startCurCoord = fromCoords[index];
        return {
          arg: startCurCoord.arg + progress * (coord.arg - startCurCoord.arg),
          val: startCurCoord.val + progress * (coord.val - startCurCoord.val),
        };
      }),
    };
  };
};

export const processAreaAnimation = (startCoords, endCoords, scales) => {
  const startPosition = scales.valScale.copy().clamp!(true)(0);
  let fromCoords = startCoords && startCoords.slice();
  if (!fromCoords) {
    fromCoords = endCoords.map((coord) => {
      return { arg: coord.arg, val: startPosition, startVal: startPosition };
    });
  }

  return (progress) => {
    return {
      coordinates: endCoords.map((coord, index) => {
        const startCurCoord = fromCoords[index];
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
