<template>
    <div class="playerDialog row">
      <div class="primeira col-3" :style="{'background-image': 'url('+bgImage+')'}">
        <span>teste</span>
      </div>
      <div class="segunda col-6">
          <div class="text-grey col">
                <span class="animated" style="margin-top: 20px">
                    {{ title }}
                </span>
              <div class="q-ma-sm" style="margin-bottom: 0px">
                <span  >
                    {{ duration }}
                </span>
              </div>
            </div>
      </div>
      <div class="terceira row">
        <div class="sharebtn">
          <q-icon name="share" />
        </div>
        <div class="playbtn">
          <audio
          id="audioTag"
          autoplay
          ref="audioFile"
          :src="audiomp3"
          />
          <q-icon :name="playPause" @click="play()"/>
        </div>
      </div>
      <!-- <q-card>
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
      </q-card> -->
    </div>
</template>
<script>
// function generateOptions (element) {
//   return {
//     audio: element.audio,
//     duration: element.duration,
//     title: element.title
//   }
// }

export default {
  name: 'PlayerBottom',
  props: ['audio'],
  data () {
    return {
      imgStyle: 'background-color: #ffffff',
      bgImage: 'https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_episode/4163723/4163723-1589233008922-1a95a6633a118.jpg',
      title: '',
      duration: 0,
      time: '',
      audiomp3: '',
      playPause: 'play_arrow'
    }
  },
  methods: {
    play (currentAudio) {
      this.audiomp3 = currentAudio
      const audio = document.getElementById('audioTag')
      if (audio.paused) {
        console.log('play')
        try {
          audio.play()
          this.isPlaying = true
          this.playPause = 'fas fa-pause-circle'
          audio.addEventListener('canplaythrough', () => {
            audio.addEventListener(
              'timeupdate',
              () => {
                this.time = audio.currentTime
                localStorage.currentTime = this.time
                console.log(this.time)
              },
              false
            )
          })
          localStorage.audio = audio.src
          localStorage.playing = true

          audio.addEventListener('error', (error) => {
            console.log(error)
            // self.loadingFiles = false
            const exception = error.message || error
            console.log(exception)
          })

          audio.addEventListener('ended', () => {
            console.log('ended')
            // console.log(self.repeat_audio)
            // if (self.repeat_audio) {

            // }
            this.selectedMediaFile.currentTime = 0
            audio.currentTime = 0
            audio.play()
          })
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log('pause')
        this.playPause = 'fas fa-play-circle'
        audio.pause()
      }
    },
    keepPlaying (currentAudio) {
      this.audiomp3 = currentAudio
      const audio = document.getElementById('audioTag')
      if (audio.paused) {
        console.log('play')
        try {
          audio.play()
          this.isPlaying = true
          this.playPause = 'fas fa-pause-circle'
          audio.addEventListener('canplaythrough', () => {
            audio.addEventListener(
              'timeupdate',
              () => {
                this.time = audio.currentTime
                localStorage.currentTime = this.time
                console.log(this.time)
              },
              false
            )
          })
          localStorage.audio = audio.src
          localStorage.playing = true

          audio.addEventListener('error', (error) => {
            console.log(error)
            // self.loadingFiles = false
            const exception = error.message || error
            console.log(exception)
          })

          audio.addEventListener('ended', () => {
            console.log('ended')
            // console.log(self.repeat_audio)
            // if (self.repeat_audio) {

            // }
            this.selectedMediaFile.currentTime = 0
            audio.currentTime = 0
            audio.play()
          })
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log('pause')
        this.playPause = 'fas fa-play-circle'
        audio.pause()
      }
    }
  },
  created () {
    this.$root.$on('play', (currentAudio, data) => {
      this.title = data.title
      this.duration = data.duration
      this.bgImage = data.img
      this.play(currentAudio.src)
    })
    this.$root.$on('keepPlay', (cAudio) => {
      this.audiomp3 = cAudio
      this.keepPlaying(cAudio)
      console.log('cAudio')
      console.log(cAudio)
    })
  },
  computed: {
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
    position: relative;
    animation: mymove 5s infinite;
    margin-right:0px;
    width: 11rem;
    white-space: nowrap;
}
@keyframes mymove {
  from {right: 0px;}
  to {right: 200px;}
}
.playerDialog {
  background-color: black;
  height: 70px;
  display: flex;
}
.primeira {
  background-size: auto;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
}
.segunda {
  background-color: rgb(85, 32, 32);
  /* width: 33.3%; */
  height: 100%;
}
.terceira {
  background-color: rgb(0, 248, 12);
  /* width: 33.3%; */
  height: 100%;
}

@media (max-width: 640px) {

.primeira {
  background-size: auto;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 20%;
  height: 100%;
  z-index: 4;
}
.segunda {
  background-color: rgb(255, 255, 255);
  width: 55%;
  height: 100%;
}
.terceira {
  background-color: rgb(109, 5, 5);
  width: 25%;
  height: 100%;
  z-index: 4;
}
.playbtn {
  display: flex;
  margin: 5px;
  font-size: 300%;
  align-items: center;
}
.sharebtn {
  display: flex;
  width: 50%;
  margin-left: 10%;
  font-size: 35px;
  align-items: center;
}

}

@media (max-width: 360px) {
.playbtn {
  display: flex;
  font-size: 35px;
  align-items: center;
}
.sharebtn {
  display: flex;
  width: 35%;
  margin-left: 10px;
  font-size: 20px;
  align-items: center;
}
}
</style>
