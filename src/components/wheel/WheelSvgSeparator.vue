<template lang="html">
<svg class="posAbso rotateForModeChange" :style="{zIndex: level}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1154.7973 1154.7973">
  <g class="separators" ><line x1="275.7399" y1="658.2279" x2="94.4357" y2="706.8081" style="fill:none;stroke-miterlimit:10;stroke-width:2.5px"/><line x1="356.5388" y1="798.2585" x2="223.7253" y2="931.072" style="fill:none;stroke-miterlimit:10;stroke-width:2.5px"/><line x1="275.6984" y1="496.5583" x2="94.2717" y2="447.9452" style="fill:none;stroke-miterlimit:10;stroke-width:2.5px"/><line x1="496.5583" y1="879.0988" x2="447.9453" y2="1060.5256" style="fill:none;stroke-miterlimit:10;stroke-width:2.5px"/><circle id="hideThisLater" cx="577.3986" cy="577.3986" r="577.1304" style="fill:none;stroke-miterlimit:10;stroke-width:0.25px"/></g></svg>
</template>

<script>
export default {
  props:['level'],
}
</script>

<style lang="scss" scoped>
.separators {
  opacity:1;
  line {
      stroke: var(--color-bg);
  }
}
svg {
  z-index: 5;
  pointer-events: none;
  width: 600px;
  height: 600px;
}
</style>
