<template>
    <div class="playerDialog">
      <q-card>
        <q-linear-progress :value="0.6" color="pink" />

        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="col-4 playerBtn row">
                <q-btn class="btnPlay" :icon="playPause" @click="play()"/>
                <div class="text-grey">
                    <span class="animated">
                        É pra dormir no meio-fio e acordar urinado - Episódio 38
                    </span>
                </div>
                <audio
                id="audioTag"
                preload="none"
                ref="audioFile"
                :src="audio.src"
                />
            </div>

          </div>
        </q-card-section>
      </q-card>
    </div>
</template>
<script>
export default {
  name: 'PlayerBottom',
  props: ['audio'],
  data () {
    return {
      playPause: 'fas fa-play-circle'
    }
  },
  methods: {
    play () {
      this.playPause = 'fas fa-pause-circle'
      const audio = document.getElementById('audioTag')
      //  console.log('current time ' + this.audio.currentTime)
      audio.currentTime = this.audio.currentTime
      audio.play()
    }
  },
  created () {
    this.$root.$on('playAudio', (currentAudio) => {
      this.play()
    })
  }
}
</script>
<style scoped>

.btnPlay {
  background-image: url('https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_episode/4163723/4163723-1589233008922-1a95a6633a118.jpg');
  background-size: auto;
  background-repeat: no-repeat;
  background-size: 100px 100px;
  color: #f2f2f2;
  font-size: 15pt;
  width: 60x;
  height: 60px;
  overflow:hidden;
  z-index: 1;
}
.animated {
    position: absolute;
    animation: mymove 5s infinite;
    margin-right:0px;
    width: 11rem;
    white-space: nowrap;
}
@keyframes mymove {
  from {right: 0px;}
  to {right: 200px;}
}
</style>
