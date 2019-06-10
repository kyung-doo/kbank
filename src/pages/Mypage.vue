<template>
  <div class="mypage">

    <div class="contents_box">
      <div class="contentsBlock blockWhite">
        <div class="contentHead">
            <h2><i class="fas fa-user-alt mR5"></i> <span>이상민</span> 님의 마이페이지</h2>
            <p class="location"><i class="fas fa-home" style="margin:0;"></i> <i class="fas fa-angle-right"></i> 마이페이지 <i class="fas fa-angle-right"></i> 데이터 <i class="fas fa-angle-right"></i> 생산</p>
        </div>
        <div class="contentArticle clearfix">

          <div class="leftCon">
            <p class="setup"><a class="btn btn-s btn-default"><i class="fas fa-cog mR5"></i> 나의 통계 카테고리 관리</a></p>
            <ul class="lnb">
                <li class="">
                    <a @click="clickMain(0)">데이터</a>
                    <ul>
                      <li :class="{'active':i===0}" v-for="(list, i) in myDataList" :key="'data'+i">
                        <a @click="clickList(0,i)">⋅ {{ list.title }} ({{list.data.length}})</a>
                      </li>
                    </ul>
                </li>
                <li class="">
                    <a @click="clickMain(1)">그래프</a>
                    <ul>
                      <li v-for="(list, i) in myGraphList" :key="'graph'+i">
                        <a @click="clickList(1,i)">⋅ {{ list.title }} ({{list.data.length}})</a>
                      </li>
                    </ul>
                </li>
                <li class="">
                    <a @click="clickMain(2)">대시보드</a>
                    <ul>
                      <li v-for="(list, i) in myDashboardList" :key="'dashboard'+i">
                        <a @click="clickList(2,i)">⋅ {{ list.title }} ({{list.data.length}})</a>
                      </li>
                    </ul>
                </li>
            </ul>
          </div>

          <div class="rightCon">
            <div v-if="active1 === 0">
              <div class="titleBlock clearfix">
                  <h3><i class="far fa-folder-open"></i> - {{myDataList[active2].title}}</h3>

                  <p class="dataBtn">
                      <button type="button" class="btn btn-xs btn-white-line btn-short" @click="deleteList">삭제</button>
                      <button type="button" class="btn btn-xs btn-white-line btn-short">수정</button>
                  </p>
              </div>
              <table class="table-default">
                <colgroup>
                    <col style="width:60px;">
                    <col style="width:60px;">
                    <col style="width:120px;">
                    <col style="width:px;">
                    <col style="width:120px;">
                    <col style="width:120px;">
                </colgroup>
                <thead>
                    <tr>
                        <th><input type="checkbox" :id="'chk-'+active1+'-'+active2+'all'" class="input-check" v-model="checkAll"><label :for="'chk-'+active1+'-'+active2+'all'"><span class="hide">전체 선택</span></label></th>
                        <th>번호</th>
                        <th>구분</th>
                        <th>통계표명</th>
                        <th>최종갱신일</th>
                        <th>스크랩일</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(list, i) in setDataList" :key="i+1+((currentPage-1)*10)">
                    <td><input type="checkbox" :id="'chk-'+active1+'-'+active2+'-'+i" class="input-check" v-model="checked" :value="i"><label :for="'chk-'+active1+'-'+active2+'-'+i"><span class="hide">check</span></label></td>
                    <td>{{i+1+((currentPage-1)*10)}}</td>
                    <td>데이터</td>
                    <td class="text-left"><a>{{list.nick ? list.nick : list.series_nm}}</a></td>
                    <td>2019-03-29</td>
                    <td>2019-04-23</td>
                  </tr>
                  <tr v-if="setDataList.length == 0">
                    <td colspan="6" style="text-align:center">리스트가 없습니다.</td>
                  </tr>
                </tbody>
              </table>

              <paginate
                key="dataPage"
                ref="paginate"
                :page-count="totalPage"
                :click-handler="pageChange"
                prev-text="<i class='fas fa-angle-left'>"
                next-text="<i class='fas fa-angle-right'>"
                :first-last-button="true"
                first-button-text="<i class='fas fa-angle-double-left'>"
                last-button-text="<i class='fas fa-angle-double-right'>"
                :no-li-surround="true"
                :container-class="'paging'">
              </paginate>

              <div class="bbsSearch">
                  <select name="" id="">
                      <option value="">제목</option>
                  </select>
                  <input type="text">
                  <button type="submit" class="btn btn-m btn-default btn-short"><i class="fas fa-search mR5"></i> 검 색</button>
              </div>

            </div>

            <div v-else-if="active1 === 1">
              <div class="titleBlock clearfix">
                  <h3><i class="far fa-folder-open"></i> - {{myGraphList[active2].title}}</h3>

                  <p class="dataBtn">
                      <button type="button" class="btn btn-xs btn-white-line btn-short" @click="deleteList">삭제</button>
                      <button type="button" class="btn btn-xs btn-white-line btn-short">수정</button>
                      <button type="button" class="btn btn-xs btn-blue btn-short" @click="addGraphDashboard"><i class="fas fa-download mR5"></i> 대쉬보드에 추가</button>
                  </p>
              </div>
              <table class="table-default">
                <colgroup>
                    <col style="width:60px;">
                    <col style="width:60px;">
                    <col style="width:120px;">
                    <col style="width:px;">
                    <col style="width:120px;">
                    <col style="width:120px;">
                </colgroup>
                <thead>
                    <tr>
                        <th><input type="checkbox" :id="'chk-'+active1+'-'+active2+'all'" class="input-check" v-model="checkAll"><label :for="'chk-'+active1+'-'+active2+'all'"><span class="hide">전체 선택</span></label></th>
                        <th>번호</th>
                        <th>구분</th>
                        <th>통계표명</th>
                        <th>최종갱신일</th>
                        <th>스크랩일</th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="(list, i) in setDataList" :key="i+1+((currentPage-1)*10)">
                    <td><input type="checkbox" :id="'chk-'+active1+'-'+active2+'-'+i" class="input-check" v-model="checked" :value="i"><label :for="'chk-'+active1+'-'+active2+'-'+i"><span class="hide">check</span></label></td>
                    <td>{{i+1+((currentPage-1)*10)}}</td>
                    <td>그래프</td>
                    <td class="text-left"><a @click="clickGraph(i+((currentPage-1)*10))">{{ list.graphName }}</a></td>
                    <td>2019-03-29</td>
                    <td>2019-04-23</td>
                  </tr>
                  <tr v-if="setDataList.length == 0">
                    <td colspan="6" style="text-align:center">리스트가 없습니다.</td>
                  </tr>
                </tbody>
              </table>

              <paginate
                key="graphPage"
                ref="paginate"
                :page-count="totalPage"
                :click-handler="pageChange"
                prev-text="<i class='fas fa-angle-left'>"
                next-text="<i class='fas fa-angle-right'>"
                :first-last-button="true"
                first-button-text="<i class='fas fa-angle-double-left'>"
                last-button-text="<i class='fas fa-angle-double-right'>"
                :no-li-surround="true"
                :container-class="'paging'">
              </paginate>

              <div class="bbsSearch">
                  <select name="" id="">
                      <option value="">제목</option>
                  </select>
                  <input type="text">
                  <button type="submit" class="btn btn-m btn-default btn-short"><i class="fas fa-search mR5"></i> 검 색</button>
              </div>

            </div>

            <div v-else>
              <div class="titleBlock clearfix">
                  <h3><i class="far fa-folder-open"></i> - {{myDashboardList[active2].title}}</h3>
                  <p class="dataBtn">
                    <button type="button" class="btn btn-xs btn-blue btn-short"><i class="fas fa-sync-alt mR5"></i> 데이터 업데이트</button>
                    <button type="button" class="btn btn-xs btn-blue btn-short"><i class="fas fa-share-square mR3"></i> 그래프 허브로 전송</button>
                    <button type="button" class="btn btn-xs btn-blue btn-short" @click="clickDashboardChange"><i class="fas fa-exchange-alt mR5"></i> 그래프 순서변경</button>
                  </p>
              </div>
              <div class="dashboardBlock clearfix">
                  <div class="chart" v-for="(list, i)  in setDataList" :key="i">
                    <h2><a @click="clickGraph2(i)">{{list.graphName}}</a></h2>
                    <high-stock :chart-data="list.graphData" 
                    :type="list.graphType" 
                    :no-range="true" 
                    height="500" 
                    :legend="true" 
                    :min="list.min" 
                    :max="list.max" />
                  </div>
                  <div class="no-data" v-if="setDataList.length == 0">
                    리스트가 없습니다.
                  </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>


    <!-- graph-pop -->
    <transition name="popup-ani">
      <Graph-popup 
        v-if="showGraphData"
        :idx1="active2"
        :idx2="selectGraphIdx"
        :data="showGraphData"
        :type="graphPopType"
        @close="closeGraphPopup"  />
    </transition>
    <!-- //graph-pop -->


    <!-- Dashboard-add-popup -->
    <transition name="popup-ani">
      <Dashboard-add-popup 
        v-if="addGraphData.length > 0"
        :data="addGraphData"
        @close="closeDashbAddPopup"  />
    </transition>
    <!-- //Dashboard-add-popup -->


    <!-- Dashboard-change-popup -->
    <transition name="popup-ani">
      <Dashboard-change-popup 
        v-if="changeDashboadData"
        :data="changeDashboadData"
        :idx="active2"
        @close="closeDashbChangePopup"  />
    </transition>
    <!-- //Dashboard-change-popup -->

  </div>
