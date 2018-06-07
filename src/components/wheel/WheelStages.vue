<template lang="html">
  <div class="stages centerInWheel rotateForModeChange" :style="{zIndex: level}">
    <div class="stage" v-for="(stage,index) in 7" :class="['stage'+Math.floor(index+1)]">
    </div>
  </div>
</template>

<script>
import * as Key from "tonal-key"

export default {
  props:['level'],
}
</script>

<style lang="scss">
</style>
