<template>
  <div class="timeseries">
    
    <div class="contents_box">
      <div class="graphBlock clearfix">

        <!-- tree-block -->
        <div class="blockcon" >
          <div class="searchBlock">
              <div class="searchLine" >
                <form v-on:submit.prevent="search">
                  <input type="text" 
                    v-model.lazy="searchword" 
                    placeholder="검색어를 입력해 주세요.">
                  <button type="button" 
                    @click="search">
                    <i class="fas fa-search"></i>
                  </button>
                </form>
              </div>
          </div>
          <div class="content" data-simplebar>
            <v-tree ref='tree' 
              :data.sync='treeData'
              :halfcheck='false'
              :radio='true'
              :tpl ='tpl'
              :multiple="false">
            </v-tree>
          </div>

        </div>
        <!-- //tree-block -->

        <div class="resizebar">&nbsp;</div>

        <!-- tree-block -->
        <div class="blockcon">
          <div class="dataTitle">
            <h2><span>{{seriesTitle}}</span></h2>
          </div>
          <div class="selectLange clearfix">
              <ul class="inlineTab fR">
                  <li :class="{active:seriesSort==='M'}" @click="clickSort(0)"><button type="button">월</button></li>
                  <li :class="{active:seriesSort==='Q'}" @click="clickSort(1)"><button type="button">분기</button></li>
                  <li :class="{active:seriesSort==='S'}" @click="clickSort(2)"><button type="button">반기</button></li>
                  <li :class="{active:seriesSort==='A'}" @click="clickSort(3)"><button type="button">년</button></li>
              </ul>
          </div>
          <div class="content" data-simplebar ref="seriesBlock">
            <draggable :class="['series-group', {'no-data':isNoData1 && seriesTitle !=''}]"
              ghost-class="ghost"
              tag="ul" 
              :list="seriesData" 
              :sort="false"
              :clone="clone"
              :group="{ name: 'series-area', pull: 'clone', put: false }">
              
              <li class="series-item" v-for="item in seriesData" :key="item.id" v-show="seriesSort === item.freq_code">
                <p class="tit" :title="item.series_nm">{{ item.series_nm }}</p>
                <p class="listRight"><i class="fas fa-bars"></i></p>
              </li>
              
            </draggable>
            
          </div>
          
        </div>
        <!-- //tree-block -->

        <div class="resizebar">&nbsp;</div>

        <!-- tree-block -->
        <div class="blockcon">
          <div class="dataTitle">
              <h2>선택된 시계열 항목</h2>
          </div>
          <div class="innerScroll" data-simplebar>
            <div class="chartArea">
              <high-stock :chart-data="graphData" :type="seriesSort" height="400" :legend="true" />
            </div>

            <div class="dataMenu">
                <button type="button" class="btn btn-default btn-s" v-on:click="clickSave()">마이페이지 저장</button>
                <button type="button" class="btn btn-white-line btn-s" v-on:click="clickReset()">초기화</button>
            </div>

            <div class="content">
              <draggable
                :class="['drag-area', 'list-group', {'no-data':isNodata2}]"
                tag="ul" 
                :list="checkSeries"
                ghost-class="ghost"
                group="series-area"
                @change="onDropArea">

                <li class="series-item" v-for="(item, i) in checkSeries" :key="item.id">
                    <span class="icon"><i class="fas fa-bars"></i></span>
                    <p class="tit" :title="item.series_nm">{{ item.series_nm }}</p>
                    <p class="itemMenu">
                        <select class="custom-select-sm" v-model="item.type" @change="onSelectChange1($event, i)">
                            <option value="line">선</option>
                            <option value="column">막대</option>
                        </select>
                        <select class="custom-select-sm"  v-model="item.yAxis" @change="onSelectChange2($event, i)">
                            <option value="1">기본축</option>
                            <option value="2">보조축</option>
                        </select>
                        <a class="list-del" @click="removeAt(i)"><i class="far fa-trash-alt"></i></a>
                    </p>
                </li>

              </draggable>
            </div>

          </div>
        </div>
        <!-- //tree-block -->
        
      </div>

    </div>

    <!-- save-pop -->
    <transition name="popup-ani">
      <Save-popup 
        v-if="showSavePop" 
        :saveData="saveData"
        :saveGraph="saveGraphData"
        :graphType="seriesSort"
        @close="showSavePop = false"  />
    </transition>
    <!-- //save-pop -->

  </div>
</template>

<script>

import 'vue-tree-halower/dist/halower-tree.min.css'
import _ from 'lodash'

import data1 from '../../static/category.json'
import data2 from '../../static/series.json'
import data3 from '../../static/series_data.json'

import draggable from "vuedraggable";
import VTree from 'vue-tree-halower'
import HighStock from '../components/HighStock'
import SavePopup from '../components/SavePopup'


