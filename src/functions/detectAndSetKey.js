import * as Distance from "tonal-distance"

export const detectAndSetParallelKey = ($this,key,modeAdjustetRotation) => {
  let visualKey;

  if (modeAdjustetRotation === 0) {
    visualKey = Distance.transpose(''+key+'', 'P1')
  } else if (modeAdjustetRotation === -90) {
    visualKey = Distance.transpose(''+key+'', 'M6')
  } else if (modeAdjustetRotation === -60) {
    visualKey = Distance.transpose(''+key+'', 'M2')
  } else if (modeAdjustetRotation === -120) {
    visualKey = Distance.transpose(''+key+'', 'M3')
  } else if (modeAdjustetRotation === 30) {
    visualKey = Distance.transpose(''+key+'', 'P4')
  } else if (modeAdjustetRotation === -30) {
    visualKey = Distance.transpose(''+key+'', 'P5')
  } else if (modeAdjustetRotation === -150) {
    visualKey = Distance.transpose(''+key+'', 'M7')
  }

  $this.$store.dispatch('setVisualKey', visualKey)
}

export const detectAndSetKey = ($this, rotationOfWheel, modeAdjustetRotation) => {

  // console.log('detectAndSetKey() was executed') // DEV

  let key = 'C';
  let rotationOfWheel__store = 0;
  const rotationFlat = rotationOfWheel - modeAdjustetRotation;

  // C
  if (rotationFlat === 0 || rotationFlat === 360) {
    key = 'C';
    rotationOfWheel__store = 0; // C
  }
  // G
  if (rotationFlat === 330 || rotationFlat === -30 || rotationFlat === 690) {
    key = 'G';
    rotationOfWheel__store = 330; // G
  }
  // D
  if (rotationFlat === 300 || rotationFlat === -60 || rotationFlat === 660) {
    key = 'D';
    rotationOfWheel__store = 300; // D
  }
  // A
  if (rotationFlat === 270 || rotationFlat === -90 || rotationFlat === 630) {
    key = 'A';
    rotationOfWheel__store = 270; // A
  }
  // E
  if (rotationFlat === 240 || rotationFlat === -120 || rotationFlat === 600) {
    key = 'E';
    rotationOfWheel__store = 240; // E
  }
  // B
  if (rotationFlat === 210 || rotationFlat === -150 || rotationFlat === 570) {
    key = 'B';
    rotationOfWheel__store = 210; //B
  }
  // F#
  if (rotationFlat === 180 || rotationFlat === -180 || rotationFlat === 540) {
    key = 'F#';
    rotationOfWheel__store = 180; // F#/Ges
  }
  // F
  if (rotationFlat === 30 || rotationFlat === -330 || rotationFlat === 390) {
    key = 'F';
    rotationOfWheel__store = 30; // F
  }
  // Bb
  if (rotationFlat === 60 || rotationFlat === -300 || rotationFlat === 420) {
    key = 'Bb';
    rotationOfWheel__store = 60;
  }
  // Eb
  if (rotationFlat === 90 || rotationFlat === -270 || rotationFlat === 450) {
    key = 'Eb';
    rotationOfWheel__store = 90;
  }
  // Ab
  if (rotationFlat === 120 || rotationFlat === -240 || rotationFlat === 480) {
    key = 'Ab';
    rotationOfWheel__store = 120;
  }
  // Db
  if (rotationFlat === 150 || rotationFlat === -210 || rotationFlat === 510) {
    key = 'Db';
    rotationOfWheel__store = 150;
  }

  //  reset rotation to have the visual rotation
  const rotationOfWheel__visual = rotationOfWheel__store - modeAdjustetRotation * -1;

  detectAndSetParallelKey($this,key,modeAdjustetRotation)

  $this.$store.dispatch('setMusicalKey', key)
  $this.$store.dispatch('setWheelRotationKey', rotationOfWheel__store)
  $this.$store.dispatch('setWheelRotationKeyVisual', rotationOfWheel__visual)

  // return {key, rotationOfWheel__store}
}
