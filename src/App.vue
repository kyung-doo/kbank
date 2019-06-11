<template>
  <div id="wrapper">
    
    <div id="headTop">
        <div class="contents_box">
            <h1><router-link to="/">BOKReit</router-link></h1>
            <ul class="topMenu">
                <li><router-link to="/timeseries-hub">Timeseries Hub</router-link></li>
                <li><router-link to="/microdata-hub">Microdata Hub</router-link></li>
                <li><router-link to="/graph-hub">Graph Hub</router-link></li>
                <li><a href="#">Reference Hub</a></li>
                <li><router-link to="/mypage">마이페이지</router-link></li>
            </ul>
        </div>
    </div>

    <!-- <header id="subHeader">
        <div class="contents_box">
            <h1><router-link to="/"><img src="../static/img/img_logo_sub.png" alt="한국은행"></router-link></h1>
            <ul class="nav clearfix">
                <li><router-link to="/timeseries-hub">Timeseries Hub</router-link></li>
                <li><a href="#">Microdata Hub</a></li>
                <li><a href="#">Graph Hub</a></li>
                <li><a href="#">Reference Hub</a></li>
            </ul>
        </div>
    </header> -->

    <section id="contents">
      <!-- <transition name="fade" mode="out-in" :duration="300"> -->
        <router-view/>
      <!-- </transition>   -->
    </section>

    <!-- <footer id="footer">
        <div class="contents_box">
            <p class="address">서울특별시 중구 세종대로 67(태평로2가) / 대표전화 :  02 - 759 - 4114</p>
            <p class="copyright">COPYRIGHT 2019 THE BANK OF KOREA. ALL RIGHTS RESERVED.</p>
        </div>
    </footer> -->
  </div>
</template>

<script>
import '../static/js/simplebar.js'
import '../static/css/simplebar.css'
import '../static/css/bootstrap.min.css'
import '../static/css/style.css'





export default {
  name: 'App',

  mounted () {
    window.addEventListener('resize', this.reiszeWindow)
    this.reiszeWindow()
  },

  watch:{
    $route (to, from){
      const owner = this
      setTimeout(() => {
        owner.reiszeWindow()
      })
      owner.reiszeWindow()
    }
  }, 

  methods : {
    reiszeWindow () {
      var winHeight = window.innerHeight
      var headHeight = document.querySelector('#headTop').offsetHeight
      var outHeight = headHeight
      
      
      if(document.querySelector('.timeseries')){
        document.querySelector('#contents').style.height = (winHeight - outHeight)+'px'
      } else {
        document.querySelector('#contents').style.height = 'auto'
      }

      if(document.querySelector('.blockcon')) {
        var block = document.querySelectorAll('.blockcon')
        for(let i = 0; i<block.length; i++ ) {
          block[i].style.height = (winHeight - outHeight-40)+'px'
        }
      }
      if(document.querySelector('.resizebar')){
        var resizeBar = document.querySelectorAll('.resizebar')
        for(let i = 0; i<block.length; i++ ) {
          if(resizeBar[i]) resizeBar[i].style.height = (winHeight - outHeight-40)+'px'
        }
      }

      if(document.querySelector('.mypage')){
        document.querySelector('.mypage .contentsBlock').style.minHeight = (winHeight - outHeight-40)+'px'
      }

      if(document.querySelector('.main')){
        document.querySelector('.main').style.minHeight = (winHeight - outHeight)+'px'
      }

      if(document.querySelector('.microdata')){
        document.querySelector('.microdata .contentsBlock').style.minHeight = (winHeight - outHeight-40)+'px'
      }
    }
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

/* .fade-enter-active, 
.fade-leave-active {
  transition: top .3s;
}
.fade-enter-active > div, 
.fade-leave-active > div {
  transition: all .3s;
} */


.fade-enter > div, 
.fade-leave-to > div {
  opacity: 0;
}

.popup-ani-enter-active,
.popup-ani-leave-active {
  transition: opacity .5s ease;
}
.popup-ani-enter-active > div,
.popup-ani-leave-active > div{
  transition: transform .5s ease;
}
.popup-ani-enter, .popup-ani-leave-to {
   opacity: 0;
}
.popup-ani-enter > div, .popup-ani-leave-to > div {
   transform: translateY(-30px);
}

.halo-tree{
  margin-left:10px;
}
.halo-tree ul{
  padding-left:10px !important;
}
.halo-tree .tree-node-el{
  position: relative;
}
.halo-tree li{
    padding:0 0px 5px 15px !important;
}

.halo-tree .tree-open{
  line-height: 9px !important;
}
.halo-tree .tree-expand{
  position:absolute;
  left:2px;
  top:9px;
  cursor:pointer;
  height:15px !important;
}
.halo-tree .node-title{
  cursor:default;
  display: inline-block;
  margin-left:20px !important;
  position: relative;
  top: 4px;
}
.halo-tree .node-title.no-children{
  margin-left:0 !important;
}
.halo-tree .node-title em{
  font-style: normal;
  color:#00acdc;
}
.halo-tree .node-title.node-searched{
  border:solid 1px #00acdc !important;
}
.halo-tree .node-selected{
  background-color:#d3f2ff !important;
}
.halo-tree .node-title:hover{
  background-color:#d3f2ff !important;
}

.simplebar-scrollbar:before{
  background:#b2b2b2 !important;
}
.ghost{
    opacity:0.5;
}

/* .pagenation > li {
  display: inline-block;
}
.pagenation > li > a {
  display: inline-block;
  border:solid 1px #ccc;
  padding: 3px;
  min-width:20px;
  margin:2px;
}
.pagenation > li.active > a{
  background-color:#38a89d;
  color:#fff;
} */

</style>