export default {
  name: 'TimeseriesHub',
  components: {
    VTree,
    draggable,
    HighStock,
    SavePopup
  },

  data () {
    return {
      categoryData: data1,
      searchword:'',
      treeData: [],
      seriesData: [],
      seriesTitle:'',
      seriesSort:'M',
      checkSeries:[],
      graphData:[],
      showSavePop:false,
      isNoData1: true,
      saveData:[],
      saveGraphData:[]
    }
  },

  watch : {
    
  },

  computed : {
    isNodata2 () {
      if(this.checkSeries.length == 0) return true
      return false
    }
  },

  created () {
    this.setCategory(this.treeData, '' )
    this.myDataTree = [{
      expanded:true,
      title:'데이터',
      nocheck:true,
      selDisabled:true,
      children:this.$store.state.myData
    }]
    
  },

  mounted () {
    this.$refs.tree.$on('node-select', ( node ) => {
      this.seriesData = []
      //this.checkSeries = []
      if( node.children.length == 0 ) {
        this.seriesTitle = node.title
        data2.forEach(( data ) => {
          if(data.dataset_id == node.dataid) {
            this.seriesData.push(data)
          }
        })
      }

      this.checkNoData()

    })
  },
  
  methods : {
    setCategory ( ar, parent ) {
      this.categoryData.forEach(( data ) => {
          if(data.parent_cat_id === parent) {
              var obj = {
                  id: data.cat_id,
                  dataid: data.dataset_id,
                  pid: data.parent_cat_id,
                  title: data.cat_nm,
                  expanded: false,
                  children: []
              }
              ar.push(obj);
              this.setCategory(obj.children, obj.id)
          }
      });
    },
    
    search () {
        this.$refs.tree.searchNodes(this.searchword)
    },

    clickReset () {
      this.checkSeries = []
      this.showGraph()
      this.$forceUpdate()
    },

    showGraph () {
      this.graphData = []
      const graphAr = []
      this.checkSeries.forEach(( data, i ) => {
        graphAr[i] = new Array();
        data3.forEach((data2) => {
          if(data.series_id == data2.series_id) {
            graphAr[i].push(data2)
          }
        })
        
        graphAr[i].sort(function (a, b) {
          return parseInt(a.period) - parseInt(b.period)
        })
      })

      for(var i=0; i<graphAr.length; i++) {
        this.graphData[i] = {
          name: this.checkSeries[i].series_nm,
          type: this.checkSeries[i].type,
          yAxis: this.checkSeries[i].yAxis-1,
          data:_.map(graphAr[i], (t) => {
            if(this.seriesSort === 'M') {
              return [
                new Date(parseInt(String(t.period).substr(0,4)), parseInt(String(t.period).substr(4,6))-1).getTime(),
                t.data_value
              ]
            } else if(this.seriesSort === 'Q') {
              const q = String(t.period).substr(4,6)
              if(q === 'Q1') {
                return [
                  new Date(parseInt(String(t.period).substr(0,4)), 0).getTime(),
                  t.data_value
                ]
              } else if(q === 'Q2') {
                return [
                  new Date(parseInt(String(t.period).substr(0,4)), 3).getTime(),
                  t.data_value
                ]
              } else if(q === 'Q3') {
                return [
                  new Date(parseInt(String(t.period).substr(0,4)), 6).getTime(),
                  t.data_value
                ]
              } else if(q === 'Q4') {
                return [
                  new Date(parseInt(String(t.period).substr(0,4)), 9).getTime(),
                  t.data_value
                ]
              }
            } else if(this.seriesSort === 'A') {
              return [
                new Date(parseInt(String(t.period).substr(0,4)), 0).getTime(),
                t.data_value
              ]
            }
          })
        }
      }
    },

    removeAt (idx) {
      this.checkSeries.splice(idx, 1);
      this.showGraph()
    },

    
    onDropArea ( e ) {
      this.showGraph()
    },

    onSelectChange1 ( e, idx ) {
      this.checkSeries[idx].type = e.target.value
      this.showGraph()
    },

    onSelectChange2 ( e, idx ) {
      this.checkSeries[idx].yAxis = e.target.value
      this.showGraph()
    },

    clone (el) {
      return Object.assign({type:'line', yAxis:1}, el)
    },

    tpl ( ...args ) {
      let {0: node, 2: parent, 3: index} = args
      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      if (node.searched) titleClass += ' node-searched'
      if(node.children.length == 0) titleClass += ' no-children'

      return <span class={titleClass} onClick={() => { this.$refs.tree.nodeSelected(node)}}>
              <span>
                {args[0].title}
                <em v-show={args[0].children.length > 0}> ({args[0].children.length})</em>
              </span>
             </span>
    },

    clickSort ( idx ) {

      let sort;
      if(idx === 0) {
        sort = 'M'
      } else if(idx === 1) {
        sort = 'Q'
      } else if(idx === 2) {
        sort = 'S'
      } else if(idx === 3) {
        sort = 'A'
      }

      if(sort != this.seriesSort) {
        
        if(this.graphData.length > 0) {
          if(confirm('선택하신 데이터가 초기화 됩니다')) {
            this.clickReset()
            this.seriesSort = sort
          }
        } else {
          this.seriesSort = sort
        }

        this.checkNoData()
      }
      
    },

    checkNoData () {
      const owner = this
      setTimeout(()=>{
        owner.isNoData1 = true
        var listAr = owner.$el.querySelectorAll('.series-item');
        for(var i=0; i<listAr.length; i++){
          if(listAr[i].style.display !== 'none') {
            owner.isNoData1 = false
            break
          }
        }
        owner.$forceUpdate()
      })
      this.$refs.seriesBlock.SimpleBar.getScrollElement().scrollTop = 0;
    },

    clickSave (){
      if(this.graphData.length === 0) {
        alert('데이터를 선택해 주세요.')
      } else {
        this.saveData = JSON.parse(JSON.stringify(this.checkSeries))
        this.saveData.forEach(( item, i ) => {
          item.id = i
        })

        this.saveGraphData = JSON.parse(JSON.stringify(this.graphData))
        this.saveGraphData.forEach(( item, i ) => {
          item.id = i
        })

        
        this.showSavePop = true
      }
    }

    

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .timeseries{
  position: absolute;
  left:0;
  top:0;
  width:100%;
} */
</style>
