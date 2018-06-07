<template lang="html">
<svg class="posAbso rotateForModeChange" :style="{zIndex: level}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1154.7973 1154.7973">

        <path v-if="musicalState__mode === 'lydian'" d="M94.4357,706.8081c71.5291,266.95,345.4222,425.0825,612.3725,353.5534L658.2277,879.0574c-166.6014,44.6405-337.8469-54.2281-382.4878-220.83-28.4732-106.2639,1.4461-214.41,70.0782-290.394l-132.92-132.92C98.4956,356.8185,47.9383,533.2768,94.4357,706.8081Z" />

        <path v-else-if="musicalState__mode === 'locrian'" d="M223.8453,930.9521c127.0354,127.0352,305.1344,171.48,467.9094,133.354L643.1029,882.7345c-100.122,21.4474-208.7414-6.7143-286.5337-84.5063-121.9607-121.9609-121.9607-319.6982,0-441.659L223.8453,223.8452C28.4241,419.2665,28.4243,735.531,223.8453,930.9521Z"/>

        <path v-else d="M658.2277,879.0573c-166.6013,44.6407-337.8469-54.228-382.4878-220.83-29.9152-111.6456,4.6238-225.371,80.7989-301.6889L223.7253,223.7252C101.7221,345.8642,46.4958,527.8935,94.4357,706.8081c71.5291,266.95,345.4222,425.0825,612.3726,353.5534L658.2277,879.0573Z" />

        <circle class="hideThisLater" cx="577.3986" cy="577.3986" r="577.1304" style="fill:none;stroke:#252f39;stroke-miterlimit:10;stroke-width:0.25px"/>
      </svg>
</template>

<script>
import {
  mapGetters,
} from 'vuex';
export default {
  props:['level'],
  computed:{
    ...mapGetters([
      'musicalState__mode',
    ]),
  },
}
</script>

<style lang="scss" scoped>

path {
    fill: var(--color-bg-minus-1);
}
svg {
  pointer-events: none;
  opacity:.8;
  width: 600px;
  height: 600px;
}
</style>
