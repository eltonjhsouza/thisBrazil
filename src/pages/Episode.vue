<template>
<div class="q-pa-md">
   <div class="player">
    <div class="row q-mt-md">
    <audio
      id="audioTag"
      preload="none"
      ref="audioFile"
      :src="audiomp3"
      />
       <div class="col-4 playerBtn">
        <q-btn class="btnPlay" :icon="playPause" @click="open('bottom')" />
       </div>
        <div class="col-8">
          <div class="text-weight-bold">{{ titleEpisode }}</div>
          <div class="text-grey"><q-icon name="fas fa-calendar"/> {{ datePubEpisode }}</div>
          <div class="text-grey">{{ secForMin(time) }} / {{ secForMin(duration) }}</div>
          <div class="text-grey">
            <q-icon name="volume_up" class="iconVol" @click="sliderVol = true"/>
            <q-icon name="share" class="iconVol"/>
          </div>
          <q-slider
            v-model="time"
            :min="0"
            :max="parseInt(duration)"
            :step="0.1"
            @change="progressAudio(time)"
            color="green"
            style="width:80%"
          />
        </div>
     </div>

   </div>
   <div class="q-ma-md">
   </div>

    <div class="audios">
      <span>Audios do zap</span>
    </div>
      <AudiosZap />
    <q-dialog v-model="sliderVol">
      <q-card style="width: 300px" class="q-px-sm q-pb-md">
        <q-card-section>
          <div class="text-h6"></div>
        </q-card-section>
        <q-item dense>
          <q-item-section avatar>
            <q-icon name="volume_up" />
          </q-item-section>
          <q-item-section>
          <q-slider
            v-model="vol"
            @change="volume"
            :min="0"
            :max="100"
            label
            color="teal"
          />
          </q-item-section>
        </q-item>
      </q-card>
    </q-dialog>
</div>
</template>

<script>
import AudiosZap from './components/AudiosZap'
import { date } from 'quasar'

export default {
  components: {
    AudiosZap
  },
  data () {
    return {
      seekslider: '',
      seeking: false,
      imageSrc: '',
      sliderVol: false,
      vol: 100,
      dialog: false,
      position: 'top',
      sources: [{
        src: '',
        type: 'audio/mp3',
        currentTime: 0
      }],
      time: 0,
      audiomp3: '',
      titleEpisode: '',
      datePubEpisode: '',
      duration: 0,
      playPause: 'fas fa-play-circle',
      objEpsisode: {},
      slide: 'style',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
    }
  },
  methods: {
    goToEpsodes () {
    //   this.$router.push({ name: 'episodes' })
      console.log('episode')
    },
    open (position) {
      this.position = position
      this.dialog = true
      this.play()
    },
    play () {
      const audio = document.getElementById('audioTag')

      if (audio.paused) {
        console.log('play')
        audio.play()
        this.isPlaying = true
        this.playPause = 'fas fa-pause-circle'
        audio.addEventListener('canplaythrough', () => {
          audio.addEventListener(
            'timeupdate',
            () => {
              this.sources.currentTime = audio.currentTime
              // console.log(this.sources.currentTime)
              this.time = this.sources.currentTime
            },
            false
          )
        })

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
      } else {
        console.log('pause')
        this.playPause = 'fas fa-play-circle'
        audio.pause()
      }
    },
    seekRange (event) {
      // TODO addEventListener está dando null, tem que ver o que ta pegando
      this.seekslider = document.getElementById('seekslider')
      this.seekslider.addEventListener('mousedown',
        function (event) {
          this.seeking = true
          this.seek(event)
        })

      console.log(this.seekslider.value)
      this.seekslider.addEventListener('mousemove', function (event) { this.seek(event) })
      this.seekslider.addEventListener('mouseup', function () { this.seeking = false })
    },
    seek (event) {
      const audio = document.getElementById('audioTag')
      if (this.seekslider) {
        this.seekslider.value = event.clientX - this.seseeksliderek.offsetleft
        var seekto = audio.duration * (this.seekslider.value / 100)
        audio.currentTime = seekto
        console.log(audio.currentTime)
        // this.sources.currentTime = audio.currentTime
      }
    },
    progressAudio (time) {
      const audio = document.getElementById('audioTag')
      audio.currentTime = time
      console.log(audio.currentTime)
    },
    volume () {
      const audio = document.getElementById('audioTag')
      audio.volume = this.vol / 100
    },
    secForMin (val) {
      const sec = val
      const min = sec / 60
      return min.toFixed(2)
    },
    countDown (val) {
      // for(const init=0, init <= )
    },
    captureImage () {
      navigator.camera.getPicture(
        data => { // on success
          this.imageSrc = `data:image/jpeg;base64,${data}`
        },
        () => { // on fail
          this.$q.notify('Could not access device camera.')
        },
        {
          // camera options
        }
      )
    }
  },
  created () {
    // const _duration = 'itunes:duration'
    // const img = itunes:image'
    this.sources.src = this.$route.params.episode
    // console.log(this.$route.params)
    var objEpsisode = {
      url: this.$route.params.episode.enclosure._attributes.url,
      // size: this.$route.params.episode.enclosure._attributes.length,
      // description: this.$route.params.episode._description._cdata
      duration: this.$route.params.episode['itunes:duration']._text,
      // img: this.$route.params.episode['itunes:image']._attributes.href,
      title: this.$route.params.episode.title._cdata,
      dataPub: this.$route.params.episode.pubDate._text
    }
    this.audiomp3 = objEpsisode.url
    this.titleEpisode = objEpsisode.title
    this.datePubEpisode = objEpsisode.dataPub
    this.duration = objEpsisode.duration
    this.datePubEpisode = date.formatDate(this.datePubEpisode, 'DD-MM-YY')
    console.log('OBJ')
    console.log(objEpsisode.url)
    console.log(objEpsisode.dataPub)
    console.log(objEpsisode.title)
    console.log(objEpsisode.duration)
    console.log(this.$route.params.episode)
  }
  // watch: {
  //   currentTime (val) {
  //     this.time = val
  //   }
  // }
}
</script>

<style scoped>
.slider {
    background-color: black;
    width: 90vw;
    /* height: 100px; */
}
.card-epsodes {
    width: 90vw;
}
.player {
  width: 90vw;
  height: 20%;
  background-color: #f2f2f2;
}
.playerBtn {
margin-top: 1.5%;
}
.btnPlay {
  background-image: url('https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_episode/4163723/4163723-1589233008922-1a95a6633a118.jpg');
  background-size: auto;
  background-repeat: no-repeat;
  background-size: 300px 100px;
  color: #f2f2f2;
  font-size: 20pt;
  width: 100px;
  height: 100px;
}
.lstAudios {
  width: 100%;
}
.iconVol {
  font-size: 25px;
}
</style>
