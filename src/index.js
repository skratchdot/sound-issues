import React, { Component } from "react";
import ReactDOM from "react-dom";
import Tone from "tone";

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    const sampler = new Tone.Sampler(
      {
        C2: "piano_1.[m4a|ogg]",
        "D#2": "piano_4.[m4a|ogg]",
        "F#2": "piano_7.[m4a|ogg]",
        A2: "piano_10.[m4a|ogg]",
        C3: "piano_13.[m4a|ogg]",
        "D#3": "piano_16.[m4a|ogg]",
        "F#3": "piano_19.[m4a|ogg]",
        A3: "piano_22.[m4a|ogg]",
        C4: "piano_25.[m4a|ogg]",
        "D#4": "piano_28.[m4a|ogg]",
        "F#4": "piano_31.[m4a|ogg]",
        A4: "piano_34.[m4a|ogg]",
        C5: "piano_37.[m4a|ogg]",
        "D#5": "piano_40.[m4a|ogg]",
        "F#5": "piano_43.[m4a|ogg]",
        A5: "piano_46.[m4a|ogg]",
        C6: "piano_49.[m4a|ogg]",
        "D#6": "piano_52.[m4a|ogg]",
        "F#6": "piano_55.[m4a|ogg]",
        A6: "piano_58.[m4a|ogg]"
      },
      {
        baseUrl: "./sounds/",
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
      notes: ["C4", "E4", "G4", "B4"],
      time: "2n",
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
      notes: e.target.value.split(",")
    });
  };
  setDefaultNotes = () => {
    this.setState({ notes: ["C4", "E4", "G4", "B4"] });
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
        <div>Sounds Loaded: {soundsLoaded ? "true" : "false"}</div>
        <hr />
        Notes:
        <input type="text" value={notes.join(",")} onInput={this.updateNotes} />
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

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
