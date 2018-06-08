<template lang="html">
  <div id="wheelContainer" class="wheelContainer">
    <app-wheel-svg-decker :level="6"/>
    <app-wheel-chords :level="4"/>
    <app-wheel-svg-root :level="3"/>
    <app-wheel-stages :level="2"/>
    <app-wheel-svg :level="1"/>
    <app-wheel-svg-decker :level="0"/>
    <div class="startAudioContext label" @click="startAudioContextManually">
      Start Audio Context manually
    </div>
  </div>
</template>

<script>
import WheelSvg from './WheelSvg.vue';
import WheelChords from './WheelChords.vue';
import WheelSvgDecker from './WheelSvgDecker.vue';
import WheelSvgRoot from './WheelSvgRoot.vue';
import WheelSvgSeparator from './WheelSvgSeparator.vue';
import WheelStages from './WheelStages.vue';
import * as Sounds from '../../functions/sounds';
import * as StartAudioContext from 'startaudiocontext';
import {
  setMusicalMode
} from '../../functions/setMusicalMode';
import {
  resizeWheel
} from '../../functions/resizeWheel';
import {
  TweenMax,
} from 'gsap';

export default {
  components: {
    appWheelSvg: WheelSvg,
    appWheelChords: WheelChords,
    appWheelSvgDecker: WheelSvgDecker,
    appWheelSvgSeparator: WheelSvgSeparator,
    appWheelSvgRoot: WheelSvgRoot,
    appWheelStages: WheelStages,
  },
  methods:{
    startAudioContextManually() {
      StartAudioContext(Sounds.context).then(function(){
        console.log("context started")
      })
    }
  },
  computed: {

  },
  mounted() {
    // set rotation to saved position
    setMusicalMode(this, this.$store.getters.musicalState__mode, false)

    // handle resizing
    window.addEventListener('resize', () => {
      resizeWheel(false)
    });

  }
}
</script>

<style lang="scss">
.wheelContainer {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    &:after {
        content: "";
        display: block;
        width: 100%;
        padding-bottom: 100%;
    }
}

.startAudioContext {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(100%);
  text-align: center;
  background:var(--color-bg-plus-2);
  padding: 10px;
  border-radius: 3px;
  z-index: 999;
  white-space: nowrap;
  color: var(--color-font-3);
}
</style>
