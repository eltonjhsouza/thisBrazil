<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <div class="backArrow">
        <q-btn v-show="this.$route.path !== '/' && this.$route.path !== '/episodes'" flat @click="$router.go(-1)" round dense icon="fas fa-arrow-left" />
        </div>
        <div class="toolbar-class">
        <q-toolbar-title >
          This Brazil
        </q-toolbar-title>
        </div>

        <div class="search">
        <q-input dark borderless class="q-ml-sm">
          <template v-slot:append>
            <q-icon  name="search" />
          </template>
        </q-input>
        </div>
      </q-toolbar>
    </q-header>

     <!-- <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="200"
        :breakpoint="400"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>

              <q-item-section>
                Inbox
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple @click="goToEpsodes">
              <q-item-section avatar>
                <q-icon name="library_music" />
              </q-item-section>

              <q-item-section>
                Epsisodios
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section>
                Send
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Drafts
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Razvan Stoenescu</div>
            <div>@rstoenescu</div>
          </div>
        </q-img>
      </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated >
    <q-dialog class="playerDialog1" seamless position="bottom">

    </q-dialog>
    <PlayerBottom v-show="playerDialog" :audio="playAudio" />
      <q-toolbar>
        <q-toolbar-title>
          <q-tabs
            v-model="tab"
            dense
            align="justify"
          >
            <q-tab class="text-white" name="epsode" icon="library_music" no-caps :label="lblName1" @click="goToEpsodes"/>
            <q-tab class="text-white" name="apps" icon="fas fa-plus-circle" :label="lblName2" />
            <q-tab class="text-white" name="about" icon="fas fa-question-circle" :label="lblName3" />
          </q-tabs>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import PlayerBottom from 'src/pages/components/Player-Bottom'
import {
  QTabs,
  QTab
} from 'quasar'

export default {
  name: 'MainLayout',
  components: {
    QTabs,
    QTab,
    PlayerBottom
  },
  data () {
    return {
      playAudio: {},
      lblName1: '',
      lblName2: '',
      lblName3: '',
      playerDialog: false,
      tab: 'mails',
      leftDrawerOpen: false
    }
  },
  methods: {
    goToEpsodes () {
      this.$router.push({ name: 'episodes' })
      console.log(this.tab)
    }
  },
  created () {
    console.log(this.$route.path)
    this.$root.$on('playAudio', (currentAudio, data) => {
      this.playerDialog = true
      console.log('recebi o audio e abri o player')
      this.$root.$emit('play', currentAudio, data)
    })
  },
  mounted () {
    console.log(this.$route.path)
    this.lblName1 = 'Episódios'
    // if (this.$route.path !== '/episode') {
    //   console.log('Diferente')
    //   if (localStorage.getItem('playing')) {
    //     console.log('Is Playing')
    //     // console.log(localStorage.getItem('currentTime'))
    //     // const cAudio = {
    //     //   src: localStorage.getItem('audio'),
    //     //   curTime: localStorage.getItem('currentTime')
    //     // }
    //     this.$root.$emit('keepPlay', localStorage.getItem('audio'))
    //   }
    // }
  }
}
</script>
<style scoped>
.toolbar-class {

}
.search {
  margin-right: 0px;
}
.backArrow {
  width: 15%;
}

</style>
