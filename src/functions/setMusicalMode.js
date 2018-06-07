import {detectAndSetParallelKey} from './detectAndSetKey';
import {timings, easings, colors} from '../vars';
import {TweenMax} from 'gsap';

export const setMusicalMode = ($this, mode, live) => {

  let wheelModeRotation;
  let rootHasStage;
  const wheelCurrentRotation = $this.$store.getters.getWheelRotation.key;

  if (mode === 'ionian') {
    wheelModeRotation = 0;
    rootHasStage = 'stage1';
  } else if (mode === 'aeolian' || mode === 'melodic minor' || mode === 'harmonic minor' || mode === 'melodic minor fifth mode') {
    wheelModeRotation = -90;
    rootHasStage = 'stage6';
  } else if (mode === 'dorian') {
    wheelModeRotation = -60;
    rootHasStage = 'stage2';
  } else if (mode === 'phrygian') {
    wheelModeRotation = -120;
    rootHasStage = 'stage3';
  } else if (mode === 'lydian') {
    wheelModeRotation = 30;
    rootHasStage = 'stage4';
  } else if (mode === 'mixolydian') {
    wheelModeRotation = -30;
    rootHasStage = 'stage5';
  } else if (mode === 'locrian') {
    wheelModeRotation = -150;
    rootHasStage = 'stage7';
  }

  // set mode in store
  $this.$store.dispatch('setMusicalMode', mode);
  $this.$store.dispatch('setWheelRotationMode', wheelModeRotation);

  detectAndSetParallelKey($this, $this.$store.getters.musicalState__key, wheelModeRotation)

  // resetTimingIfWeSetThisOnLoad
  let switchTiming = timings.wheelModeChangeRotation;
  if (live === false) {
    switchTiming = 0;
  }

  // twist wheel
  TweenMax.to('#wheelContainer .rotateForModeChange', switchTiming, {
    transformOrigin: 'center',
    rotation: wheelModeRotation,
    force3D: true,
    ease: easings.wheelModeChangeRotation
  })

  // twist stages
  TweenMax.to('#wheelContainer .stage', switchTiming, {
    transformOrigin: 'center',
    rotation: wheelModeRotation * -1,
    force3D: true,
    ease: easings.wheelModeChangeRotation
  })


  // twist chords
  TweenMax.to('#wheelContainer #wheelChords', switchTiming, {
    transformOrigin: 'center',
    rotation: wheelCurrentRotation + wheelModeRotation,
    // rotation: (wheelCurrentRotation - wheelModeRotation) * -1,
    force3D: true,
    ease: easings.wheelModeChangeRotation
  })

  // twist chord
  TweenMax.to('#wheelContainer .chord', switchTiming, {
    transformOrigin: 'center',
    rotation: (wheelCurrentRotation + wheelModeRotation) * -1,
    force3D: true,
    ease: easings.wheelModeChangeRotation
  })

  // set new visual Key
  $this.$store.dispatch('setWheelRotationKeyVisual', (wheelCurrentRotation + wheelModeRotation))

  function checkForStageColor(chordStructure) {
    // set color depending on chord structure
    if (chordStructure[1] == '3m' && chordStructure[2] == '5P') {
      return colors.color_min;
    } else if (chordStructure[1] == '3m' && chordStructure[2] == '5d') {
      return colors.color_dim;
    } else if (chordStructure[1] == '3M' && chordStructure[2] == '5A') {
      return colors.color_aug;
    } else {
      return colors.color_maj;
    }
  }

  // get correct chord structure of root stage
  const rootStageIndex = $this.$store.getters.getGeneratedAttrForWheel.stageStore.indexOf(rootHasStage)
  // color root
  TweenLite.to('#wheelContainer .colorThisRoot', switchTiming, {
    fill: checkForStageColor($this.$store.getters.getGeneratedAttrForWheel.chordsStructureIntervals[rootStageIndex]),
    ease: easings.wheelModeChangeRotation
  })


  // color wheel
  $this.$store.getters.getGeneratedAttrForWheel.stageStore.forEach((el, i) => {
    if (el) {
      const thisChordStr = $this.$store.getters.getGeneratedAttrForWheel.chordsStructureIntervals[i];

      // color wheel stages
      TweenMax.to('#mainSystem .' + el + ' path', switchTiming, {
        fill: checkForStageColor(thisChordStr),
        force3D: true,
        ease: easings.wheelModeChangeRotation
      })
    }
  })

}
