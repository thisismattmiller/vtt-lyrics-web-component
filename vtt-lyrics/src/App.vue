<script>
import VttLyrics from './components/VttLyrics.ce.vue'


export default {
  components: {
    VttLyrics, 
  },

  props: {

  },

  methods: {


  }
}


</script>

<template>
  <div style="width: 25%;">

   <VttLyrics highlight="father" vtt="http://localhost:8333/afc1939007_afs02276b.wav.vtt" audio="http://localhost:8333/afc1939007_afs02276b.mp3"/>
  </div>
</template>

<style scoped>

</style>
