<template>
    <div class="modal" tabindex="-1">
        <div class="modal-lg">
          <div class="modal-content">
              <div class="modal-header">
                  <h1>{{graphData.graphName}}</h1>
                  <button type="button" class="close" @click="closePopup">
                      <img src="/static/img/btn_popClose.png" alt="닫기">
                  </button>
              </div>
              <div class="modal-body">
                <!-- modalContents -->
                <h2 class="title sub-title clearfix">
                    <span class="fL mR20"><i class="fas fa-edit mR5"></i> 그래프 이름</span>
                    <input type="text" placeholder="그래프 이름을 입력해주세요." style="float:right;" v-model="graphData.graphName">
                </h2>

                <div class="chartArea" v-if="graphData.graphData.length > 0">
                  <high-stock ref="highstock" 
                    :chart-data="graphData.graphData" 
                    :type="graphData.graphType" 
                    height="400" 
                    :legend="true" 
                    :min="getMin" 
                    :max="getMax" 
                    key="graph"
                    :no-range="noRange ? true : false" />
                </div>

                <dl class="selectRange mT10 clearfix">
                    <dt><i class="far fa-calendar-check mR5"></i> 저장 기간 선택</dt>
                    <dd>
                        <ul>
                            <li><input type="radio" name="range" id="range01" class="input-radio" v-model="range" value="3"><label for="range01">최근 3년</label></li>
                            <li><input type="radio" name="range" id="range02" class="input-radio" v-model="range" value="5"><label for="range02">최근 5년</label></li>
                            <li><input type="radio" name="range" id="range03" class="input-radio" v-model="range" value="10"><label for="range03">최근 10년</label></li>
                        </ul>
                    </dd>
                </dl>

                <draggable
                  class="graph-list list-group gray-box"
                  :list="graphData.seriesData"
                  handle=".icon"
                  ghost-class="ghost"
                  @change="onDropArea"
                  tag="ul">
                  <li class="series-item" v-for="(item, i) in graphData.seriesData" :key="item.id">
                      <span class="icon"><i class="fas fa-bars"></i></span>
                      <p class="tit" :title="item.series_nm">{{ item.series_nm }}</p>
                      <p class="itemMenu">
                          <select class="custom-select-sm" v-model="item.type" @change="selectChange1($event, i)">
                              <option value="line">선</option>
                              <option value="column">막대</option>
                          </select>
                          <select class="custom-select-sm" v-model="item.yAxis" @change="selectChange2($event, i)">
                              <option value="1">기본축</option>
                              <option value="2">보조축</option>
                          </select>
                          <a class="list-del" @click="removeSaveDataAt(i)"><i class="far fa-trash-alt"></i></a>
                      </p>
                  </li>
                </draggable>

                <p class="tC mT30">
                  <button type="button" class="btn btn-m btn-default" v-on:click="closePopup( true )">저장</button>
                  <button type="button" class="btn btn-m btn-white-line" v-on:click="closePopup()">취소</button>
                </p>

              </div>
          </div>
          
      </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import HighStock from '../components/HighStock'

export default {
    name: 'GraphPopup',
    components: {
      draggable,
      HighStock
    },
    props: ['data', 'idx1', 'idx2', 'type'],
    data () {
        return {
          graphData: JSON.parse(JSON.stringify(this.data)),
          range: 3,
        }
    },

    mounted () {
      this.range = this.graphData.graphRange
    },

    computed: {
      getMin () {
        var lastDate = new Date(this.graphData.graphData[0].data[this.graphData.graphData[0].data.length-1][0])
        lastDate.setYear(lastDate.getFullYear() - parseInt(this.range))
        return lastDate.getTime()
      },

      getMax () {
        return this.graphData.graphData[0].data[this.graphData.graphData[0].data.length-1][0]
      },

      noRange () {
        return this.type === 'graph' ? false : true
      }
    },

    watch: {
      range ( val ) {
        this.graphData.graphRange = val
        var lastDate = new Date(this.graphData.graphData[0].data[this.graphData.graphData[0].data.length-1][0])
        lastDate.setYear(lastDate.getFullYear() - this.range)
        var min = lastDate.getTime();
        var max = this.graphData.graphData[0].data[this.graphData.graphData[0].data.length-1][0]
        this.$refs.highstock.changeMinMax(min, max)
      }
    },

    methods: {
      closePopup ( update ) {
        if(update === true) {
          if(this.graphData.graphName === '') {
            alert('그래프 이름을 입력해 주세요.')
            return
          }
          if(this.type === 'graph') {
            this.$store.state.myGraph[this.idx1].data[this.idx2] = this.graphData
          } else if(this.type === 'dashboard') {
            this.$store.state.myDashboard[this.idx1].data[this.idx2] = this.graphData
          }
          this.$emit('close', true)
        } else {
          this.$emit('close', false)
        }
      },

      onDropArea ( e ) {
        if(e.moved) {
          const newData = Object.assign({}, this.graphData.graphData[e.moved.newIndex])
          const oldData = Object.assign({}, this.graphData.graphData[e.moved.oldIndex])
          this.graphData.graphData[e.moved.newIndex] = oldData
          this.graphData.graphData[e.moved.oldIndex] = newData
          this.showGraph()
        }
      },

      selectChange1 ( e, idx ) {
        this.graphData.graphData[idx].type = e.target.value
        this.graphData.seriesData[idx].type = e.target.value
        this.showGraph()
      },

      selectChange2 ( e, idx ) {
        this.graphData.graphData[idx].yAxis = parseInt(e.target.value)
        this.graphData.seriesData[idx].yAxis = parseInt(e.target.value)
        this.showGraph()
      },

      showGraph () {
        let copyData = []
        this.graphData.seriesData.forEach(( data, i ) => {
          copyData[i] = this.graphData.graphData[i]
          copyData[i].type = data.type
          copyData[i].yAxis = data.yAxis - 1
        })
        this.graphData.graphData = copyData
        
      },

      removeSaveDataAt ( idx ) {
        this.graphData.seriesData.splice(idx, 1)
        this.graphData.graphData.splice(idx, 1)
        this.showGraph()
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
