import {
  timings,
  easings
} from '../vars';

export const resizeWheel = (live) => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // find out scale amount
  let scaleAmount;
  const baseHeightOfWheel = 600;

  // position in Y direction
  const headerHeight = 60;
  const safeAreaTop = 0; // TODO safe area
  const whiteSpaceTop = headerHeight + safeAreaTop;

  // check if wheel overlaps some stuff
  const firstRelevantEl = document.getElementById('reducesWheelHeight');
  let firstRelevantElement;

  if (firstRelevantEl != null) {
    firstRelevantElement = firstRelevantEl.getBoundingClientRect().top;
  } else {
    firstRelevantElement = windowHeight*.8;
    console.error('WARNING: Wheel area not correctly defined')
  }


  const heightOfWheelArea = windowHeight - whiteSpaceTop - (windowHeight - firstRelevantElement);

                // area between header and first relevant object
  scaleAmount = heightOfWheelArea / 600;

  let actualHeightOfWheel = baseHeightOfWheel * scaleAmount;

  let yPositionOfWheel = whiteSpaceTop;

  // check if wheel is bigger than width
  if (actualHeightOfWheel > (windowWidth)) {
    scaleAmount = windowWidth / 550; // depending on wheel width (600) a little smaller for less whitespace
    actualHeightOfWheel = baseHeightOfWheel * scaleAmount; // update let
    yPositionOfWheel = (heightOfWheelArea - actualHeightOfWheel) / 2 + whiteSpaceTop;
  }

  // if wheel is bigger than base height set wheel to 100%
  if (actualHeightOfWheel > baseHeightOfWheel) {
    scaleAmount = 1;
    actualHeightOfWheel = baseHeightOfWheel;
    yPositionOfWheel = (heightOfWheelArea - actualHeightOfWheel) / 2 + whiteSpaceTop;
  }

  let timing = timings.appModeSwitchContent;

  live == false ? timing = 0 : '';

  TweenMax.to('.wheelContainer', timing,{
    scale: scaleAmount,
    y:yPositionOfWheel,
    force3D:true,
    transformOrigin: 'center top',
    ease: easings.appModeSwitchContent
  })
}
