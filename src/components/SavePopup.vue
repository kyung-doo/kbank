<template>
    <div class="modal" tabindex="-1">
        <div class="modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h1>마이페이지 저장</h1>
                    <button type="button" class="close"  @click="closePopup">
                        <img src="/static/img/btn_popClose.png" alt="닫기">
                    </button>
                </div>
                <div class="modal-body">
                    <!-- modalContents -->
                    <ul class="top-menu clearfix">
                        <li>
                            <input type="radio" 
                                name="data-type" 
                                id="type01" 
                                v-model="popupCheck" 
                                :value="1">
                                <label for="type01">데이터</label>
                            </li>
                        <li>
                            <input type="radio" 
                                name="data-type" 
                                id="type02" 
                                v-model="popupCheck" 
                                :value="2">
                            <label for="type02">그래프</label>
                        </li>
                    </ul>

                    <div class="data-save clearfix" v-if="popupCheck === 1" key='datasave'>
                        <div class="menu-con">
                            <Category-menu ref="dataCategory" type="data" key="data" />
                        </div>
                        <div class="list-con">
                          <h2 class="title sub-title clearfix"><i class="fas fa-list mR5"></i> 데이터 목록</h2>
                          <div class="top-title clearfix">
                              <span>이름</span>
                              <span>별칭</span>
                              <span>삭제</span>
                          </div>
                          <draggable
                            class="save-area"
                            :list="seriesData"
                            handle=".ico"
                            ghost-class="ghost"
                            @change="onDropArea"
                            tag="ul">
                            <li class="save-item" v-for="(item, i) in seriesData" :key="item.id">
                                <span class="ico"></span>
                                <span class="title" :title="item.series_nm"><em>{{ item.series_nm }}</em></span>
                                <span class="nick"><input type="text" v-model="item.nick" style="width:150px;" placeholder="별칭을 입력해 주세요."></span>
                                <span class="del"><button type="button"><i class="far fa-trash-alt" @click="removeSaveDataAt(i)"></i></button></span>
                            </li>
                          </draggable>
                        </div>
                    </div>

                    <div class="graph-save clearfix" v-else key='graphsave'>
                        <div class="menu-con">
                            <Category-menu ref="graphCategory" type="graph" key="graph" />
                        </div>
                        <div class="list-con">
                          <h2 class="title sub-title clearfix">
                              <span class="fL mR20"><i class="fas fa-edit mR5"></i> 그래프 이름</span>
                              <input type="text" placeholder="그래프 이름을 입력해주세요." style="float:right;" v-model="graphName">
                          </h2>
                          <div class="chartArea">
                            <high-stock ref="highstock" :chart-data="graphData" :type="graphType" height="400" :legend="true" :min="getMin" :max="getMax" />
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
                            class="drag-area list-group"
                            :list="seriesData"
                            handle=".icon"
                            ghost-class="ghost"
                            @change="onDropArea"
                            tag="ul">
                            <li class="series-item" v-for="(item, i) in seriesData" :key="item.id">
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
                        </div>
                    </div>

                    <p class="tC mT30">
                        <button type="button" class="btn btn-m btn-default" v-on:click="savePopup()">저장</button>
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
import CategoryMenu from '../components/CategoryMenu'

export default {
    name: 'SavePopup',
    components: {
      draggable,
      HighStock,
      CategoryMenu
    },
    props: ['saveData', 'saveGraph', 'graphType'],
    data () {
        return {
          popupCheck:1,
          range:3,
          seriesData: JSON.parse(JSON.stringify(this.saveData)),
          graphData: JSON.parse(JSON.stringify(this.saveGraph)),
          graphName:''
        }
    },

    computed: {
      getMin () {
        var lastDate = new Date(this.graphData[0].data[this.graphData[0].data.length-1][0])
        lastDate.setYear(lastDate.getFullYear() - this.range)
        return lastDate.getTime()
      },
      getMax () {
        return this.graphData[0].data[this.graphData[0].data.length-1][0]
      }
    },

    watch: {
      popupCheck () {
        this.range = 3
      },

      range () {
        var lastDate = new Date(this.graphData[0].data[this.graphData[0].data.length-1][0])
        lastDate.setYear(lastDate.getFullYear() - this.range)
        var min = lastDate.getTime();
        var max = this.graphData[0].data[this.graphData[0].data.length-1][0]
        this.$refs.highstock.changeMinMax(min, max)
      }
    },

    methods: {
        removeSaveDataAt ( idx ) {
          this.seriesData.splice(idx, 1)
          this.graphData.splice(idx, 1)
          this.showGraph()
        },

        closePopup () {
            this.$emit('close')
        },

        savePopup () {
          if(this.popupCheck == 1) {
              const selectList = this.$refs.dataCategory.getSelectCategory();
              if(selectList.length > 0) {
                this.seriesData.forEach(( item ) => {
                    
                })  
                const datas = this.$store.state.myData;
                selectList.forEach( ( idx ) => {
                    datas[idx].data = datas[idx].data.concat(this.seriesData.reverse())
                })
                this.$store.commit('setMyData', datas)
                alert('저장되었습니다.')
                this.closePopup()
            } else {
              alert('카테고리를 선택해 주세요.')
            }
              
          } else if(this.popupCheck == 2){
            const selectList = this.$refs.graphCategory.getSelectCategory();
            if(selectList.length > 0) {
              if(this.graphName == '') {
                alert('그래프 이름을 입력해 주세요.')
              } else {
                const datas = this.$store.state.myGraph;
                selectList.forEach( ( idx ) => {
                  datas[idx].data = datas[idx].data.concat({
                    graphName: this.graphName,
                    graphType: this.graphType,
                    graphRange: this.range,
                    seriesData: this.seriesData,
                    graphData: this.graphData
                  })
                })
                this.$store.commit('setMyGraph', datas)
                alert('저장되었습니다.')
              this.closePopup()
              }

            } else {
              alert('카테고리를 선택해 주세요.')
            }
          }
        },

        selectChange1 ( e, idx ) {
          this.graphData[idx].type = e.target.value
          this.seriesData[idx].type = e.target.value
          this.showGraph()
        },

        selectChange2 ( e, idx ) {
          this.graphData[idx].yAxis = parseInt(e.target.value)
          this.seriesData[idx].yAxis = parseInt(e.target.value)
          this.showGraph()
        },

        onDropArea ( e ) {
          if(e.moved) {
            const newData = Object.assign({}, this.graphData[e.moved.newIndex])
            const oldData = Object.assign({}, this.graphData[e.moved.oldIndex])
            this.graphData[e.moved.newIndex] = oldData
            this.graphData[e.moved.oldIndex] = newData
            this.showGraph()
          }
        },

        showGraph () {
          let copyData = []
          this.seriesData.forEach(( data, i ) => {
            copyData[i] = this.graphData[i]
            copyData[i].type = data.type
            copyData[i].yAxis = data.yAxis - 1
          })
          this.graphData = copyData
          
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.drag-area .series-item{
  cursor:default;
  box-shadow: none;
  -webkit-box-shadow:none;
  border:solid 1px #ccc;
}
</style>
