import Vue from 'vue'
import Vuex from 'vuex'

import {setLocalStorageInitial} from '../functions/setLocalStorageInitial';
import {generateAttrForWheel} from '../functions/generateAttrForWheel';

import {transpose, Scale, Tonal} from "tonal";
import {semitones} from "tonal-distance";
import * as Key from "tonal-key"

setLocalStorageInitial() // set initial values

// check the KEY offset to C in the wheel
function keyOffsetInWheel(keyOffsetToC) {
  if (keyOffsetToC % 2) { // odd
    if (keyOffsetToC - 6 < 0) {
      return keyOffsetToC + 12 - 6
    } else { // even
      return keyOffsetToC - 6
    }
  } else {
    return keyOffsetToC
  }
}

// check the MODE offset to C in the wheel
function modeOffsetInWheel(mode) {
  if(mode === 'ionian') {
    return 0;
  } else if (mode === 'aeolian' || mode === 'melodic minor' || mode === 'harmonic minor') {
    return 3;
  } else if (mode === 'dorian') {
    return 2;
  } else if (mode === 'phrygian') {
    return 4;
  } else if (mode === 'lydian') {
    return -1;
  } else if (mode === 'mixolydian') {
    return 1;
  } else if (mode === 'locrian') {
    return 5;
  }
}

// use VUEX
Vue.use(Vuex);

// set some predefined settings in LocalStorage if not present:

