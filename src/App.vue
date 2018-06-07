<template>
<div id="app" :class="[musicalState__mode]">
  <app-wheel />
</div>
</template>

<script>
import {
  TweenMax,
} from 'gsap';
import Wheel from './components/wheel/Wheel.vue';
import {resizeWheel} from './functions/resizeWheel';
import * as Sounds from './functions/sounds';
import {
  getColorCodes
} from './vars.js';


import {
  timings,
  easings,
  opcaity
} from './vars';
import {
  mapGetters
} from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapGetters([
      'appLanguage',
      'musicalState__mode',
      'settingsBoolean',
      'appMode',
    ]),
  },
  components: {
    appWheel: Wheel,
  },
  methods: {

  },
  beforeMount() {
    getColorCodes() // get colors onload
  },
  mounted() {
    resizeWheel(false)
  }
}
</script>

<style lang="scss">
@import './styles/vars.scss';
@import './styles/fonts.scss';
@import './styles/reset.scss';
@import './styles/keysAndModes.scss';
@import './styles/main.scss';

#app {
    background: var(--color-bg);
}
</style>
