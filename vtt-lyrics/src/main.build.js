import { defineCustomElement } from 'vue'
import VttLyrics from './components/VttLyrics.ce.vue'

const VTT = defineCustomElement(VttLyrics)

customElements.define('vtt-lyrics', VTT)