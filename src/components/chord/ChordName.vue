<template lang="html">
  <div class="chordName" :class="[{chordIsMinor: baseMinorCheck(chordstructure)}]">
    <div class="chordLetter" v-if="name">
      {{ checkNoteName(name) }}
    </div>
    <div class="chordSignature sharp" v-if="checkSharpIcon(name)">
      <app-staff-sharp-icon />
    </div>
    <div class="chordSignature flat" v-if="checkFlatIcon(name)">
      <app-staff-flat-icon />
    </div>

    <div class="chordSignature doubleFlat" v-if="checkDoubleFlatIcon(name)">
      bb
    </div>

    <div class="chordSignature doubleSharp" v-if="checkDoubleSharpIcon(name)">
      <app-staff-double-sharp-icon/>
    </div>

    <div class="chordSex" v-if="stage">
      <div class="chordType minor" v-if="minorIcon(chordstructure)">m</div>
      <div class="chordType aug" v-if="augIcon(chordstructure)">aug</div>
      <div class="chordType dimHalf" v-if="dimHalfIcon(chordstructure)">
        <app-staff-dim-half-icon />
      </div>
      <div class="chordType dimFull" v-if="dimFullIcon(chordstructure)">
        <app-staff-dim-full-icon />
      </div>
      <div class="chordType maj7" v-if="maj7Icon(chordstructure)">
        <app-staff-maj-icon />
      </div>
      <div class="chordType dom7" v-if="dom7Icon(chordstructure) || minor7Icon(chordstructure)">7</div>
    </div>
  </div>
</template>

<script>
// README
// expects name as 'C#'
// expects chordstructure as '1P 3m 5P 7m ...'
// expects stage as 'stage1' or 'offStage'

import StaffSharpIcon from '../icons/StaffSharpIcon.vue';
import StaffDoubleSharpIcon from '../icons/StaffDoubleSharpIcon.vue';
import StaffFlatIcon from '../icons/StaffFlatIcon.vue';
import StaffMajIcon from '../icons/StaffMajIcon.vue';
import StaffDimHalfIcon from '../icons/StaffDimHalfIcon.vue';
import StaffDimFullIcon from '../icons/StaffDimFullIcon.vue';
import {
  mapGetters
} from 'vuex';
export default {
  props: ['name', 'stage', 'chordstructure','pos'],
  data() {
    return {
    }
  },
  computed:{
    ...mapGetters([
      'settingsBoolean',
    ]),
  },
  components:{
    appStaffSharpIcon: StaffSharpIcon,
    appStaffDoubleSharpIcon: StaffDoubleSharpIcon,
    appStaffFlatIcon: StaffFlatIcon,
    appStaffMajIcon: StaffMajIcon,
    appStaffDimHalfIcon: StaffDimHalfIcon,
    appStaffDimFullIcon: StaffDimFullIcon,
  },
  methods: {
    checkNoteName(note) {
      if (this.settingsBoolean.germanNoteNames.active && note.charAt(0) == 'B' && note.charAt(1) != 'b') {
        return 'H';
      } else {
        return note.charAt(0);
      }
    },
    checkFlatIcon(note) {
      if (this.settingsBoolean.germanNoteNames.active && note == 'Bb' || note.charAt(2) == 'b') {
        return false
      } else if( note.charAt(1) == 'b' ){
        return true;
      }
    },
    checkDoubleFlatIcon(note) {
      if (note.charAt(2) == 'b' ){
        return true;
      }
    },
    checkSharpIcon(note) {
      if (note.charAt(2) == '#') {
        return false
      } else if( note.charAt(1) == '#' ){
        return true;
      }
    },
    checkDoubleSharpIcon(note) {
      if (note.charAt(2) == '#') {
        return true
      }
    },
    baseMinorCheck(i) {
      return i[1] == '3m' ? true : false;
    },
    augIcon(i) {
      return i[1] == '3M' && i[2] == '5A' ? true : false;
    },
    minorIcon(i) {
      return i[1] == '3m' && i[2] == '5P' ? true : false;
    },
    minor7Icon(i) {
      return i[1] == '3m' && i[2] == '5P' && i[3] == '7m' ? true : false;
    },
    dimHalfIcon(i) {
      return i[1] == '3m' && i[2] == '5d' && i[3] == '7m' ? true : false;
    },
    dimFullIcon(i) {
      return i[1] == '3m' && i[2] == '5d' && i[3] != '7m' ? true : false;
    },
    maj7Icon(i) {
      return i[3] == '7M' ? true : false;
    },
    dom7Icon(i) {
      return i[1] == '3M' && i[2] == '5P' && i[3] == '7m' ? true : false;
    },
  }
}
</script>

<style lang="scss">
</style>
