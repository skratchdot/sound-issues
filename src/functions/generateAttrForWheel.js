import * as Chord from "tonal-chord"
import * as Scale from "tonal-scale"
import * as Key from "tonal-key"
import * as Distance from "tonal-distance"

export const generateAttrForWheel = (displayFourNoteChords, keyVisual ,keyOffsetToC, mode) => {
  // let zeit0 = performance.now();

  // console.log('FUNCTION: generateAttrForWheel()')

  const chromaticChords = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  const stageStore = [];
  const chordName = [];
  const chordsStructureNames = [];
  const chordsStructureIntervals = [];
  const scaleNotes = Scale.notes(''+keyVisual+'', ''+mode+''); // scale from visual key
  const modeOffset = Distance.semitones(''+chromaticChords[keyOffsetToC]+'',''+keyVisual+'');

  // reorder scale to parallel ionian
  let modeOffsetInArray = 0;
  if (modeOffset == 2) {
    modeOffsetInArray = 6; // dorian (think the other way around, we go 'back' in the array)
  } else if(modeOffset == 4) {
    modeOffsetInArray = 5;
  } else if(modeOffset == 5) {
    modeOffsetInArray = 4;
  } else if(modeOffset == 7) {
    modeOffsetInArray = 3;
  } else if(modeOffset == 9) {
    modeOffsetInArray = 2;
  } else if(modeOffset == 11) {
    modeOffsetInArray = 1;
  }

  const reorderedScale = [];
  for (let i = 0; i < scaleNotes.length; i++) {
    let indexInScale = i + modeOffsetInArray;
    if (indexInScale >= scaleNotes.length) {
      indexInScale = indexInScale - scaleNotes.length;
    }
    reorderedScale[i] = scaleNotes[indexInScale];
  }

  // console.log(reorderedScale)


  // chord length
  let chordLength = 3; // standart is dreiklang
  if (displayFourNoteChords == true) {
    chordLength = 4;
  }

  for (let index = 0; index < 12; index++) {
    let stageIndex = index - keyOffsetToC;

    // correct negative values
    if (stageIndex < 0) {
      stageIndex = stageIndex + 12;
    }

    // get correct indexes for scale list array (flattens the array to 7)
    const stageIndexFlatend = [0, 2, 4, 5, 7, 9, 11].indexOf(stageIndex); // returns 0,1,2,3...

    if (stageIndexFlatend >= 0) {

      stageStore[index] = 'stage'+ Math.floor(stageIndexFlatend + 1); // retirns stage1, stage2...

      // return correct name from current scale
      chordName[index] = reorderedScale[stageIndexFlatend]; // returns C#, D#...

      // register every second item in a scale
      let indexInScale = 0; // start at position 0
      let indexInScaleAdder = 0;
      let eachChordStructure = [];

      // create chord structure as names
      for (let i = 0; i < chordLength; i++) {
        indexInScale = stageIndexFlatend + indexInScaleAdder; // count up
        // handle values out of range
        if(indexInScale >= reorderedScale.length) {
          indexInScale = indexInScale - reorderedScale.length;
        }
        eachChordStructure[i] = reorderedScale[indexInScale]; // write array
        indexInScaleAdder += 2; // skip every note
      }
      chordsStructureNames[index] = eachChordStructure;

      // create intervals
      let eachChordStructureIntervals = [];

      chordsStructureNames[index].forEach(function(element,i) {
        eachChordStructureIntervals[i] = Distance.interval(''+chordsStructureNames[index][0]+'', ''+chordsStructureNames[index][i]+'');
      });

      chordsStructureIntervals[index] = eachChordStructureIntervals; // returns '1P', '3m'...

    } else {
      // return 'normal' name from your chords array
      stageStore[index] = false;
      chordName[index] = chromaticChords[index];
      chordsStructureNames[index] = false;
      chordsStructureIntervals[index] = false;
    }
  }
  // console.log(chordsStructureNames)
  // console.log(chordsStructureIntervals)

  // console.log(stageStore)
  // console.log(chordsToken)
  // console.log(chordsStructureNames)
  // let zeit1 = performance.now();
  // console.log("Der Aufruf von machEtwas dauerte " + (zeit1 - zeit0) + " Millisekunden.");
  return {
    stageStore,
    chordName,
    chordsStructureNames,
    chordsStructureIntervals,
  }


}
