<template>
<div class="q-pa-md row items-start q-gutter-md">
    <div class="slider">
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="300px"
        class="bg-primary text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="style" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="layers" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="terrain" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <!-- <div v-for="item in lstEpsodes" class="episodes" :key="item.img">
    <q-card class="card-epsodes" clickable @click="goToEpsodes">
      <q-parallax
        src=""
        :height="150"
      />
      <p>{{ item }} </p>

      <q-card-section>
        <div class="text-h6">{{ item.itunes:image._attributes }}</div>
        <div class="text-h6">{{ item.description }}</div>
        <div class="text-nottrack">{{ item }}</div>
      </q-card-section>
    </q-card>
    </div> -->
    <div v-for="item in lEpsodes" :key="item.title" class="episodes" >
    <!-- <q-card class="card-epsodes" clickable @click="goToEpsodes(item.enclosure._attributes.url)"> -->
    <q-card class="card-epsodes" clickable @click="goToEpsodes(item)">
      <q-img
        :src="item['itunes:image']._attributes.href"
        basic
      />

      <q-card-section>
        <div class="text-h6">{{ item.title._cdata }}</div>
        <div class="row q-gutter-sm">
        <div class="text-grey"><q-icon name="fas fa-calendar"/> {{ date.formatDate(item.pubDate._text, 'DD-MM-YYYY') }}</div>
        <div class="text-grey"><q-icon name="fas fa-clock"/> {{ secForMin(item['itunes:duration']._text) + ' min' }}</div>
        </div>
      </q-card-section>
    </q-card>
    </div>
    <!-- <div class="episodes" >
    <q-card class="card-epsodes" clickable @click="goToEpsodes">
      <q-parallax
        :src="lstEpsodes.img"
        :height="150"
      />

      <q-card-section>
        <div class="text-h6">{{ lstEpsodes.title._cdata }}</div>
        <div class="text-subtitle2">{{ lstEpsodes.pubDate }}</div>
        <div class="text-subtitle2">{{ lEpsodes }}</div>
      </q-card-section>
    </q-card>
    </div> -->
<!--
    <div class="episodes">
    <q-card class="card-epsodes" clickable @click="goToEpsodes">
      <q-parallax
        src="https://d3t3ozftmdmh3i.cloudfront.net/production/podcast_uploaded_episode400/4163723/4163723-1586574721221-2024f083916f1.jpg"
        :height="150"
      />

      <q-card-section>
        <div class="text-h6">Ep #03 - Por isso que ninguém oferece mais balinha</div>
        <div class="text-subtitle2">Postado Apr 12, 2020</div>
      </q-card-section>
    </q-card>
    </div> -->
</div>
</template>

<script>
import axios from 'axios'
import { date } from 'quasar'

export default {
  data () {
    return {
      date: date,
      xmlContent: null,
      xmlError: false,
      lstEpsodes: {},
      lEpsodes: [],
      episode: [],
      slide: 'style',
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
    }
  },
  methods: {
    goToEpsodes (episode) {
      // const episode = item
      this.$router.push({ name: 'episode', params: { episode: episode } })
      // console.log(ulrAudio)
    },
    loadData () {
      const self = this
      this.xmlContent = null
      this.xmlError = false
      self.lstEpsodes = this.lstEpsodes
      // const self = this
      axios.get('https://anchor.fm/s/1969eccc/podcast/rss').then(response => {
        this.xmlContent = response.data
        var convert = require('xml-js')
        var result1 = convert.xml2json(this.xmlContent, { compact: true, spaces: 4 })
        const myObjStr = JSON.parse(result1)
        console.log('Obj')
        console.log(myObjStr.rss.channel.item)
        this.lEpsodes = myObjStr.rss.channel.item
        var img = 'itunes:image'
        var duration = 'itunes:duration'
        // var episode = 'itunes:episode'
        var summary = 'itunes:summary'
        const episode = []
        myObjStr.rss.channel.item.forEach(element => {
          episode.description = element.description
          episode.media = element.enclosure._attributes.url
          episode.img = element[img]._attributes.href
          episode.duration = element[duration]._text
          episode.summary = element[summary]
          episode.title = element.title
          episode.pubDate = element.pubDate._text
          // episode.episode = element[episode]
          self.lstEpsodes = episode
        })
        console.log('self.lstEpsodes')
        console.log(self.lstEpsodes)
        // console.log(episode)
      }, () => {
        this.xmlError = true
      })
    },
    secForMin (val) {
      const sec = val
      const min = sec / 60
      return min.toFixed(2)
    }
  },
  created () {
    this.loadData()
  },
  mounted () {

  }
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

</style>
