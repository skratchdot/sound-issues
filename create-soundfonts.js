const execFile = require('child_process').execFile;
const tonal = require('tonal');
const pathToSoundfont =
  '/Users/jeff/git/free-midi/_files/GeneralUser GS 1.44 FluidSynth/GeneralUser GS FluidSynth v1.44.sf2';
const orig = {
  C2: 'piano_1.[m4a|ogg]',
  'D#2': 'piano_4.[m4a|ogg]',
  'F#2': 'piano_7.[m4a|ogg]',
  A2: 'piano_10.[m4a|ogg]',
  C3: 'piano_13.[m4a|ogg]',
  'D#3': 'piano_16.[m4a|ogg]',
  'F#3': 'piano_19.[m4a|ogg]',
  A3: 'piano_22.[m4a|ogg]',
  C4: 'piano_25.[m4a|ogg]',
  'D#4': 'piano_28.[m4a|ogg]',
  'F#4': 'piano_31.[m4a|ogg]',
  A4: 'piano_34.[m4a|ogg]',
  C5: 'piano_37.[m4a|ogg]',
  'D#5': 'piano_40.[m4a|ogg]',
  'F#5': 'piano_43.[m4a|ogg]',
  A5: 'piano_46.[m4a|ogg]',
  C6: 'piano_49.[m4a|ogg]',
  'D#6': 'piano_52.[m4a|ogg]',
  'F#6': 'piano_55.[m4a|ogg]',
  A6: 'piano_58.[m4a|ogg]'
};

const data = [];
const newMap = {};
Object.keys(orig).forEach(note => {
  const midi = tonal.midi(note);
  const item = {
    note,
    midi
  };
  data.push(item);
  newMap[note] = item.filename;
});
console.log(newMap);

const buildFile = midi =>
  new Promise((resolve, reject) => {
    execFile(
      'soundfont2mp3',
      [
        '-s',
        pathToSoundfont,
        '-c',
        '0',
        '-i',
        '0',
        '-n',
        midi,
        '-d',
        '128',
        '-o',
        `./public/sounds/${midi}.mp3`
      ],
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        } else {
          console.log(stdout.toString('utf8'));
          console.log(stderr.toString('utf8'));
          resolve();
        }
      }
    );
  });

(async () => {
  for (let i = 0; i < data.length; i++) {
    console.log('Building:', data[i]);
    await buildFile(data[i].midi);
  }
})();
