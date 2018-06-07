<template lang="html">
<div id="grabber" :style="{zIndex: level}">
  <div id="wheelChords" class="wheelChords centerInWheel">
    <div
    v-for="(chord,index) in 12"
    @click="tapChordInWheel(
      wheelGeneratedAttr.stageStore[index],
      wheelGeneratedAttr.chordName[index],
      wheelGeneratedAttr.chordsStructureNames[index],
      wheelGeneratedAttr.chordsStructureIntervals[index])"
    class="chord"
    :class="['pos'+Math.floor(index+1), wheelGeneratedAttr.stageStore[index]]">

      <app-chord-name
        :name="wheelGeneratedAttr.chordName[index]"
        :stage="wheelGeneratedAttr.stageStore[index]"
        :chordstructure="wheelGeneratedAttr.chordsStructureIntervals[index]"/>

    </div>
  </div>
</div>
</template>

<script>
import ChordName from '../chord/ChordName.vue';
import {generateAttrForWheel} from '../../functions/generateAttrForWheel';

import {
  mapGetters,
} from 'vuex';
import {
  TweenMax,
} from 'gsap';
import {
  timings,
  easings,
} from '../../vars';
import * as Sounds from '../../functions/sounds';
import * as StartAudioContext from 'startaudiocontext';

export default {
  props: ['level'],
  components: {
    appChordName: ChordName
  },
  data() {
    return {
      wheelGeneratedAttr: {}, // will be set beforeMount and then on drag and via watcher
    }
  },
  computed: {
    ...mapGetters([
      'getGeneratedAttrForWheel',
      'getWheelRotation',
      'appMode',
      'settingsBoolean'
    ]),
  },
  watch: {
    getGeneratedAttrForWheel: {
      handler:function () {
        this.wheelGeneratedAttr = this.getGeneratedAttrForWheel;
      },
    }
  },
  methods: {
    tapChordInWheel(stage,chordName,chordsStructureNames,chordsStructureIntervals){

      if (stage && this.settingsBoolean.playbackChordOnTap.active) {

        StartAudioContext(Sounds.context).then(function(){
          // console.log("context started")
        })

        // play chord with sampler
        Sounds.sampler.triggerAttackRelease(Sounds.makeTonalPlayable(chordsStructureNames,3,true), "2n");

        // animate wobbling of chord on tap
        TweenMax.set('#wheelContainer .'+stage+'',{
          transformOrigin:'center',
          scale:.86,
          force3D:true,
          onComplete(){
            TweenMax.to(
              '#wheelContainer .'+stage+'',
              timings.chordPlaybackWobble,
              {
                scale:1,
                ease:easings.chordPlaybackWobble
              })
          }
        })


        // // same issue with synth sounds (though a little bit less)
        // Sounds.synth.triggerAttackRelease(Sounds.makeTonalPlayable(chordsStructureNames,3,true), 3);

        // // same problem with explicit tones (no use of makeTonalPlayable())
        // Sounds.synth.triggerAttackRelease(['C2','C3','E3','G3','B3','E4'], 3);


      }
    },
  },
  beforeMount(){
      // set wheel attrs for the first time
      this.wheelGeneratedAttr = this.getGeneratedAttrForWheel;
  },
}
</script>

<style lang="scss">

</style>
