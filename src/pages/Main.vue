<template>
  <div class="main">
      <header id="indexHeader">
        <h1><img src="/static/img/logo.png" width="240" alt="한국은행">222</h1>
        <!--<h2>데이터 분석반 BokReIT</h2>-->
        <div class="searchLine">
          <form v-on:submit.prevent="clickSearch">
            <input type="text" placeholder="검색어를 입력해 주세요." v-model="searchKeyword">
            <button type="button" @click="clickSearch"><img src="/static/img/ico_search.png" alt="검색"></button>
          </form>
        </div>
    </header>
    
    <section id="contents">
        <div class="contents_box">
            <ul class="indexMenu">
                <li><router-link to="/timeseries-hub">Timeseires<span>Hub</span></router-link></li>
                <li><router-link to="/microdata-hub">Microdata<span>Hub</span></router-link></li>
                <li><a href="#">Graph<span>Hub</span></a></li>
                <li><a href="#">Reference<span>Hub</span></a></li>
            </ul>
        </div>
    </section>

    <transition name="fade">
      <search v-if="showSearch" :keyword="keyward" />
    </transition>


  </div>
</template>

<script>

import Search from '../components/Search'
import ScrollToPlugin from "gsap/ScrollToPlugin";
import TweenLite from "gsap/TweenLite";


export default {
  name: 'Main',
  components : {
    Search
  },

  data () {
    return {
      searchKeyword: '',
      keyward:'',
      showSearch: false
    }
  },

  methods: {
    clickSearch ( e ) {
      this.keyward = this.searchKeyword
      if(this.searchKeyword != '') {
        this.showSearch = true
        TweenLite.to(window, 0.8, {delay:0.1, scrollTo:"#searchResult", ease:Cubic.easeOut})
      } else {
        TweenLite.to(window, 0.8, {delay:0.1, scrollTo:0, ease:Cubic.easeOut})
        this.showSearch = 0
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
