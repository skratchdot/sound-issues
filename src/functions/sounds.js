import Tone from 'tone';
import * as Tonal from "tonal"
import * as Interval from "tonal-interval"
import * as Note from "tonal-note";

export const makeTonalPlayable = (intervals,octave,bass) => {

  if (octave == null) {
    octave = 4;
  }
  if (intervals == null) {
    console.error("[Warning] makeTonalPlayable() needs intervals")
  }
  const playableTones = [];
  const playableTonesNames = [];
  const lowerOctave = octave - 1;
  const upperOctave = octave + 1;
  let chordStartingPoint = 0;
  intervals.forEach(function(el,i) {
    // set starting point
    if (i == 0) {
      chordStartingPoint = Interval.num(Tonal.interval('C'+octave+'',''+(el+octave)+''));
    }

    // check if interval is smaller than starting point
    if (Interval.num(Tonal.interval('C'+octave+'',''+(el+octave)+'')) < chordStartingPoint) {
      octave = upperOctave;
    }
    // playableTones[i] = Tonal.freq(el + octave);
    playableTonesNames[i] = Note.enharmonic(el + octave); // enharmonic to handle tone.js names (F##)
  })

  // add bass note
  if (bass) {
    playableTonesNames.unshift(Note.enharmonic(intervals[0]+lowerOctave))
  }
  return playableTonesNames;
}

// export a polySynth (to compare issues with sampler) => same same
export const synth = new Tone.PolySynth(6, Tone.Synth).toMaster();

// export our context to start it on tap
export const context = Tone.context;

export const sampler = new Tone.Sampler({
  "C2" : "piano_1.[m4a|ogg]",
  "D#2" : "piano_4.[m4a|ogg]",
  "F#2" : "piano_7.[m4a|ogg]",
  "A2" : "piano_10.[m4a|ogg]",
	"C3" : "piano_13.[m4a|ogg]",
	"D#3" : "piano_16.[m4a|ogg]",
	"F#3" : "piano_19.[m4a|ogg]",
	"A3" : "piano_22.[m4a|ogg]",
  "C4" : "piano_25.[m4a|ogg]",
  "D#4" : "piano_28.[m4a|ogg]",
  "F#4" : "piano_31.[m4a|ogg]",
  "A4" : "piano_34.[m4a|ogg]",
  "C5" : "piano_37.[m4a|ogg]",
  "D#5" : "piano_40.[m4a|ogg]",
  "F#5" : "piano_43.[m4a|ogg]",
  "A5" : "piano_46.[m4a|ogg]",
  "C6" : "piano_49.[m4a|ogg]",
  "D#6" : "piano_52.[m4a|ogg]",
  "F#6" : "piano_55.[m4a|ogg]",
  "A6" : "piano_58.[m4a|ogg]",
},{
  baseUrl: './sounds/',
  attack: .1,
  release: .7,
	onload : function(){
    console.log("sounds loaded")
	}
}).toMaster();


console.log(Tone.context.state)
