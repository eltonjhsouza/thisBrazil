<template>
    <div class="q-ma-sm">
      <q-card v-for="item in audiosZAP" :key="item.item" class="q-ma-sm">
          <q-card-section>
              <div class="text-subtitle2">Estevão Ferreira andando a cavalo</div>
              <div class="text-grey"><q-icon name="fas fa-calendar"/> 21/01/2021</div>
          </q-card-section>
          <!-- <div class="row"> -->
          <!-- <q-card-section avatar>
                <q-avatar color="teal" text-color="white" icon="fas fa-play" />
          </q-card-section> -->
              <!-- <q-item-section> -->
                <div class="row q-ma-sm">
                  <div class="q-ma-md">
                    <audio
                    id="audioTag"
                    preload="none"
                    ref="audioFile"
                    :src="audiomp3"
                    />
                    <q-btn
                    size="sm"
                    class="btnPlay"
                    round
                    dense
                    color="positive"
                    >
                      <q-icon name="play_arrow" />
                  </q-btn>
                  </div>
                  <div class="q-ma-md">
                    <span class="text-grey timer">00:00 / 05:00</span>
                  </div>
                <div class="q-ma-sm">
                  <q-slider
                    v-model="time"
                    :min="0"
                    :max="parseInt(duration)"
                    :step="0.1"
                    color="green"
                    style="width:30%"
                  />
                </div>
                </div>
                <!-- <q-input id="seekslider" @change="seekRange($event)" type="range" min="0" max="100" step="1" :value="sources[0].currentTime" color="pink" /> -->
              <!-- </q-item-section> -->
          <!-- </div> -->
          <q-card-section class="q-gutter-sm">
            <q-icon name="fas fa-download" class="text-grey iconVol" />
            <q-icon name="share" class="text-grey iconVol"/>
          </q-card-section>
      </q-card>
    </div>
</template>
<script>
// import axios from 'axios'
import { QCard, QIcon } from 'quasar'

export default {
  name: 'AudiosZap',
  components: {
    QCard,
    QIcon
  },
  data () {
    return {
      time: 1.50,
      duration: Number,
      audiomp3: '',
      audiosZAP: []
    }
  },
  methods: {
    getAudios () {
      this.audiosZAP = [
        {
          id: 0,
          name: 'Audio 1'
        },
        {
          id: 1,
          name: 'Audio 2'
        },
        {
          id: 2,
          name: 'Audio 3'
        },
        {
          id: 3,
          name: 'Audio 4'
        }
      ]
    }
  },
  created () {
    this.getAudios()
    // axios.get('https://audiodozap.com.br/page-data/index/page-data.json').then(response => {
    //   console.log(response)
    // })
  }
}
</script>
<style scoped>
.btnPlay {
  max-height: 30px;
  max-width: 30px;
}
.timer {
  font-size: 10px;
}
</style>
