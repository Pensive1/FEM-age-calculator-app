import options from "../types/AnimationUtils";

const countUp = (
  targetVal: number,
  uiUpdateFn: Function,
  options: options = { speed: 60 }
) => {
  const steps =
    Math.floor(targetVal / options.speed) > 0
      ? Math.floor(targetVal / options.speed)
      : 1;
  const remainder = targetVal % steps;
  const softTargetVal = targetVal - remainder;
  let startVal = 0;

  //   (State set function) resets per function call
  uiUpdateFn(startVal);

  const counter = setInterval(() => {
    // For checking calculation output
    // console.log(
    //   `start val: ${startVal}, Soft target: ${softTargetVal}, Target: ${targetVal}`
    // );

    if (startVal < softTargetVal) {
      uiUpdateFn((startVal += steps));
    }

    if (startVal >= softTargetVal && startVal !== targetVal) {
      uiUpdateFn(++startVal);
    }

    if (startVal === targetVal) {
      clearInterval(counter);
    }
  }, options.speed);

  return counter;
};

export default countUp;