export const store = new Vuex.Store({
  state: {
    appMode: localStorage.getItem('appMode'), // progression or scale
    plan: 'basic', // basic or pro
    settingsBoolean: { // add setting here and localize it
      playbackChordOnTap: {
        proFeature: false,
        active: JSON.parse(localStorage.getItem('playbackChordOnTap'))
      },
      displayFourNoteChords: {
        proFeature: false,
        active: JSON.parse(localStorage.getItem('displayFourNoteChords'))
      },
      displayMinorInSmall: {
        proFeature: false,
        active: JSON.parse(localStorage.getItem('displayMinorInSmall'))
      },
      germanNoteNames: {
        proFeature: false,
        active: JSON.parse(localStorage.getItem('germanNoteNames'))
      },
      hapticFeedback: {
        proFeature: false,
        active: JSON.parse(localStorage.getItem('hapticFeedback'))
      }
    },
    settingsDropdown: { // add setting here and localize it
      appTheme: {
        available: [
          'dark', 'light'
        ],
        proFeature: true,
        active: localStorage.getItem('appTheme') // dark
      },
      appLanguage: {
        available: [
          'en', 'de'
        ],
        proFeature: false,
        active: 'en'
      }
    },
    favoriteClef: localStorage.getItem('favoriteClef'), // clefG
    wheelRotation: {
      key: JSON.parse(localStorage.getItem('wheelRotationKey')),// this the rotation related to the root
      keyVisual: JSON.parse(localStorage.getItem('wheelRotationKeyVisual')), // this the rotation the user actually sees
      mode: JSON.parse(localStorage.getItem('wheelRotationMode'))
    },
    musicalState: {
      musicalKey: localStorage.getItem('musicalKey'), // C Key we work with for calculations
      visualKey: localStorage.getItem('visualKey'), // C (if mode is different) this is what the user thinks is active. Actually under the hood we work with the parallel key
      musicalMode: localStorage.getItem('musicalMode'), // ionian
    },
    progression: [
      "", { // increase index by 1 // bar 1
        active: true, // will bar be played?
        beat: [
          "", { // increase index by 1 // beat nmbr
            stage: 1, // nmbr or 'custom'
            rootOffset: 0, // chord structure or name
            chord: [0, 4, 7, 9] // chord structure or name
          }, { // beat nmbr
            stage: 1, // nmbr or 'custom'
            chord: {
              rootOffset: 0, // chord structure or name
              structure: [
                0, 4, 7, 9, 11
              ],
              name: 'Abmaj'
            } // chord structure or name or both
          }, { // beat nmbr
            stage: 1, // nmbr or 'custom'
            chord: [] // chord structure or name or both
          }, { // beat nmbr
            stage: 1, // nmbr or 'custom'
            chord: [] // chord structure or name or both
          }
        ]
      }
    ]
  },
  getters: {
    appMode: state => {
      return state.appMode;
    },
    appModeIsProgression: state => {
      return state.appMode == 'progression'
        ? true
        : false;
    },
    appTheme: state => {
      return state.settingsDropdown.appTheme.active;
    },
    appBasicVersion: state => {
      return state.plan == 'basic'
        ? true
        : false;
    },
    appLanguage: state => {
      return state.settingsDropdown.appLanguage.active;
    },
    favoriteClef: state => {
      return state.favoriteClef;
    },
    settingsBoolean: state => {
      return state.settingsBoolean;
    },
    settingsDropdown: state => {
      return state.settingsDropdown;
    },

    musicalState__key: state => {
      return state.musicalState.musicalKey;
    },
    musicalState__keyVisual: state => {
      return state.musicalState.visualKey;
    },
    musicalState__mode: state => {
      return state.musicalState.musicalMode;
    },
    musicalState__scale: state => {
      return Scale.notes('' + state.musicalState.visualKey + ' ' + state.musicalState.musicalMode + '');
    },
    musicalState__chords: state => {
      return Key.chords('' + state.musicalState.musicalKey + ' ' + state.musicalState.musicalMode + ''); // in mode (wheel is alays ionian)
    },
    musicalState__degrees: state => {
      return Key.degrees('' + state.musicalState.musicalKey + ' ' + state.musicalState.musicalMode + '');
    },
    musicalState__keyOffsetToC: state => {
      return semitones('C', state.musicalState.musicalKey);
    },
    musicalState__modeOffsetToC: state => {
      return modeOffsetInWheel(state.musicalState.musicalMode);
    },
    getGeneratedAttrForWheel: (state, getters) => {
      return generateAttrForWheel(
        getters.settingsBoolean.displayFourNoteChords.active,
        getters.musicalState__keyVisual,
        getters.musicalState__keyOffsetToC,
        getters.musicalState__mode,
      )
    },
    getWheelRotation: state => {
      return state.wheelRotation;
    }
  },
  mutations: {
    setAppMode: state => {
      state.appMode == 'progression'
        ? state.appMode = 'scale'
        : state.appMode = 'progression'
      localStorage.setItem('appMode', state.appMode)
    },
    setLanguage: (state, payload) => {
      state.settingsDropdown.appLanguage = payload;
    },
    setSettingsBoolean: (state, index) => {
      state.settingsBoolean[index].active = !state.settingsBoolean[index].active;
      localStorage.setItem(index, state.settingsBoolean[index].active)
    },
    setSettingsDropdown: (state, payload) => {
      state.settingsDropdown[payload.i].active = payload.val;
      localStorage.setItem(payload.i, payload.val)

      // handle language switch
      if (payload.i == 'appLanguage') {
        switchLanguage(payload.val)
      }

    },
    setFavoriteClef: (state, payload) => {
      state.favoriteClef = payload;
      localStorage.setItem('favoriteClef', payload)
    },
    setMusicalKey: (state, payload) => {
      state.musicalState.musicalKey = payload;
      localStorage.setItem('musicalKey', payload)
    },
    setVisualKey: (state, payload) => {
      state.musicalState.visualKey = payload;
      localStorage.setItem('visualKey', payload)
    },
    setMusicalMode: (state, payload) => {
      // state.musicalState.musicalMode = Key.relative(''+payload+'', ''+state.musicalState.musicalKey+' '+state.musicalState.musicalMode+'');
      state.musicalState.musicalMode = payload;
      localStorage.setItem('musicalMode', payload)
    },
    setWheelRotationKey: (state, payload) => {
      state.wheelRotation.key = payload;
      localStorage.setItem('wheelRotationKey', payload)
    },
    setWheelRotationKeyVisual: (state, payload) => {
      state.wheelRotation.keyVisual = payload;
      localStorage.setItem('wheelRotationKeyVisual', payload)
    },
    setWheelRotationMode: (state, payload) => {
      state.wheelRotation.mode = payload;
      localStorage.setItem('wheelRotationMode', payload)
    }
  },
  actions: {
    setAppMode: ({commit}) => {
      commit('setAppMode')
    },
    setLanguage: ({
      commit
    }, payload) => {
      commit('setLanguage', payload)
    },
    setSettingsBoolean: ({
      commit
    }, index) => {
      commit('setSettingsBoolean', index)
    },
    setSettingsDropdown: ({
      commit
    }, payload) => {
      commit('setSettingsDropdown', {
        i: payload.i,
        val: payload.val
      })
    },
    setFavoriteClef: ({
      commit
    }, payload) => {
      commit('setFavoriteClef', payload)
    },
    setMusicalKey: ({
      commit
    }, payload) => {
      commit('setMusicalKey', payload)
    },
    setVisualKey: ({
      commit
    }, payload) => {
      commit('setVisualKey', payload)
    },
    setMusicalMode: ({
      commit
    }, payload) => {
      commit('setMusicalMode', payload)
    },
    setWheelRotationKey: ({
      commit
    }, payload) => {
      commit('setWheelRotationKey', payload)
    },
    setWheelRotationKeyVisual: ({
      commit
    }, payload) => {
      commit('setWheelRotationKeyVisual', payload)
    },
    setWheelRotationMode: ({
      commit
    }, payload) => {
      commit('setWheelRotationMode', payload)
    }
  }
})