</template>

<script>

import Paginate from 'vuejs-paginate'
import GraphPopup from '../components/GraphPopup'
import DashboardAddPopup from '../components/DashboardAddPopup'
import DashboardChangePopup from '../components/DashboardChangePopup'
import HighStock from '../components/HighStock'

export default {
  name: 'Mypage',


  components:{
    Paginate,
    GraphPopup,
    DashboardAddPopup,
    DashboardChangePopup,
    HighStock
  },

  data() {
    return {
      myDataList: this.$store.state.myData,
      myGraphList: this.$store.state.myGraph,
      myDashboardList: this.$store.state.myDashboard,
      active1:0,
      active2:0,
      totalPage:1,
      currentPage:1,
      checked:[],
      showGraphData: null,
      addGraphData:[],
      selectGraphIdx:0,
      changeDashboadData: null,
      graphPopType:''
    }
  },

  computed: {
    setDataList () {
      let data
      if(this.active1 === 0) {
        data = this.myDataList[this.active2].data.slice().reverse();
        return data.slice(10*(this.currentPage-1), 10*(this.currentPage))
      } else if(this.active1 === 1) {
        data = this.myGraphList[this.active2].data.slice().reverse();
        return data.slice(10*(this.currentPage-1), 10*(this.currentPage))
      } else if(this.active1 === 2) {
        data = this.myDashboardList[this.active2].data.slice().reverse();
        data.forEach((item) => {
          var lastDate = new Date(item.graphData[0].data[item.graphData[0].data.length-1][0])
          lastDate.setYear(lastDate.getFullYear() - parseInt(item.graphRange))
          item.min = lastDate.getTime()
          item.max = item.graphData[0].data[item.graphData[0].data.length-1][0]
        })
        return data.slice()
      } 
      this.$forceUpdate()
    },
    
    checkAll : {
      get () {
        if(this.setDataList.length === 0) return false
        return this.setDataList ? this.checked.length == this.setDataList.length : false;
      },
      set ( value ) {
        let checked = [];
        if( value ){
          this.setDataList.forEach(function ( item, i ) {
            checked.push(i);
          });
        }
        this.checked = checked;
      }
    }
  },

  mounted () {
    this.setPageNum()
    const owner = this
    setTimeout(() => {
      owner.setMainSize()
    })
  },

  methods : {
    
    clickMain ( idx ) {
      const el = this.$el.querySelectorAll('.lnb > li')[idx];
      if(el.classList[0] == 'active') {
        el.classList.remove('active')
        el.style.height = (50 + el.querySelector('ul').offsetHeight)+'px'
      } else {
        el.classList.add('active')
        el.style.height= '50px'
      }
    },

    clickList (idx1, idx2) {
      this.active1 = idx1
      this.active2 = idx2

      const main =  this.$el.querySelectorAll('.lnb > li')
      for(let i=0; i<main.length; i++) {
        if(i == this.active1) {
          const sub = main[i].querySelectorAll('ul > li');
          for(let j=0; j<sub.length; j++) {
            if(j == this.active2) {
              sub[j].classList.add("active")
            } else {
              sub[j].classList.remove("active")
            }
          }
        } else {
          const sub = main[i].querySelectorAll('ul > li');
          for(let j=0; j<sub.length; j++) {
            sub[j].classList.remove("active")
          }
        }
      }
      this.checked = []
      this.currentPage = 1;
      this.setPageNum()
      try{
        this.$refs.paginate.selectFirstPage()
      } catch( e ) {}
      
    },

    deleteList () {
      if(this.active1 === 0) {
        for(let i =0; i<this.checked.length; i++){
          var num = this.checked.length-1-i;
          var len = this.myDataList[this.active2].data.length-1
          this.myDataList[this.active2].data.splice(len-(this.checked[num]+((this.currentPage-1)*10)), 1)
        }
      } else if(this.active1 === 1) {
        for(let i =0; i<this.checked.length; i++){
          var num = this.checked.length-1-i;
          var len = this.myGraphList[this.active2].data.length-1
          this.myGraphList[this.active2].data.splice(len-(this.checked[num]+((this.currentPage-1)*10)), 1)
        }
      }
      this.checked = []
      var page = this.currentPage
      this.setPageNum()
      if(this.currentPage > this.totalPage){
        this.currentPage = this.totalPage
      }
      this.$refs.paginate.handlePageSelected(this.currentPage)
    },
    
    pageChange (page) {
      this.checked = []
      this.currentPage = page
    },

    

    setPageNum () {
      if(this.active1 === 0){
        const len = this.myDataList[this.active2].data.length
        this.totalPage = Math.ceil(len / 10)
      } else if(this.active1 === 1) {
        const len = this.myGraphList[this.active2].data.length
        this.totalPage = Math.ceil(len / 10)
      }
      //this.$refs.paginate.selectFirstPage()
    },

    clickGraph ( idx ){
      const data = this.myGraphList[this.active2].data.slice().reverse()[idx]
      this.graphPopType = 'graph'
      this.selectGraphIdx = this.$store.state.myGraph[this.active2].data.length-idx-1
      this.showGraphData = data
    },

    clickGraph2 ( idx ) {
      const data = this.myDashboardList[this.active2].data.slice().reverse()[idx]
      this.graphPopType = 'dashboard'
      this.selectGraphIdx = this.$store.state.myDashboard[this.active2].data.length-idx-1
      this.showGraphData = data
    },

    closeGraphPopup ( update ) {
      this.showGraphData = null
      if(update) {
        this.myGraphList = this.$store.state.myGraph
        this.myDashbardList = this.$store.state.myDashbard
        const active = this.active2
        this.active2 = -1
        this.active2 = active
        this.$forceUpdate()
      }
    },

    closeDashbAddPopup () {
      
      this.addGraphData = []
      this.myDashboardList = this.$store.state.myDashboard
      this.checked = []
      const active = this.active2
      this.active2 = -1
      this.active2 = active
      this.$forceUpdate()
      const owner = this
      setTimeout(() => {
        owner.setMainSize()
      })
    },

    addGraphDashboard( e ) {
      if(this.checked.length === 0) {
        alert('그래프 리스트를 선택해 주세요.')
      } else {
        this.addGraphData = []
        for(let i=0; i<this.checked.length; i++) {
          const data = this.myGraphList[this.active2].data.slice().reverse()[this.checked[i]+((this.currentPage-1)*10)]
          this.addGraphData.push(data)

          
        }
      }
    },

    setMainSize() {
      const elements = this.$el.querySelectorAll('.lnb > li');
      for(let i=0; i< elements.length; i++){
        if(elements[i].classList[0] == 'active') {
          elements[i].style.height= '50px'
        } else {
          elements[i].style.height = (50 + elements[i].querySelector('ul').offsetHeight)+'px'
        }
      }
    },

    clickDashboardChange () {
      this.changeDashboadData = this.myDashboardList[this.active2].data
    },

    closeDashbChangePopup() {
      this.changeDashboadData = null
      this.myDashboardList = this.$store.state.myDashboard
      const active = this.active2
      this.active2 = -1
      this.active2 = active
      this.$forceUpdate()
      const owner = this
    }
  }

  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a{
  cursor:pointer;
}
</style>
