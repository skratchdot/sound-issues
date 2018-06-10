import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tone from 'tone';

import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    const sampler = new Tone.Sampler(
      {
        C2: '36.mp3',
        'D#2': '39.mp3',
        'F#2': '42.mp3',
        A2: '45.mp3',
        C3: '48.mp3',
        'D#3': '51.mp3',
        'F#3': '54.mp3',
        A3: '57.mp3',
        C4: '60.mp3',
        'D#4': '63.mp3',
        'F#4': '66.mp3',
        A4: '69.mp3',
        C5: '72.mp3',
        'D#5': '75.mp3',
        'F#5': '78.mp3',
        A5: '81.mp3',
        C6: '84.mp3',
        'D#6': '87.mp3',
        'F#6': '90.mp3',
        A6: '93.mp3'
      },
      {
        baseUrl: './sounds/',
        attack: 0.1,
        release: 0.7,
        onload: () => {
          this.setState({
            soundsLoaded: true
          });
        }
      }
    ).toMaster();
    this.state = {
      notes: ['C4', 'E4', 'G4', 'B4'],
      time: '2n',
      soundsLoaded: false,
      sampler
    };
  }
  playChord = () => {
    const { notes, sampler, time } = this.state;
    sampler.triggerAttackRelease(notes, time);
  };

  updateNotes = e => {
    this.setState({
      notes: e.target.value.split(',')
    });
  };
  setDefaultNotes = () => {
    this.setState({ notes: ['C4', 'E4', 'G4', 'B4'] });
  };
  updateTime = e => {
    this.setState({
      time: e.target.value
    });
  };
  render() {
    const { notes, soundsLoaded, time } = this.state;
    return (
      <div className="App">
        <h1>Tesing sound-issues</h1>
        <hr />
        <div>Sounds Loaded: {soundsLoaded ? 'true' : 'false'}</div>
        <hr />
        Notes:
        <input type="text" value={notes.join(',')} onInput={this.updateNotes} />
        <br />
        <button onClick={this.setDefaultNotes}>set default</button>
        <hr />
        Time:
        <input type="text" value={time} onInput={this.updateTime} />
        <hr />
        <button onClick={this.playChord}>Play Chord</button>
        <hr />
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
